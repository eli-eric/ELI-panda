package handlers

import (
	"net/http"
	"panda/apigateway/services"

	"github.com/labstack/echo/v4"
)

type CatalogueHandlers struct {
	catalogueService services.ICatalogueService
}

type ICatalogueHandlers interface {
	TestCatalogue() echo.HandlerFunc
}

// NewCommentsHandlers Comments handlers constructor
func NewCatalogueHandlers(catalogueSvc services.ICatalogueService) ICatalogueHandlers {
	return &CatalogueHandlers{catalogueService: catalogueSvc}
}

// Test godoc
// @Summary Test
// @Description Test
// @Tags Catalogue
// @Accept json
// @Produce json
// @Success 200
// @Router /catalogue/test [get]
func (h *CatalogueHandlers) TestCatalogue() echo.HandlerFunc {

	return func(c echo.Context) error {

		t, err := h.catalogueService.TestCatalogue()

		if err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{"result": err.Error()})
		}

		return c.JSON(http.StatusOK, t)
	}
}
