package routes

import (
	"panda/apigateway/handlers"

	"github.com/labstack/echo/v4"
)

func MapSystemsRoutes(g *echo.Group, h handlers.ISystemsHandlers) {
	// Create new system route
	g.POST("", h.CreateNewSystem())
	// Create new subsystem
	g.POST("/subsystem", h.CreateNewSubsystem())
	// Create new hierarchical relationship between two existing Systems
	g.POST("/relationship/hierarchical", h.CreateNewHierarchicalRelationship())
	// Delete System and all its relationships
	g.DELETE("", h.DeleteSystemAndRelationships())
	// Delete relationship by id
	g.DELETE("/relationship", h.DeleteRelationshipByID())
	// Delete relationship by parent and child ids
	g.DELETE("/relationship/byparentchild", h.DeleteRelationshipByParentChildIds())
}
