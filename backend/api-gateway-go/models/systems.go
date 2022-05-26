package models

type System struct {
	Id                 int64   `json:"id"`
	Name               *string `json:"name"`
	Uid                string  `json:"uid"`
	Description        *string `json:"description"`
	SystemCode         *string `json:"systemCode"`
	SystemAlias        *string `json:"systemAlias"`
	FacilityZone       *string `json:"facilityZone"`
	Location           *string `json:"location"`
	OwnerPerson        *string `json:"ownerPerson"`
	ResponsiblePerson  *string `json:"responsiblePerson"`
	MaintainedByPerson *string `json:"maintainedByPerson"`
}
