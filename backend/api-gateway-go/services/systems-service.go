// MATCH (root:System)
// WHERE NOT exists( ()-[:HAS_SUBSYSTEM]->(root))
// RETURN root
package services

import (
	"panda/apigateway/models"
	"strconv"

	uuid "github.com/google/uuid"

	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

type SystemsService struct {
	neo4jDriver neo4j.Driver
}

type ISystemsService interface {
	CreateNewSystem(system models.System) (string, error)
}

func NewSystemsService(driver neo4j.Driver) ISystemsService {
	return &SystemsService{
		neo4jDriver: driver,
	}
}

func (svc *SystemsService) CreateNewSystem(system models.System) (string, error) {

	result := ""

	session := svc.neo4jDriver.NewSession(neo4j.SessionConfig{})
	defer session.Close()
	_, err := session.WriteTransaction(func(tx neo4j.Transaction) (interface{}, error) {
		newUid, err := uuid.NewRandom()
		if err != nil {
			return nil, err
		}
		records, err := tx.Run(`CREATE (s:System { 
			name: $name, 
			uid: $uid, 
			description: $description, 
			systemCode: $systemCode, 
			systemAlias: $systemAlias,
			facilityZone: $facilityZone,
			location: $location,
			owner: $owner,
			responsible: $responsible,
			maintainedBy: $maintainedBy
			}) 
		RETURN id(s)`, map[string]interface{}{
			"uid":          newUid.String(),
			"name":         system.Name,
			"description":  system.Description,
			"systemCode":   system.SystemCode,
			"systemAlias":  system.SystemAlias,
			"facilityZone": system.FacilityZone,
			"location":     system.Location,
			"owner":        system.OwnerPerson,
			"responsible":  system.ResponsiblePerson,
			"maintainedBy": system.MaintainedByPerson,
		})
		// In face of driver native errors, make sure to return them directly.
		// Depending on the error, the driver may try to execute the function again.
		if err != nil {
			return nil, err
		}
		record, err := records.Single()
		if err != nil {
			return nil, err
		}

		resVal := record.Values[0].(int64)
		result = strconv.Itoa(int(resVal))

		return result, nil
	})
	if err != nil {
		return "", err
	}

	return result, nil
}
