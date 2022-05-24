package routes

import (
	"panda/apigateway/handlers"

	"github.com/labstack/echo/v4"
)

func MapSystemsRoutes(g *echo.Group, h handlers.ISystemsHandlers) {
	// Create new system route
	g.POST("", h.CreateNewSystem())
}
