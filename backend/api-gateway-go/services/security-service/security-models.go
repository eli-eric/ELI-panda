package securityService

import (
	"github.com/golang-jwt/jwt"
)

// jwtCustomClaims are custom claims extending default ones.
// See https://github.com/golang-jwt/jwt for more examples
type JwtCustomClaims struct {
	Name  string `json:"name"`
	Admin bool   `json:"admin"`
	jwt.StandardClaims
}

type AuthUser struct {
	Username    string   `json:"username"`
	Email       string   `json:"email"`
	Uid         string   `json:"uid"`
	AccessToken string   `json:"accessToken"`
	Roles       []string `json:"roles"`
	Facility    string   `json:"facility"`
}

type UserCredentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
