package models

type UserAuthInfo struct {
	Uid string `json:"uid,omitempty"`

	Username string `json:"username,omitempty"`

	FullName string `json:"fullName,omitempty"`

	Facility string `json:"facility,omitempty"`

	AccessToken string `json:"accessToken,omitempty"`

	Roles []string `json:"roles,omitempty"`
}
