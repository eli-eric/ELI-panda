package securityService

import (
	"net/http"
	"panda/apigateway/services/security-service/models"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

type SecurityHandlers struct {
	securityService ISecurityService
}

type ISecurityHandlers interface {
	AuthenticateByUsernameAndPassword() echo.HandlerFunc
	GetUserByJWT() echo.HandlerFunc
	RefreshToken() echo.HandlerFunc
}

// NewCommentsHandlers Comments handlers constructor
func NewSecurityHandlers(securitySvc ISecurityService) ISecurityHandlers {
	return &SecurityHandlers{securityService: securitySvc}
}

// Login with username and password and get jwt token to play with rest of API
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
			authUser := models.UserAuthInfo{}
			if cred.Username == "admin" {
				authUser.Username = cred.Username
				authUser.Uid = "71864520-9e86-427c-901c-0c220f95177"
				authUser.Facility = "ELI-Beamlines"
				authUser.AccessToken = t
				authUser.Roles = []string{"catalogue-view", "systems-view"}
			} else if cred.Username == "control.systems" {
				authUser.Username = cred.Username
				authUser.Uid = "25038ff7-0e9c-4afe-9198-210c1e94b2ef"
				authUser.Facility = "ELI-Beamlines"
				authUser.AccessToken = t
				authUser.Roles = []string{"pvs-view"}
			}

			return c.JSON(http.StatusOK, authUser)
		} else {
			return echo.ErrUnauthorized
		}
	}
}

func (h *SecurityHandlers) RefreshToken() echo.HandlerFunc {

	return func(c echo.Context) error {

		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*models.JwtCustomClaims)

		// authenticate and Generate encoded token and send it as response.
		t, err := h.securityService.RefreshToken(claims)
		if err != nil {
			if err.Error() == "Unauthorized" {
				return echo.ErrUnauthorized
			} else {
				return err
			}
		}
		return c.JSON(http.StatusOK, echo.Map{
			"accessToken": t,
		})
	}
}

func (h *SecurityHandlers) GetUserByJWT() echo.HandlerFunc {

	return func(c echo.Context) error {
		user := c.Get("user").(*jwt.Token)
		claims := user.Claims.(*models.JwtCustomClaims)

		authUser := models.UserAuthInfo{}

		if claims.Subject == "admin" {
			authUser.Username = claims.Subject
			authUser.Uid = "71864520-9e86-427c-901c-0c220f95177"
			authUser.Facility = "ELI-Beamlines"

			authUser.Roles = []string{"catalogue-view", "systems-view"}
		} else if authUser.Username == "control.systems" {
			authUser.Username = claims.Subject
			authUser.Uid = "25038ff7-0e9c-4afe-9198-210c1e94b2ef"
			authUser.Facility = "ELI-Beamlines"

			authUser.Roles = []string{"pvs-view"}
		}

		authUser.Username = claims.Name
		authUser.Uid = "71864520-9e86-427c-901c-0c220f95177"
		authUser.Facility = "ELI-Beamlines"
		authUser.AccessToken = user.Raw
		authUser.Roles = []string{"catalogue-view", "systems-view"}

		return c.JSON(http.StatusOK, authUser)
	}
}
