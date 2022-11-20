package models

type UserCredentials struct {
	Username string `json:"username,omitempty"`

	Password string `json:"password,omitempty"`
}
