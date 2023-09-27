import { gql } from '@apollo/client'

export const typeDefs = gql`
  type JWT @jwt {
    roles: [String!]!
  }
  type Query {
    locations: [Location!]!
    roomCards: [RoomCard!]!
  }

  type Location {
    belongsToFacilityFacilities: [Facility!]! @relationship(type: "BELONGS_TO_FACILITY", direction: OUT)
    code: String
    facilitiesHasLocation: [Facility!]! @relationship(type: "HAS_LOCATION", direction: IN)
    facility: String!
    hasSublocationLocations: [Location!]! @relationship(type: "HAS_SUBLOCATION", direction: OUT)
    locationsHasSublocation: [Location!]! @relationship(type: "HAS_SUBLOCATION", direction: IN)
    name: String!
    roomCard: RoomCard @relationship(type: "HAS_ROOM_CARD", direction: OUT)
  }

  enum RoomCardStatus {
    DIRTY_MODE
    CLEAN_MODE
    IN_PREPARATION_MODE
  }

  type RoomCard {
    uid: ID! @id
    status: RoomCardStatus!
    contactPersons: [Employee!]! @relationship(type: "HAS_CONTACT_PERSON", direction: OUT)
    location: Location! @relationship(type: "HAS_ROOM_CARD", direction: IN)
    team: [Team!]! @relationship(type: "HAS_TEAM", direction: OUT)
    purityClass: String
    prescribedClothing: String
    entryToHvacTent: String
    cleaningShedule: String
    additionalRequirements: String
    coolingWater: String
    indoorEnvironmentQueality: String
    copressedAirDistribution: String
    nitrogenCentralDistribution: String
    maxPressureInColdDistribution: String
    pressureInCoolingSystem: String
    roomTemperature: String
    humidity: String
  }

  type Team {
    uid: String!
    name: String!
    teamMembers: [Employee!]! @relationship(type: "BELONGS_TO_TEAM", direction: IN)
  }

  type Employee {
    uid: String!
    team: Team @relationship(type: "BELONGS_TO_TEAM", direction: OUT)
    firstName: String!
    lastName: String!
    phoneNumber: String
    email: String
    role: String
  }

  type ParentPathItem {
    uid: String
    name: String
  }

  type CatalogueCategory {
    uid: String!
    code: String!
    name: String!
    catalogueCategoriesHasSubcategory: [CatalogueCategory!]! @relationship(type: "HAS_SUBCATEGORY", direction: IN)
    catalogueItemsBelongsToCategory: [CatalogueItem!]! @relationship(type: "BELONGS_TO_CATEGORY", direction: IN)
    parentCategory: CatalogueCategory @relationship(type: "HAS_SUBCATEGORY", direction: IN)
    hasGroupCatalogueCategoryPropertyGroups: [CatalogueCategoryPropertyGroup!]!
      @relationship(type: "HAS_GROUP", direction: OUT)
    hasSubcategoryCatalogueCategories: [CatalogueCategory!]! @relationship(type: "HAS_SUBCATEGORY", direction: OUT)
    parentPath: [ParentPathItem]!
      @cypher(
        statement: """
        OPTIONAL MATCH (parent)-[:HAS_SUBCATEGORY*1..50]->(this)
        WITH this, reverse(collect({uid: parent.uid, name: parent.name})) AS parentPaths
        WITH this, CASE WHEN size(parentPaths) = 0 THEN [this] ELSE parentPaths END AS finalPaths
        UNWIND finalPaths AS finalPath
        RETURN {uid: finalPath.uid, name: finalPath.name} as parentPath
        """
        columnName: "parentPath"
      )
  }

  type CatalogueCategoryProperty {
    catalogueCategoryPropertyGroupsContainsProperty: [CatalogueCategoryPropertyGroup!]!
      @relationship(type: "CONTAINS_PROPERTY", direction: IN)
    catalogueItemsHasCatalogueProperty: [CatalogueItem!]! @relationship(type: "HAS_CATALOGUE_PROPERTY", direction: IN)
    defaultValue: String!
    hasUnitUnits: [Unit!]! @relationship(type: "HAS_UNIT", direction: OUT)
    isPropertyTypeCatalogueCategoryPropertyTypes: [CatalogueCategoryPropertyType!]!
      @relationship(type: "IS_PROPERTY_TYPE", direction: OUT)
    listOfValues: String!
    name: String!
    uid: String!
  }

  type CatalogueCategoryPropertyGroup {
    catalogueCategoriesHasGroup: [CatalogueCategory!]! @relationship(type: "HAS_GROUP", direction: IN)
    containsPropertyCatalogueCategoryProperties: [CatalogueCategoryProperty!]!
      @relationship(type: "CONTAINS_PROPERTY", direction: OUT)
    name: String!
    uid: String!
  }

  type CatalogueCategoryPropertyType {
    catalogueCategoryPropertiesIsPropertyType: [CatalogueCategoryProperty!]!
      @relationship(type: "IS_PROPERTY_TYPE", direction: IN)
    code: String!
    name: String!
    uid: String!
  }

  type CatalogueItem {
    belongsToCategoryCatalogueCategories: [CatalogueCategory!]!
      @relationship(type: "BELONGS_TO_CATEGORY", direction: OUT)
    catalogueNumber: String!
    description: String!
    hasCataloguePropertyCatalogueCategoryProperties: [CatalogueCategoryProperty!]!
      @relationship(type: "HAS_CATALOGUE_PROPERTY", direction: OUT)
    hasManufacturerManufacturers: [Manufacturer!]! @relationship(type: "HAS_MANUFACTURER", direction: OUT)
    manufacturerUrl: String!
    name: String!
    uid: String!
  }

  type Facility {
    code: String!
    hasLocationLocations: [Location!]! @relationship(type: "HAS_LOCATION", direction: OUT)
    hasZoneZones: [Zone!]! @relationship(type: "HAS_ZONE", direction: OUT)
    locationsBelongsToFacility: [Location!]! @relationship(type: "BELONGS_TO_FACILITY", direction: IN)
    name: String!
    systemTypeGroupsBelongsToFacility: [SystemTypeGroup!]! @relationship(type: "BELONGS_TO_FACILITY", direction: IN)
    uid: String!
  }

  type ItemCondition {
    code: String!
    name: String!
    uid: String!
  }

  type ItemUsage {
    code: String!
    name: String!
    uid: String!
  }

  type Manufacturer {
    catalogueItemsHasManufacturer: [CatalogueItem!]! @relationship(type: "HAS_MANUFACTURER", direction: IN)
    name: String!
  }

  type Role {
    code: String!
    name: String!
    uid: String!
    usersHasRole: [User!]! @relationship(type: "HAS_ROLE", direction: IN)
  }

  type SchemaMigration {
    dirty: Boolean!
    ts: DateTime!
    version: BigInt!
  }

  type System {
    description: String!
    hasSubsystemSystems: [System!]! @relationship(type: "HAS_SUBSYSTEM", direction: OUT)
    image: String
    name: String!
    systemAlias: String!
    systemCode: String!
    systemsHasSubsystem: [System!]! @relationship(type: "HAS_SUBSYSTEM", direction: IN)
    uid: String!
  }

  type SystemCriticality {
    code: String!
    name: String!
    uid: String!
  }

  type SystemImportance {
    code: String!
    name: String!
    uid: String!
  }

  type SystemType {
    code: String!
    mask: String!
    name: String!
    systemTypeGroupsContainsSystemType: [SystemTypeGroup!]! @relationship(type: "CONTAINS_SYSTEM_TYPE", direction: IN)
    uid: String!
  }

  type SystemTypeGroup {
    belongsToFacilityFacilities: [Facility!]! @relationship(type: "BELONGS_TO_FACILITY", direction: OUT)
    containsSystemTypeSystemTypes: [SystemType!]! @relationship(type: "CONTAINS_SYSTEM_TYPE", direction: OUT)
    name: String!
    uid: String!
  }

  type Unit {
    catalogueCategoryPropertiesHasUnit: [CatalogueCategoryProperty!]! @relationship(type: "HAS_UNIT", direction: IN)
    code: String!
    name: String!
    uid: String!
  }

  type User {
    email: String!
    firstName: String!
    hasRoleRoles: [Role!]! @relationship(type: "HAS_ROLE", direction: OUT)
    isEnabled: Boolean!
    lastName: String!
    passwordHash: String!
    uid: String!
    username: String!
  }

  type Zone {
    code: String!
    facilitiesHasZone: [Facility!]! @relationship(type: "HAS_ZONE", direction: IN)
    hasSubzoneZones: [Zone!]! @relationship(type: "HAS_SUBZONE", direction: OUT)
    name: String!
    uid: String!
    zonesHasSubzone: [Zone!]! @relationship(type: "HAS_SUBZONE", direction: IN)
  }
`
