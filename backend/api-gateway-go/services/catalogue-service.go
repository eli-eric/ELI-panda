package services

import (
	"panda/apigateway/mock"
	"panda/apigateway/models"
)

type CatalogueService struct {
}

type ICatalogueService interface {
	TestCatalogue() (*[]models.CatalogItemResponse, error)
}

func NewCatalogueService() ICatalogueService {
	return &CatalogueService{}
}

func (svc *CatalogueService) TestCatalogue() (*[]models.CatalogItemResponse, error) {

	items := mock.GenerateCatalogueItems()

	return items, nil
}
