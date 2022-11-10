package routes

import (
	"panda/apigateway/handlers"

	"github.com/labstack/echo/v4"
)

func MapSecurityRoutes(e *echo.Echo, h handlers.ISecurityHandlers, jwtMiddleware echo.MiddlewareFunc) {
	// Login route
	e.POST("/v1/authenticate", h.AuthenticateByUsernameAndPassword())
	e.POST("/v1/refresh-token", h.RefreshToken(), jwtMiddleware)
	e.GET("/v1/authenticated-user", h.GetUserByJWT(), jwtMiddleware)
}
