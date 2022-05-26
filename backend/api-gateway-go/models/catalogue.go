package models

import "time"

type Catalogue struct {
	Name string
}

type CatalogItemResponse struct {
	ID                     int32     `json:"id"`
	Name                   string    `json:"name"`
	Category               string    `json:"category"`
	Manufacturer           string    `json:"manufacturer"`
	Availability           string    `json:"availability"`
	Facility               string    `json:"facility"`
	EstimatedPrice         string    `json:"estimatedPrice"`
	Note                   string    `json:"note"`
	TypicalAvailableInDays int32     `json:"typicalAvailableInDays"`
	SupportedToDate        time.Time `json:"supportedToDate"`
	Image                  string    `json:"image"`
}
