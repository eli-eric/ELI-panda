import { gql } from '@apollo/client'

export const typeDefs = gql`
  type JWT @jwt {
    roles: [String!]!
    uid: ID!
  }
  type Location @authentication {
    uid: ID! @id
    facility: Facility! @relationship(type: "BELONGS_TO_FACILITY", direction: OUT)
    code: String
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

  type ContactPersonRole @authentication {
    uid: ID! @id
    name: String!
  }

  type HallContactPerson @authentication {
    uid: ID! @id
    employee: Employee! @relationship(type: "HAS_CONTACT_PERSON", direction: OUT)
    role: ContactPersonRole @relationship(type: "HAS_ROOM_CARD_ROLE", direction: OUT)
  }

  type RoomCard @authentication {
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

  type Team @authentication {
    uid: ID! @id
    name: String!
  }

  type Employee @authentication {
    uid: ID! @id
    firstName: String!
    fullName: String
    lastName: String!
    phoneNumber: String
    email: String
  }

  type ParentPathItem @authentication {
    uid: ID
    name: String
  }

  type CatalogueCategory @authentication {
    uid: ID! @id
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

  type CatalogueCategoryProperty @authentication {
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

  type CatalogueCategoryPropertyGroup @authentication {
    catalogueCategoriesHasGroup: [CatalogueCategory!]! @relationship(type: "HAS_GROUP", direction: IN)
    containsPropertyCatalogueCategoryProperties: [CatalogueCategoryProperty!]!
      @relationship(type: "CONTAINS_PROPERTY", direction: OUT)
    name: String!
    uid: String!
  }

  type CatalogueCategoryPropertyType @authentication {
    catalogueCategoryPropertiesIsPropertyType: [CatalogueCategoryProperty!]!
      @relationship(type: "IS_PROPERTY_TYPE", direction: IN)
    code: String!
    name: String!
    uid: String!
  }

  type CatalogueItem @authentication {
    catalogueCategory: CatalogueCategory! @relationship(type: "BELONGS_TO_CATEGORY", direction: OUT)
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

  type Facility @authentication {
    code: String!
    hasLocationLocations: [Location!]! @relationship(type: "HAS_LOCATION", direction: OUT)
    hasZoneZones: [Zone!]! @relationship(type: "HAS_ZONE", direction: OUT)
    locationsBelongsToFacility: [Location!]! @relationship(type: "BELONGS_TO_FACILITY", direction: IN)
    name: String!
    systemTypeGroupsBelongsToFacility: [SystemTypeGroup!]! @relationship(type: "BELONGS_TO_FACILITY", direction: IN)
    uid: String!
  }

  type Supplier @authentication {
    uid: ID! @id
    name: String!
  }

  type SchemaMigration @authentication {
    dirty: Boolean!
    ts: DateTime!
    version: BigInt!
  }

  type System
    @authorization(
      validate: [
        { operations: [READ], where: { jwt: { roles_INCLUDES: "systems-view" } } }
        { operations: [UPDATE, CREATE, DELETE, READ], where: { jwt: { roles_INCLUDES: "systems-edit" } } }
      ]
    ) {
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
    maintainedBy: [Employee!]! @relationship(type: "IS_MAINTAINED_BY", direction: OUT)
    systemLevel: SystemLevel
    keySystem: System
      @cypher(
        statement: """
        OPTIONAL MATCH path=(this)<-[:HAS_SUBSYSTEM*]-(parent:System)
        WHERE parent.systemLevel IN ['TECHNOLOGY_UNIT', 'KEY_SYSTEMS']
        RETURN parent as keySystem
        ORDER BY LENGTH(path) ASC
        LIMIT 1
        """
        columnName: "keySystem"
      )
    parentPath: [ParentPathItem]
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

  type Item @authentication {
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

  type SystemCriticality @authentication {
    code: String!
    name: String!
    uid: ID! @id
  }

  type ItemCondition @authentication {
    code: String!
    name: String!
    uid: ID! @id
  }

  type ItemUsage @authentication {
    code: String!
    name: String!
    uid: ID! @id
  }

  type SystemImportance @authentication {
    code: String!
    name: String!
    uid: ID! @id
  }

  type SystemType @authentication {
    code: String!
    mask: String!
    name: String!
    systemTypeGroup: SystemTypeGroup! @relationship(type: "CONTAINS_SYSTEM_TYPE", direction: IN)
    uid: ID! @id
  }

  type Order @authentication {
    uid: ID! @id
    name: String!
  }

  type Zone @authentication {
    code: String!
    facilitiesHasZone: [Facility!]! @relationship(type: "HAS_ZONE", direction: IN)
    hasSubzoneZones: [Zone!]! @relationship(type: "HAS_SUBZONE", direction: OUT)
    name: String!
    uid: ID! @id
    zonesHasSubzone: [Zone!]! @relationship(type: "HAS_SUBZONE", direction: IN)
  }

  type SystemTypeGroup @authentication {
    facility: Facility! @relationship(type: "BELONGS_TO_FACILITY", direction: OUT)
    systemTypes: [SystemType!]! @relationship(type: "CONTAINS_SYSTEM_TYPE", direction: OUT)
    name: String!
    uid: String!
  }

  type Unit @authentication {
    code: String!
    name: String!
    uid: ID! @id
  }

  type User
    @authorization(
      validate: [
        { operations: [UPDATE, READ], where: { node: { uid: "$jwt.sub" } } }
        { operations: [UPDATE, CREATE, READ, DELETE], where: { jwt: { roles_INCLUDES: "admin" } } }
      ]
    ) {
    email: String!
    firstName: String!
    roles: [Role!]! @relationship(type: "HAS_ROLE", direction: OUT)
    facility: Facility @relationship(type: "BELONGS_TO_FACILITY", direction: OUT)
    isEnabled: Boolean!
    lastName: String!
    passwordHash: String!
    passwordToChange: Boolean
    uid: ID! @id
    username: String!
  }

  type Role @authentication {
    code: String!
    name: String!
    uid: ID! @id
    usersHasRole: [User!]! @relationship(type: "HAS_ROLE", direction: IN)
  }
`
