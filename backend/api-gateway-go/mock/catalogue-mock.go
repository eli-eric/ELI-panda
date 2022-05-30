package mock

import (
	"panda/apigateway/models"
	"strconv"
)

func GenerateCatalogueItems() *[]models.CatalogItemResponse {
	result := make([]models.CatalogItemResponse, 0)

	for i := 0; i < 10000; i++ {
		newItem := models.CatalogItemResponse{
			ID:   int32(i),
			Name: "Mirror " + strconv.Itoa(i),
		}
		result = append(result, newItem)
	}

	return &result
}

// pageSize: int = 10,
// pageNumber: int = 0,
// searchPattern: str = None,
// orderByName:
// int = None,  # 1 means to order by ASC , 2 means to order by DESC, other values or null means not to sort
