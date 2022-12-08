package securityService

import (
	"errors"
	"log"
	"panda/apigateway/config"
	"panda/apigateway/helpers"
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

	session, _ := helpers.NewNeo4jSession(svc.neo4jDriver)

	//the user has to be enabled
	authUser, err = helpers.GetNeo4jSingleRecordAndMapToStruct[models.UserAuthInfo](session, `match(u:User{username: $userName})-[:HAS_ROLE]->(r:Role) 
	return {
		passwordHash: u.passwordHash, 
		lastName: u.lastName ,
		firstName: u.firstName,
		email: u.email, 
		roles: collect(r.code)} as userInfo`, map[string]interface{}{"userName": username}, "userInfo")

	//if there is a user in DB lets chekc the password
	if err == nil {

		verifErr := bcrypt.CompareHashAndPassword([]byte(authUser.PasswordHash), []byte(password))
		//empty passwordHash -> omitempty json -> not sent to client
		authUser.PasswordHash = ""
		// Throws unauthorized error if there is verifErr
		if verifErr == nil {
			// Set custom claims
			claims := &models.JwtCustomClaims{
				Roles: authUser.Roles,
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
				authUser.AccessToken = token
			}

			//finally get users Facility
			facility, facilityErr := helpers.GetNeo4jSingleRecordAndMapToStruct[models.Facility](session, `match(u:User{username: $userName})-[:BELONGS_TO]->(f:Facility) 
			return {
				code: f.code, 
				name: f.name} as facility`, map[string]interface{}{"userName": username}, "facility")

			if facilityErr == nil {
				authUser.Facility = facility.Name
			} else {
				log.Println(err)
			}

			log.Println("User authenticated ", authUser)

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
