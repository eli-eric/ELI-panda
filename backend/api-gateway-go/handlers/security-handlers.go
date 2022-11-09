package handlers

import (
	"net/http"
	"panda/apigateway/models"
	"panda/apigateway/services"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

type SecurityHandlers struct {
	securityService services.ISecurityService
}

type ISecurityHandlers interface {
	AuthenticateByUsernameAndPassword() echo.HandlerFunc
	GetUserByJWT() echo.HandlerFunc
	ReauthenticateUser() echo.HandlerFunc
}

// NewCommentsHandlers Comments handlers constructor
func NewSecurityHandlers(securitySvc services.ISecurityService) ISecurityHandlers {
	return &SecurityHandlers{securityService: securitySvc}
}

// @Description Login with username and password and get jwt token to play with rest of API
func (h *SecurityHandlers) AuthenticateByUsernameAndPassword() echo.HandlerFunc {

	return func(c echo.Context) error {

		cred := new(models.UserCredentials)
		if err := c.Bind(cred); err == nil {
			// authenticate and Generate encoded token and send it as response.
			t, err := h.securityService.AuthenticateByUsernameAndPassword(cred.Username, cred.Password)
			if err != nil {
				if err.Error() == "Unauthorized" {
					return echo.ErrUnauthorized
				} else {
					return err
				}
			}
			return c.JSON(http.StatusOK, echo.Map{
				"access_token": t,
			})
		} else {
			return echo.ErrUnauthorized
		}
	}
}

func (h *SecurityHandlers) ReauthenticateUser() echo.HandlerFunc {

	return func(c echo.Context) error {

		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*models.JwtCustomClaims)

		// authenticate and Generate encoded token and send it as response.
		t, err := h.securityService.ReauthenticateUser(claims)
		if err != nil {
			if err.Error() == "Unauthorized" {
				return echo.ErrUnauthorized
			} else {
				return err
			}
		}
		return c.JSON(http.StatusOK, echo.Map{
			"access_token": t,
		})
	}
}

// Authenticate godoc
// @Summary Get authenticated user data
// @Description Get authenticated user data by token - Bearer auth header
// @Tags Security
// @Accept json
// @Produce json
// @Success 200 {object} models.AuthUser
// @Router /authenticate [get]
// @Security ApiKeyAuth
func (h *SecurityHandlers) GetUserByJWT() echo.HandlerFunc {

	return func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*models.JwtCustomClaims)

		authUser := models.AuthUser{}

		authUser.DisplayName = claims.Name
		authUser.Id = 1
		authUser.Email = "admin@eli"
		authUser.Role = []string{"admin", "user"}

		return c.JSON(http.StatusOK, authUser)
	}
}
