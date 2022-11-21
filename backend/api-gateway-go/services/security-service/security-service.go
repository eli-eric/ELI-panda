package securityService

import (
	"errors"
	"panda/apigateway/services/security-service/models"
	"time"

	"github.com/golang-jwt/jwt"
)

type SecurityService struct {
}

type ISecurityService interface {
	AuthenticateByUsernameAndPassword(username string, password string) (string, error)
	RefreshToken(claims *models.JwtCustomClaims) (string, error)
}

func NewSecurityService() ISecurityService {
	return &SecurityService{}
}

func (svc *SecurityService) AuthenticateByUsernameAndPassword(username string, password string) (string, error) {

	// Throws unauthorized error
	if username == "admin" && password == "elipanda2022" {
		// Set custom claims
		claims := &models.JwtCustomClaims{
			Name:  "Eli Panda",
			Admin: true,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: time.Now().Add(time.Hour * 876000).Unix(),
				Subject:   "admin",
			},
		}

		// Create token with claims
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

		// Generate encoded token and send it as response.
		t, err := token.SignedString([]byte("12554114ad74624b588c910f6fa2bbc0"))
		if err != nil {
			return "", err
		}

		return t, nil
	} else if username == "control.systems" && password == "rewt654xcv654REF4" {
		// Set custom claims
		claims := &models.JwtCustomClaims{
			Name:  "Control Systems",
			Admin: false,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: time.Now().Add(time.Hour * 876000).Unix(),
				Subject:   "conntrol.systems",
			},
		}

		// Create token with claims
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

		// Generate encoded token and send it as response.
		t, err := token.SignedString([]byte("12554114ad74624b588c910f6fa2bbc0"))
		if err != nil {
			return "", err
		}

		return t, nil
	}

	return "", errors.New("Unauthorized")
}

func (svc *SecurityService) RefreshToken(claims *models.JwtCustomClaims) (string, error) {

	claims.StandardClaims.ExpiresAt = time.Now().Add(time.Hour * 876000).Unix()

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("12554114ad74624b588c910f6fa2bbc0"))
	if err != nil {
		return "", err
	}

	return t, nil
}
