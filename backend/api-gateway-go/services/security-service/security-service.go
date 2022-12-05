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
	session, _ := newNeo4jSession(svc.neo4jDriver)

	//the user has to be enabled
	result, err := getNeo4jSingleRecord(session, `match(u:User{username: $userName})-[:HAS_ROLE]->(r:Role) 
	return {uid: u.uid, 
		passwordHash: u.passwordHash, 
		lastName: u.lastName ,
		firstName: u.firstName,
		email: u.email, 
		roles: collect(r.code)} as userInfo`, map[string]interface{}{"userName": username}, "userInfo")

	//if there is a user in DB lets chekc the password
	if err == nil {
		// Check password
		userProps := result.(map[string]interface{})

		passwordHash := userProps["passwordHash"].(string)
		// Throws unauthorized error
		verifErr := bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(password))

		if verifErr == nil {
			rolesI := userProps["roles"].([]interface{})
			var roles = make([]string, 0)
			if rolesI != nil && len(rolesI) > 0 {
				// TODO
			}
			// Set custom claims
			claims := &models.JwtCustomClaims{
				Roles: roles,
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
					Uid:         userProps["uid"].(string),
					Username:    username,
					FullName:    userProps["firstName"].(string) + " " + userProps["lastName"].(string),
					AccessToken: token,
					Roles:       roles,
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

func newNeo4jSession(driver neo4j.Driver) (neo4j.Session, error) {
	session := driver.NewSession(neo4j.SessionConfig{})
	var err error
	defer func() {
		err = ioutils.DeferredClose(session, err)
	}()
	return session, err
}

func getNeo4jSingleRecord(session neo4j.Session, cypher string, params map[string]interface{}, returnAlias string) (interface{}, error) {
	result, err := session.ReadTransaction(func(tx neo4j.Transaction) (interface{}, error) {
		result, err := tx.Run(cypher, params)
		if err != nil {
			return nil, err
		}

		record, err := result.Single()
		if err != nil {
			return nil, fmt.Errorf("record not found")
		}

		rec, _ := record.Get(returnAlias)
		return rec, nil

	})

	return result, err
}

func neo4jReadArrayOfNodes(session neo4j.Session, cypher string, params map[string]interface{}, returnAlias string) (interface{}, error) {
	// Execute a query in a new Read Transaction
	results, err := session.ReadTransaction(func(tx neo4j.Transaction) (interface{}, error) {

		result, err := tx.Run(cypher, params)
		if err != nil {
			return nil, err
		}

		// Get a list of Movies from the Result
		records, err := result.Collect()
		if err != nil {
			return nil, err
		}
		var results []map[string]interface{}
		for _, record := range records {
			movie, _ := record.Get(returnAlias)
			results = append(results, movie.(map[string]interface{}))
		}
		return results, nil
	})

	return results, err
}
