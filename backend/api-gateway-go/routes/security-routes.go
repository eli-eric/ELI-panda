package routes

import (
	"panda/apigateway/handlers"

	"github.com/labstack/echo/v4"
)

func MapSecurityRoutes(e *echo.Echo, h handlers.ISecurityHandlers, jwtMiddleware echo.MiddlewareFunc) {
	// Login route
	e.POST("/authenticate", h.Login())
	e.GET("/authenticate", h.GetAuthUser(), jwtMiddleware)
}
