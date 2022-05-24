package handlers

import (
	"net/http"
	"panda/apigateway/models"
	"panda/apigateway/services"

	"github.com/labstack/echo/v4"
)

type SystemsHandlers struct {
	systemsService services.ISystemsService
}

type ISystemsHandlers interface {
	CreateNewSystem() echo.HandlerFunc
}

// NewCommentsHandlers Comments handlers constructor
func NewSystemsHandlers(systemsSvc services.ISystemsService) ISystemsHandlers {
	return &SystemsHandlers{systemsService: systemsSvc}
}

// CreateNewSystem godoc
// @Summary Create new system
// @Description Create new system and return new System ID
// @Tags Systems
// @Accept json
// @Produce json
// @Success 200
// @Router /system [post]
// @Security ApiKeyAuth
func (h *SystemsHandlers) CreateNewSystem() echo.HandlerFunc {
	return func(c echo.Context) error {
		name := c.FormValue("name")
		description := c.FormValue("description")
		systemCode := c.FormValue("systemCode")
		systemAlias := c.FormValue("systemAlias")
		facilityZone := c.FormValue("facilityZone")
		location := c.FormValue("location")
		ownerPerson := c.FormValue("ownerPerson")
		responsiblePerson := c.FormValue("responsiblePerson")
		maintainedByPerson := c.FormValue("maintainedByPerson")

		system := models.System{
			Name:               name,
			Description:        description,
			SystemCode:         systemCode,
			SystemAlias:        systemAlias,
			FacilityZone:       facilityZone,
			Location:           location,
			OwnerPerson:        ownerPerson,
			ResponsiblePerson:  responsiblePerson,
			MaintainedByPerson: maintainedByPerson,
		}

		newSystemID, err := h.systemsService.CreateNewSystem(system)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, "Unexpected server error...")
		}

		return c.JSON(http.StatusOK, echo.Map{"id": newSystemID})
	}
}
