package services

import (
	"errors"
	"panda/apigateway/models"
	"time"

	"github.com/golang-jwt/jwt"
)

type SecurityService struct {
}

type ISecurityService interface {
	AuthenticateByUsernameAndPassword(username string, password string) (string, error)
	ReauthenticateUser(claims *models.JwtCustomClaims) (string, error)
}

func NewSecurityService() ISecurityService {
	return &SecurityService{}
}

func (svc *SecurityService) AuthenticateByUsernameAndPassword(username string, password string) (string, error) {

	// Throws unauthorized error
	if username != "admin" || password != "elipanda2022" {
		return "", errors.New("Unauthorized")
	}

	// Set custom claims
	claims := &models.JwtCustomClaims{
		Name:  "Eli Panda",
		Admin: true,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 2).Unix(),
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
}

func (svc *SecurityService) ReauthenticateUser(claims *models.JwtCustomClaims) (string, error) {

	claims.StandardClaims.ExpiresAt = time.Now().Add(time.Hour * 2).Unix()

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("12554114ad74624b588c910f6fa2bbc0"))
	if err != nil {
		return "", err
	}

	return t, nil
}
