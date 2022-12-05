package securityService

import (
	"errors"
	"fmt"
	"log"
	"panda/apigateway/config"
	"panda/apigateway/ioutils"
	"panda/apigateway/services/security-service/models"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
	"golang.org/x/crypto/bcrypt"
)

type SecurityService struct {
	neo4jDriver neo4j.Driver
	jwtSecret   string
}

type ISecurityService interface {
	AuthenticateByUsernameAndPassword(username string, password string) (authUser models.UserAuthInfo, err error)
	RefreshToken(claims *models.JwtCustomClaims) (string, error)
}

// Create new security service instance
func NewSecurityService(settings *config.Config) ISecurityService {

	// Create new Driver instance
	driver, err := neo4j.NewDriver(
		settings.SecurityServiceNeo4jUri,
		neo4j.BasicAuth(settings.SecurityServiceNeo4jUsername, settings.SecurityServiceNeo4jPassword, ""),
	)

	// Check error in driver instantiation
	if err != nil {
		ioutils.PanicOnError(err)
	}

	// Verify Connectivity
	err = driver.VerifyConnectivity()

	// If connectivity fails, handle the error
	if err != nil {
		ioutils.PanicOnError(err)
	}

	log.Println("Neo4j security database connection established successfully.")

	return &SecurityService{neo4jDriver: driver, jwtSecret: settings.JwtSecret}
}

func (svc *SecurityService) AuthenticateByUsernameAndPassword(username string, password string) (authUser models.UserAuthInfo, err error) {

	// Open a new Session
	session := svc.neo4jDriver.NewSession(neo4j.SessionConfig{})
	defer func() {
		err = ioutils.DeferredClose(session, err)
	}()

	// Find the User node within a Read Transaction
	result, err := session.ReadTransaction(func(tx neo4j.Transaction) (interface{}, error) {
		result, err := tx.Run(`
		MATCH (u:User {username: $username}) RETURN u`,
			map[string]interface{}{
				"username": username,
			})
		if err != nil {
			return nil, err
		}

		record, err := result.Single()
		if err != nil {
			// do not expose whether an account matches or not
			return nil, fmt.Errorf("account not found or incorrect password")
		}

		user, _ := record.Get("u")
		return user, nil

	})

	//if there is a user in DB lets chekc the password
	if err == nil {
		// Check password
		userNode := result.(neo4j.Node)
		user := userNode.Props
		passwordHash := user["passwordHash"].(string)
		// Throws unauthorized error
		verifErr := bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(password))

		if verifErr == nil {
			// Set custom claims
			claims := &models.JwtCustomClaims{
				Roles: []string{"basics", "catalogue-view"},
				StandardClaims: jwt.StandardClaims{
					ExpiresAt: time.Now().Add(time.Hour * 876000).Unix(),
					Subject:   username,
				},
			}

			// Create token with claims
			newToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

			// Generate encoded token and send it as response.
			token, err := newToken.SignedString([]byte(svc.jwtSecret))
			if err == nil {
				authUser = models.UserAuthInfo{
					Uid:         user["uid"].(string),
					Username:    user["username"].(string),
					AccessToken: token,
					Roles:       []string{"basics", "catalogue-view"},
				}
			}

			return authUser, err
		}
	}

	return authUser, errors.New("Unauthorized")
}

func (svc *SecurityService) RefreshToken(claims *models.JwtCustomClaims) (string, error) {

	claims.StandardClaims.ExpiresAt = time.Now().Add(time.Hour * 876000).Unix()

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte(svc.jwtSecret))
	if err != nil {
		return "", err
	}

	return t, nil
}
