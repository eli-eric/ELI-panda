package routes

import (
	"panda/apigateway/handlers"

	"github.com/labstack/echo/v4"
)

func MapCatalogueRoutes(g *echo.Group, h handlers.ICatalogueHandlers) {
	// test route
	g.GET("/test", h.TestCatalogue())
}
