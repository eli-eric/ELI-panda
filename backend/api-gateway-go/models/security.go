package models

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
	Id          int      `json:"id"`
	DisplayName string   `json:"displayName"`
	Email       string   `json:"email"`
	Uid         string   `json:"uid"`
	PhotoURL    string   `json:"photoURL"`
	Token       string   `json:"token"`
	Role        []string `json:"role"`
}
