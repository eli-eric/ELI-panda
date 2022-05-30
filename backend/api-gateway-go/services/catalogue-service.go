package services

import (
	"panda/apigateway/mock"
	"panda/apigateway/models"
)

type CatalogueService struct {
	catalogueItems []models.CatalogItemResponse
}

type ICatalogueService interface {
	TestCatalogue() (*[]models.CatalogItemResponse, error)
}

func NewCatalogueService() ICatalogueService {
	return &CatalogueService{
		catalogueItems: *mock.GenerateCatalogueItems(),
	}
}

func (svc *CatalogueService) TestCatalogue() (*[]models.CatalogItemResponse, error) {

	var items []models.CatalogItemResponse

	pageSize := 20
	pageNumber := 3
	offset := pageNumber * pageSize
	if len(svc.catalogueItems) >= offset+pageSize {
		items = svc.catalogueItems[offset : offset+pageSize]
	}

	return &items, nil
}
