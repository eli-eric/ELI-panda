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
	Login() echo.HandlerFunc
	GetAuthUser() echo.HandlerFunc
}

// NewCommentsHandlers Comments handlers constructor
func NewSecurityHandlers(securitySvc services.ISecurityService) ISecurityHandlers {
	return &SecurityHandlers{securityService: securitySvc}
}

// Login godoc
// @Summary Login and get security token
// @Description Login with username and password and get jwt token to play with rest of API
// @Tags Security
// @Accept json
// @Produce json
// @Param username formData string true "username"
// @Param password formData string true "password"
// @Success 200
// @Router /authenticate [post]
func (h *SecurityHandlers) Login() echo.HandlerFunc {

	return func(c echo.Context) error {
		username := c.FormValue("username")
		password := c.FormValue("password")

		// authenticate and Generate encoded token and send it as response.
		t, err := h.securityService.Login(username, password)
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
// @Description Get authenticated user data by token
// @Tags Security
// @Accept json
// @Produce json
// @Success 200
// @Router /authenticate [get]
// @Security ApiKeyAuth
func (h *SecurityHandlers) GetAuthUser() echo.HandlerFunc {

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
