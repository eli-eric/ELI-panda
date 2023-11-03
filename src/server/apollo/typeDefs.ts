import { gql } from '@apollo/client'

export const typeDefs = gql`
  type JWT @jwt {
    roles: [String!]!
  }

  type Location {
    uid: ID! @id
    belongsToFacilityFacilities: [Facility!]! @relationship(type: "BELONGS_TO_FACILITY", direction: OUT)
    code: String
    facilitiesHasLocation: [Facility!]! @relationship(type: "HAS_LOCATION", direction: IN)
    facility: String!
    subLocations: [Location!]! @relationship(type: "HAS_SUBLOCATION", direction: OUT)
    parentLocation: Location @relationship(type: "HAS_SUBLOCATION", direction: IN)
    name: String!
    roomCard: RoomCard @relationship(type: "HAS_ROOM_CARD", direction: OUT)
  }

  enum RoomCardStatus {
    DIRTY_MODE
    CLEAN_MODE
    IN_PREPARATION_MODE
  }

  type ContactPersonRole {
    uid: ID! @id
    name: String!
  }

  type HallContactPerson {
    uid: ID! @id
    employee: Employee! @relationship(type: "HAS_CONTACT_PERSON", direction: OUT)
    role: ContactPersonRole @relationship(type: "HAS_ROOM_CARD_ROLE", direction: OUT)
  }

  type RoomCard {
    uid: ID! @id
    status: RoomCardStatus!
    contactPersonsHall: [HallContactPerson!]! @relationship(type: "HAS_CONTACT_PERSON_HALL", direction: OUT)
    contactPersonsDept: [Employee!]! @relationship(type: "HAS_CONTACT_PERSON_DEPT", direction: OUT)
    location: Location! @relationship(type: "HAS_ROOM_CARD", direction: IN)
    teams: [Team!]! @relationship(type: "HAS_TEAM", direction: OUT)
    purityClass: String
    prescribedClothing: String
    entryToHvacTent: String
    cleaningSchedule: String
    additionalRequirements: String
    coolingWater: String
    indoorEnvironmentQuality: String
    compressedAirDistribution: String
    nitrogenCentralDistribution: String
    maxPressureInColdDistribution: String
    pressureInCoolingSystem: String
    roomTemperature: String
    humidity: String
  }

  type Team {
    uid: ID! @id
    name: String!
  }

  type Employee {
    uid: String!
    firstName: String!
    fullName: String
    lastName: String!
    phoneNumber: String
    email: String
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
    defaultValue: String!
    value: String
    unit: Unit @relationship(type: "HAS_UNIT", direction: OUT)
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
    description: String
    properties: [CatalogueCategoryProperty!]!
      @relationship(type: "HAS_CATALOGUE_PROPERTY", direction: OUT, properties: "hasCatalogueProperty")
    supplier: Supplier @relationship(type: "HAS_SUPPLIER", direction: OUT)
    manufacturerUrl: String!
    name: String!
    uid: String!
  }

  interface hasCatalogueProperty @relationshipProperties {
    value: String
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

  type Supplier {
    uid: ID! @id
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
    uid: ID! @id
    description: String
    deleted: Boolean!
    isTechnologicalUnit: Boolean
    name: String!
    systemAlias: String
    systemCode: String
    subSystems: [System!]! @relationship(type: "HAS_SUBSYSTEM", direction: OUT)
    parentSystem: System @relationship(type: "HAS_SUBSYSTEM", direction: IN)
    location: Location @relationship(type: "HAS_LOCATION", direction: OUT)
    facility: Facility! @relationship(type: "BELONGS_TO_FACILITY", direction: OUT)
    physicalItem: Item @relationship(type: "CONTAINS_ITEM", direction: OUT)
    zone: Zone @relationship(type: "HAS_ZONE", direction: OUT)
    systemType: SystemType @relationship(type: "HAS_SYSTEM_TYPE", direction: OUT)
    responsible: Employee @relationship(type: "HAS_RESPONSIBLE", direction: OUT)
    owner: Employee @relationship(type: "HAS_OWNER", direction: OUT)
    operators: [Employee!]! @relationship(type: "HAS_OPERATOR", direction: OUT)
    maintenedBy: [Employee!]! @relationship(type: "IS_MAINTENED_BY", direction: OUT)
    systemLevel: SystemLevel
    parentPath: [ParentPathItem]!
      @cypher(
        statement: """
        OPTIONAL MATCH (parent)-[:HAS_SUBSYSTEM*1..50]->(this)
        WITH this, reverse(collect({uid: parent.uid, name: parent.name})) AS parentPaths
        WITH this, CASE WHEN size(parentPaths) = 0 THEN [this] ELSE parentPaths END AS finalPaths
        UNWIND finalPaths AS finalPath
        RETURN {uid: finalPath.uid, name: finalPath.name} as parentPath
        """
        columnName: "parentPath"
      )
  }

  enum SystemLevel {
    TECHNOLOGY_UNIT
    KEY_SYSTEMS
    SUBSYSTEMS_AND_PARTS
  }

  type Item {
    uid: ID! @id
    eun: String
    name: String!
    serialNumber: String
    system: [System!]! @relationship(type: "CONTAINS_ITEM", direction: IN)
    catalogueItem: CatalogueItem! @relationship(type: "IS_BASED_ON", direction: OUT)
    order: Order @relationship(type: "HAS_ORDER_LINE", direction: IN)
    itemUsage: ItemUsage @relationship(type: "HAS_ITEM_USAGE", direction: OUT)
    conditionStatus: ItemCondition @relationship(type: "HAS_CONDITION_STATUS", direction: OUT)
    notes: String
  }

  interface codeBook {
    code: String!
    name: String!
    uid: ID! @id
  }

  type SystemCriticality {
    code: String!
    name: String!
    uid: ID! @id
  }

  type ItemCondition {
    code: String!
    name: String!
    uid: ID! @id
  }

  type ItemUsage {
    code: String!
    name: String!
    uid: ID! @id
  }

  type SystemImportance {
    code: String!
    name: String!
    uid: ID! @id
  }

  type SystemType {
    code: String!
    mask: String!
    name: String!
    systemTypeGroupsContainsSystemType: [SystemTypeGroup!]! @relationship(type: "CONTAINS_SYSTEM_TYPE", direction: IN)
    uid: ID! @id
  }

  type Order {
    uid: ID! @id
    name: String!
  }

  type Zone {
    code: String!
    facilitiesHasZone: [Facility!]! @relationship(type: "HAS_ZONE", direction: IN)
    hasSubzoneZones: [Zone!]! @relationship(type: "HAS_SUBZONE", direction: OUT)
    name: String!
    uid: String!
    zonesHasSubzone: [Zone!]! @relationship(type: "HAS_SUBZONE", direction: IN)
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
`
