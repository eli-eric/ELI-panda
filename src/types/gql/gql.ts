/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation CreateFilterMutation($input: [UserSettingsCreateInput!]!) {\n    createUserSettings(input: $input) {\n      userSettings {\n        key\n      }\n    }\n  }\n':
    types.CreateFilterMutationDocument,
  '\n  mutation DeleteFilterMutation($where: UserSettingsWhere) {\n    deleteUserSettings(where: $where) {\n      nodesDeleted\n    }\n  }\n':
    types.DeleteFilterMutationDocument,
  '\n  query UserSettings($userSettingsWhere: UserSettingsWhere) {\n    userSettings(where: $userSettingsWhere) {\n      uid\n      key\n      name\n      value\n    }\n  }\n':
    types.UserSettingsDocument,
  '\n  mutation UpdateFilterMutation(\n    $where: UserSettingsWhere\n    $update: UserSettingsUpdateInput\n  ) {\n    updateUserSettings(where: $where, update: $update) {\n      userSettings {\n        name\n        uid\n        value\n      }\n    }\n  }\n':
    types.UpdateFilterMutationDocument,
  '\n  query GetEmployee($uid: ID!) {\n    employees(where: { uid: $uid }) {\n      uid\n      fullName\n      firstName\n      facility {\n        code\n        name\n      }\n      lastName\n      phone1\n      phone2\n    }\n  }\n':
    types.GetEmployeeDocument,
  '\nquery Systems($where: SystemWhere) {\n  systems(where: $where) {\n    name\n    uid\n    systemCode\n    zone {\n      code\n    }\n  }\n}':
    types.SystemsDocument,
  '\nquery Query($where: EmployeeWhere) {\n  employees(where: $where) {\n    fullName\n    jobPosition\n    email\n    phone1\n    workplaceName\n    facility {\n      name\n    }\n  }\n}\n':
    types.QueryDocument,
  '\n  query UserPWDQuery($uid: ID!) {\n    users(where: { uid: $uid }) {\n      uid\n      passwordHash\n    }\n  }\n':
    types.UserPwdQueryDocument,
  '\n  query GetFacilities {\n    facilities {\n      code\n      name\n    }\n  }\n':
    types.GetFacilitiesDocument,
  '\n  query GetRoles {\n    roles {\n      name\n      code\n      uid\n    }\n  }\n':
    types.GetRolesDocument,
  '\n  mutation CreateUser($input: [UserCreateInput!]!) {\n    createUsers(input: $input) {\n      users {\n        uid\n      }\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  query UserQuery($where: UserWhere) {\n    users(where: $where) {\n      uid\n      email\n      firstName\n      isEnabled\n      lastName\n      passwordToChange\n      employee {\n        uid\n        fullName\n      }\n      roles {\n        name\n        code\n        uid\n      }\n      username\n      uid\n      facility {\n        name\n        code\n      }\n    }\n  }\n':
    types.UserQueryDocument,
  '\n  mutation UpdateUsers($where: UserWhere, $update: UserUpdateInput) {\n    updateUsers(where: $where, update: $update) {\n      users {\n        uid\n      }\n    }\n  }\n':
    types.UpdateUsersDocument,
  '\n  mutation DeleteUsers($where: UserWhere) {\n    deleteUsers(where: $where) {\n      nodesDeleted\n    }\n  }\n':
    types.DeleteUsersDocument,
  '\n  query UsersQuery($where: UserWhere) {\n    users(where: $where) {\n      uid\n      email\n      firstName\n      isEnabled\n      lastName\n      passwordToChange\n      employee {\n        uid\n        fullName\n      }\n      roles {\n        name\n        code\n        uid\n      }\n      username\n      uid\n      facility {\n        name\n        code\n      }\n  }\n  }\n':
    types.UsersQueryDocument,
  '\n  query GetCategory($uid: ID = null) {\n    catalogueCategories(where: { uid: $uid }) {\n      uid\n      name\n      systemType {\n        uid\n        name\n      }\n      parentPath {\n        uid\n        name\n      }\n    }\n  }\n':
    types.GetCategoryDocument,
  '\n  query GetCategories($where: CatalogueCategoryWhere) {\n    catalogueCategories(where: $where) {\n      name\n      uid\n      code\n      miniImageUrl\n    }\n  }\n':
    types.GetCategoriesDocument,
  '\n  mutation CreateRelatedItemMutation(\n    $where: CatalogueItemWhere\n    $update: CatalogueItemUpdateInput\n  ) {\n    updateCatalogueItems(where: $where, update: $update) {\n      catalogueItems {\n        relatedCatalogueItems {\n          name\n        }\n      }\n    }\n  }\n':
    types.CreateRelatedItemMutationDocument,
  '\n  mutation DisconnectRelatedItemMutation(\n    $where: CatalogueItemWhere\n    $update: CatalogueItemUpdateInput\n  ) {\n    updateCatalogueItems(where: $where, update: $update) {\n      catalogueItems {\n        relatedCatalogueItems {\n          name\n        }\n      }\n    }\n  }\n':
    types.DisconnectRelatedItemMutationDocument,
  '\n  query RelatedCatalogueItems($where: CatalogueItemWhere) {\n    catalogueItems(where: $where) {\n      relatedCatalogueItems {\n        name\n        catalogueCategory {\n          name\n          uid\n        }\n        supplier {\n          name\n          uid\n        }\n        description\n        catalogueNumber\n        uid\n        manufacturerUrl\n      }\n    }\n  }\n':
    types.RelatedCatalogueItemsDocument,
  '\n  query RelatedCatalogueItemsFor($where: CatalogueItemWhere) {\n    catalogueItems(where: $where) {\n      relatedCatalogueItemsFor {\n        name\n        catalogueCategory {\n          name\n          uid\n        }\n        supplier {\n          name\n          uid\n        }\n        description\n        catalogueNumber\n        uid\n        manufacturerUrl\n      }\n    }\n  }\n':
    types.RelatedCatalogueItemsForDocument,
  '\n  query GetContactPersonRoles {\n    contactPersonRoles {\n      uid\n      name\n    }\n  }\n':
    types.GetContactPersonRolesDocument,
  '\n  query RoomCardQuery($where: RoomCardWhere) {\n    roomCards(where: $where) {\n      name\n      status\n      purityClass\n      prescribedClothing\n      entryToHvacTent\n      cleaningScheduleDate\n      cleaningScheduleDays\n      additionalRequirements\n      coolingWater\n      indoorEnvironmentQuality\n      compressedAirDistribution\n      nitrogenCentralDistribution\n      maxPressureInColdDistribution\n      coolingWaterClient\n      indoorEnvironmentQualityClient\n      compressedAirDistributionClient\n      nitrogenCentralDistributionClient\n      maxPressureInColdDistributionClient\n      contactPersonsHall {\n        uid\n        role {\n          uid\n          name\n        }\n        employee {\n          uid\n          fullName\n          phone1\n          phone2\n        }\n      }\n      contactPersonsDept {\n        uid\n        fullName\n        phone1\n        phone2\n      }\n      locations {\n        code\n        uid\n        name\n      }\n      teams {\n        name\n        uid\n      }\n    }\n  }\n':
    types.RoomCardQueryDocument,
  '\n  mutation CreateRoomCards($input: [RoomCardCreateInput!]!) {\n    createRoomCards(input: $input) {\n      roomCards {\n        uid\n      }\n    }\n  }\n':
    types.CreateRoomCardsDocument,
  '\n  mutation UpdateRoomCardMutation(\n    $where: RoomCardWhere\n    $update: RoomCardUpdateInput\n  ) {\n    updateRoomCards(where: $where, update: $update) {\n      roomCards {\n        purityClass\n        name\n        status\n        prescribedClothing\n        entryToHvacTent\n        cleaningScheduleDate\n        additionalRequirements\n        coolingWater\n        indoorEnvironmentQuality\n        compressedAirDistribution\n        nitrogenCentralDistribution\n        maxPressureInColdDistribution\n        coolingWaterClient\n        indoorEnvironmentQualityClient\n        compressedAirDistributionClient\n        nitrogenCentralDistributionClient\n        maxPressureInColdDistributionClient\n        contactPersonsHall {\n          role {\n            uid\n            name\n          }\n          employee {\n            uid\n            fullName\n            phone1\n            phone2\n          }\n        }\n        contactPersonsDept {\n          uid\n          fullName\n          phone1\n          phone2\n        }\n        locations {\n          code\n          uid\n          name\n        }\n        teams {\n          name\n          uid\n        }\n      }\n    }\n  }\n':
    types.UpdateRoomCardMutationDocument,
  '\n  query TeamsQuery {\n    teams {\n      uid\n      name\n    }\n  }\n':
    types.TeamsQueryDocument,
  '\n  mutation DeleteRoomCards(\n    $deleteHallContactPeopleWhere: HallContactPersonWhere\n    $where: RoomCardWhere\n  ) {\n    deleteRoomCards(where: $where) {\n      nodesDeleted\n    }\n    deleteHallContactPeople(where: $deleteHallContactPeopleWhere) {\n      nodesDeleted\n    }\n  }\n':
    types.DeleteRoomCardsDocument,
  '\n  query RoomCardsQuery($where: RoomCardWhere) {\n    roomCards(where: $where) {\n      uid\n      name\n      purityClass\n      status\n      prescribedClothing\n      entryToHvacTent\n      cleaningScheduleDays\n      additionalRequirements\n      coolingWater\n      indoorEnvironmentQuality\n      compressedAirDistribution\n      nitrogenCentralDistribution\n      maxPressureInColdDistribution\n      locations {\n        code\n        name\n      }\n    }\n  }\n':
    types.RoomCardsQueryDocument,
  '\n  query LocationsQuery($where: LocationWhere) {\n    locations(where: $where) {\n      uid\n      name\n      code\n      subLocations {\n        uid\n      }\n    }\n  }\n':
    types.LocationsQueryDocument,
  '\n  query SubLocationsQuery($where: LocationWhere) {\n    locations(where: $where) {\n      subLocations {\n        uid\n        name\n        code\n        subLocations {\n          uid\n        }\n      }\n    }\n  }\n':
    types.SubLocationsQueryDocument,
  '\n  query SystemTypeQuery(\n    $systemTypesWhere: SystemTypeWhere\n    $where: SystemTypeGroupWhere\n  ) {\n    systemTypeGroups(where: $where, options: { sort: [{ name: ASC }] }) {\n      name\n      uid\n      systemTypes(\n        where: $systemTypesWhere\n        options: { sort: [{ name: ASC }] }\n      ) {\n        name\n        code\n        uid\n      }\n    }\n  }\n':
    types.SystemTypeQueryDocument,
  '\nmutation UpdateSystems($disconnect: SystemDisconnectInput, $where: SystemWhere) {\n  updateSystems(disconnect: $disconnect, where: $where) {\n    systems {\n      sparePartsConnection {\n        edges {\n          coverage\n          node {\n            name\n            parentPath {\n              name \n              uid \n            }\n            location {\n              code\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n}':
    types.UpdateSystemsDocument,
  '\n  query SystemDetail($where: SystemWhere) {\n    systems(where: $where) {\n      ...SystemDetail\n  }\n   }\n':
    types.SystemDetailDocument,
  '\n  query SubSystemDetail($where: SystemWhere) {\n    systems(where: $where) {\n      uid\n      name\n      systemLevel\n      location {\n        uid\n        name\n      }\n      physicalItem {\n        uid\n        name\n        itemUsage {\n          uid\n          name\n        }\n      }\n      sp_coverage\n      minimalSpareParstCount\n  }\n   }\n':
    types.SubSystemDetailDocument,
  '\n  mutation ClearSystemCodeMutation(\n    $where: SystemWhere\n    $update: SystemUpdateInput\n  ) {\n    updateSystems(where: $where, update: $update) {\n      systems {\n        systemCode\n      }\n    }\n  }\n':
    types.ClearSystemCodeMutationDocument,
  '\n  mutation CreateSystems($input: [SystemCreateInput!]!) {\n    createSystems(input: $input) {\n      systems {\n       ...SystemDetail\n      }\n    }\n  }\n':
    types.CreateSystemsDocument,
  '\n  query SystemDetailParent($where: SystemWhere) {\n    systems(where: $where) {\n      uid\n      name\n      parentPath {\n        uid\n        name\n        systemLevel\n      }\n      responsible {\n        uid\n        fullName\n      }\n      location {\n        uid\n        name\n      }\n      zone {\n        uid\n        name\n      }\n  }\n   }\n':
    types.SystemDetailParentDocument,
  '\n  mutation UpdateSystemMutation(\n    $where: SystemWhere\n    $update: SystemUpdateInput!\n    $updateItemsWhere: ItemWhere\n    $updateItem: ItemUpdateInput\n    $node: String\n    $nodeUid: String\n    $action: String\n    $itemUid: String\n    $systemOriginatedUid: String\n  ) {\n    updateItems(where: $updateItemsWhere, update: $updateItem) {\n      items {\n        name\n      }\n    }\n    updateSystems(where: $where, update: $update) {\n      systems {\n        ...SystemDetail\n      }\n    }\n    updatedByResolver(node: $node, nodeUid: $nodeUid, action: $action)\n    itemOriginatedResolver(\n      itemUid: $itemUid\n      systemOriginatedUid: $systemOriginatedUid\n    )\n  }\n':
    types.UpdateSystemMutationDocument,
  '\n  mutation UpdateSystemParentMutation(\n    $where: SystemWhere\n    $update: SystemUpdateInput!\n    $systemFromUid: String\n    $systemUid: String\n  ) {\n    updateSystems(where: $where, update: $update) {\n      systems {\n        ...SystemDetail\n      }\n    }\n    systemMovedFromResolver(\n      systemFromUid: $systemFromUid\n      systemUid: $systemUid\n    )\n  }\n':
    types.UpdateSystemParentMutationDocument,
  '\n  mutation CreateSparePartRelation($fromSystemIds: [ID!]!, $toSystemIds: [ID!]!) {\n    createSparePartRelation(fromSystemIds: $fromSystemIds, toSystemIds: $toSystemIds)\n  }\n':
    types.CreateSparePartRelationDocument,
  '\n  query SystemsSpareParts($where: SystemWhere) {\n    systems(where: $where) {\n      spareParts {\n        name\n        parentPath {\n          name\n          uid\n        }\n        systemLevel\n        systemType {\n          name\n        }\n        description\n        zone {\n          name\n        }\n        location {\n          name\n          uid\n        }\n      }\n    }\n  }\n':
    types.SystemsSparePartsDocument,
  '\n  query SystemSparePartsFor($where: SystemWhere) {\n    systems(where: $where) {\n      sparePartsFor {\n        name\n        parentPath {\n          name\n          uid\n        }\n        systemLevel\n        systemType {\n          name\n        }\n        description\n        zone {\n          name\n        }\n        location {\n          name\n          uid\n        }\n      }\n    }\n  }\n':
    types.SystemSparePartsForDocument,
  '\n  fragment SystemFields on System {\n    uid\n    name\n    systemCode\n    sp_coverage\n    sparePartsCoverageSum\n    minimalSpareParstCount\n    responsibleTeam {\n      uid\n      name\n    }\n    systemLevel\n    description\n    subSystems {\n      uid\n      name\n      location {\n        uid\n        name\n      }\n      systemLevel\n      parentPath {\n        uid\n        name\n        systemLevel\n      }\n      physicalItem {\n        uid\n        eun\n        name\n        serialNumber\n        itemUsage {\n          uid\n          name\n        }\n      }\n    }\n    keySystem {\n      uid\n      name\n    }\n    parentPath {\n      uid\n      name\n      systemLevel\n    }\n    location {\n      uid\n      name\n      code\n    }\n    maintainedBy {\n      fullName\n      uid\n    }\n    operators {\n      uid\n      fullName\n    }\n    parentSystem {\n      uid\n      name\n    }\n    responsible {\n      uid\n      fullName\n    }\n    systemType {\n      uid\n      name\n    }\n    zone {\n      uid\n      name\n    }\n  }\n':
    types.SystemFieldsFragmentDoc,
  '\n  fragment CatalogueItem on CatalogueItem {\n    uid\n    name\n    catalogueNumber\n    description\n    catalogueCategory {\n      uid\n      name\n    }\n    supplier {\n      uid\n      name\n    }\n    propertiesConnection {\n      edges {\n        value\n        node {\n          uid\n          name\n          groups {\n            uid\n            name\n          }\n          type {\n            name\n            uid\n          }\n          unit {\n            name\n            uid\n          }\n        }\n      }\n    }\n  }\n':
    types.CatalogueItemFragmentDoc,
  '\n  fragment ServiceItem on ServiceItem {\n    uid\n    name\n    isDelivered\n    order {\n      uid\n      name\n      orderDate\n    }\n    detailsConnection {\n      edges {\n        value\n        node {\n          uid\n          name\n          groups {\n            uid\n            name\n          }\n          type {\n            name\n            uid\n          }\n          unit {\n            name\n            uid\n          }\n        }\n      }\n    }\n  }\n':
    types.ServiceItemFragmentDoc,
  '\n  fragment PhysicalItem on Item {\n    uid\n    eun\n    name\n    notes\n    serialNumber\n    conditionStatus {\n      uid\n      name\n    }\n    orderConnection {\n      edges {\n        isDelivered\n        node {\n          uid\n          orderDate\n          name\n        }\n      }\n    }\n    order {\n      uid\n      orderDate\n      name\n    }\n    itemUsage {\n      uid\n      name\n    }\n    serviceItemsConnection {\n      edges {\n        created\n        node {\n          uid\n    name\n    isDelivered\n    order {\n      uid\n      name\n      orderDate\n    }\n    detailsConnection {\n      edges {\n        value\n        node {\n          uid\n          name\n          groups {\n            uid\n            name\n          }\n          type {\n            name\n            uid\n          }\n          unit {\n            name\n            uid\n          }\n        }\n      }\n    }\n        }\n      }\n    }\n    catalogueItem {\n      ...CatalogueItem\n    }\n  }\n':
    types.PhysicalItemFragmentDoc,
  '\n  fragment SystemDetail on System {\n    uid\n    name\n    systemCode\n    sp_coverage\n    sparePartsCoverageSum\n    minimalSpareParstCount\n    responsibleTeam {\n      uid\n      name\n    }\n    systemLevel\n    attribute {\n      uid\n      name\n    }\n    description\n    subSystems {\n      uid\n      name\n      deleted\n      sp_coverage\n      minimalSpareParstCount\n      location {\n        uid\n        name\n      }\n      systemLevel\n      parentPath {\n        uid\n        name\n        systemLevel\n      }\n      physicalItem {\n        uid\n        eun\n        name\n        serialNumber\n        itemUsage {\n          uid\n          name\n        }\n      }\n    }\n    keySystem {\n      uid\n      name\n    }\n    parentPath {\n      uid\n      name\n      systemLevel\n    }\n    location {\n      uid\n      name\n      code\n    }\n    maintainedBy {\n      fullName\n      uid\n    }\n    operators {\n      uid\n      fullName\n    }\n    parentSystem {\n      uid\n      name\n    }\n    responsible {\n      uid\n      fullName\n    }\n    systemType {\n      uid\n      name\n    }\n    zone {\n      uid\n      name\n    }\n    physicalItem {\n      ...PhysicalItem\n    }\n    sparePartsConnection {\n      edges {\n        coverage\n        node {\n          name\n          uid\n          parentPath {\n            name\n            uid\n          }\n          location {\n            name\n            code\n          }\n          physicalItem {\n            ...PhysicalItem\n          }\n        }\n      }\n    }\n    sparePartsFor {\n      ...SystemFields\n      physicalItem {\n        ...PhysicalItem\n      }\n    }\n  }\n':
    types.SystemDetailFragmentDoc,
  '\n  fragment User on User {\n    uid\n    email\n    firstName\n    isEnabled\n    lastName\n    passwordToChange\n    employee {\n      uid\n      fullName\n    }\n    roles {\n      name\n      code\n      uid\n    }\n    username\n    uid\n    facility {\n      name\n      code\n    }\n  }\n':
    types.UserFragmentDoc
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateFilterMutation($input: [UserSettingsCreateInput!]!) {\n    createUserSettings(input: $input) {\n      userSettings {\n        key\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateFilterMutation($input: [UserSettingsCreateInput!]!) {\n    createUserSettings(input: $input) {\n      userSettings {\n        key\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteFilterMutation($where: UserSettingsWhere) {\n    deleteUserSettings(where: $where) {\n      nodesDeleted\n    }\n  }\n'
): (typeof documents)['\n  mutation DeleteFilterMutation($where: UserSettingsWhere) {\n    deleteUserSettings(where: $where) {\n      nodesDeleted\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query UserSettings($userSettingsWhere: UserSettingsWhere) {\n    userSettings(where: $userSettingsWhere) {\n      uid\n      key\n      name\n      value\n    }\n  }\n'
): (typeof documents)['\n  query UserSettings($userSettingsWhere: UserSettingsWhere) {\n    userSettings(where: $userSettingsWhere) {\n      uid\n      key\n      name\n      value\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateFilterMutation(\n    $where: UserSettingsWhere\n    $update: UserSettingsUpdateInput\n  ) {\n    updateUserSettings(where: $where, update: $update) {\n      userSettings {\n        name\n        uid\n        value\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateFilterMutation(\n    $where: UserSettingsWhere\n    $update: UserSettingsUpdateInput\n  ) {\n    updateUserSettings(where: $where, update: $update) {\n      userSettings {\n        name\n        uid\n        value\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetEmployee($uid: ID!) {\n    employees(where: { uid: $uid }) {\n      uid\n      fullName\n      firstName\n      facility {\n        code\n        name\n      }\n      lastName\n      phone1\n      phone2\n    }\n  }\n'
): (typeof documents)['\n  query GetEmployee($uid: ID!) {\n    employees(where: { uid: $uid }) {\n      uid\n      fullName\n      firstName\n      facility {\n        code\n        name\n      }\n      lastName\n      phone1\n      phone2\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\nquery Systems($where: SystemWhere) {\n  systems(where: $where) {\n    name\n    uid\n    systemCode\n    zone {\n      code\n    }\n  }\n}'
): (typeof documents)['\nquery Systems($where: SystemWhere) {\n  systems(where: $where) {\n    name\n    uid\n    systemCode\n    zone {\n      code\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\nquery Query($where: EmployeeWhere) {\n  employees(where: $where) {\n    fullName\n    jobPosition\n    email\n    phone1\n    workplaceName\n    facility {\n      name\n    }\n  }\n}\n'
): (typeof documents)['\nquery Query($where: EmployeeWhere) {\n  employees(where: $where) {\n    fullName\n    jobPosition\n    email\n    phone1\n    workplaceName\n    facility {\n      name\n    }\n  }\n}\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query UserPWDQuery($uid: ID!) {\n    users(where: { uid: $uid }) {\n      uid\n      passwordHash\n    }\n  }\n'
): (typeof documents)['\n  query UserPWDQuery($uid: ID!) {\n    users(where: { uid: $uid }) {\n      uid\n      passwordHash\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetFacilities {\n    facilities {\n      code\n      name\n    }\n  }\n'
): (typeof documents)['\n  query GetFacilities {\n    facilities {\n      code\n      name\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetRoles {\n    roles {\n      name\n      code\n      uid\n    }\n  }\n'
): (typeof documents)['\n  query GetRoles {\n    roles {\n      name\n      code\n      uid\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateUser($input: [UserCreateInput!]!) {\n    createUsers(input: $input) {\n      users {\n        uid\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateUser($input: [UserCreateInput!]!) {\n    createUsers(input: $input) {\n      users {\n        uid\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query UserQuery($where: UserWhere) {\n    users(where: $where) {\n      uid\n      email\n      firstName\n      isEnabled\n      lastName\n      passwordToChange\n      employee {\n        uid\n        fullName\n      }\n      roles {\n        name\n        code\n        uid\n      }\n      username\n      uid\n      facility {\n        name\n        code\n      }\n    }\n  }\n'
): (typeof documents)['\n  query UserQuery($where: UserWhere) {\n    users(where: $where) {\n      uid\n      email\n      firstName\n      isEnabled\n      lastName\n      passwordToChange\n      employee {\n        uid\n        fullName\n      }\n      roles {\n        name\n        code\n        uid\n      }\n      username\n      uid\n      facility {\n        name\n        code\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateUsers($where: UserWhere, $update: UserUpdateInput) {\n    updateUsers(where: $where, update: $update) {\n      users {\n        uid\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateUsers($where: UserWhere, $update: UserUpdateInput) {\n    updateUsers(where: $where, update: $update) {\n      users {\n        uid\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteUsers($where: UserWhere) {\n    deleteUsers(where: $where) {\n      nodesDeleted\n    }\n  }\n'
): (typeof documents)['\n  mutation DeleteUsers($where: UserWhere) {\n    deleteUsers(where: $where) {\n      nodesDeleted\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query UsersQuery($where: UserWhere) {\n    users(where: $where) {\n      uid\n      email\n      firstName\n      isEnabled\n      lastName\n      passwordToChange\n      employee {\n        uid\n        fullName\n      }\n      roles {\n        name\n        code\n        uid\n      }\n      username\n      uid\n      facility {\n        name\n        code\n      }\n  }\n  }\n'
): (typeof documents)['\n  query UsersQuery($where: UserWhere) {\n    users(where: $where) {\n      uid\n      email\n      firstName\n      isEnabled\n      lastName\n      passwordToChange\n      employee {\n        uid\n        fullName\n      }\n      roles {\n        name\n        code\n        uid\n      }\n      username\n      uid\n      facility {\n        name\n        code\n      }\n  }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetCategory($uid: ID = null) {\n    catalogueCategories(where: { uid: $uid }) {\n      uid\n      name\n      systemType {\n        uid\n        name\n      }\n      parentPath {\n        uid\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetCategory($uid: ID = null) {\n    catalogueCategories(where: { uid: $uid }) {\n      uid\n      name\n      systemType {\n        uid\n        name\n      }\n      parentPath {\n        uid\n        name\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetCategories($where: CatalogueCategoryWhere) {\n    catalogueCategories(where: $where) {\n      name\n      uid\n      code\n      miniImageUrl\n    }\n  }\n'
): (typeof documents)['\n  query GetCategories($where: CatalogueCategoryWhere) {\n    catalogueCategories(where: $where) {\n      name\n      uid\n      code\n      miniImageUrl\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateRelatedItemMutation(\n    $where: CatalogueItemWhere\n    $update: CatalogueItemUpdateInput\n  ) {\n    updateCatalogueItems(where: $where, update: $update) {\n      catalogueItems {\n        relatedCatalogueItems {\n          name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateRelatedItemMutation(\n    $where: CatalogueItemWhere\n    $update: CatalogueItemUpdateInput\n  ) {\n    updateCatalogueItems(where: $where, update: $update) {\n      catalogueItems {\n        relatedCatalogueItems {\n          name\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DisconnectRelatedItemMutation(\n    $where: CatalogueItemWhere\n    $update: CatalogueItemUpdateInput\n  ) {\n    updateCatalogueItems(where: $where, update: $update) {\n      catalogueItems {\n        relatedCatalogueItems {\n          name\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation DisconnectRelatedItemMutation(\n    $where: CatalogueItemWhere\n    $update: CatalogueItemUpdateInput\n  ) {\n    updateCatalogueItems(where: $where, update: $update) {\n      catalogueItems {\n        relatedCatalogueItems {\n          name\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query RelatedCatalogueItems($where: CatalogueItemWhere) {\n    catalogueItems(where: $where) {\n      relatedCatalogueItems {\n        name\n        catalogueCategory {\n          name\n          uid\n        }\n        supplier {\n          name\n          uid\n        }\n        description\n        catalogueNumber\n        uid\n        manufacturerUrl\n      }\n    }\n  }\n'
): (typeof documents)['\n  query RelatedCatalogueItems($where: CatalogueItemWhere) {\n    catalogueItems(where: $where) {\n      relatedCatalogueItems {\n        name\n        catalogueCategory {\n          name\n          uid\n        }\n        supplier {\n          name\n          uid\n        }\n        description\n        catalogueNumber\n        uid\n        manufacturerUrl\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query RelatedCatalogueItemsFor($where: CatalogueItemWhere) {\n    catalogueItems(where: $where) {\n      relatedCatalogueItemsFor {\n        name\n        catalogueCategory {\n          name\n          uid\n        }\n        supplier {\n          name\n          uid\n        }\n        description\n        catalogueNumber\n        uid\n        manufacturerUrl\n      }\n    }\n  }\n'
): (typeof documents)['\n  query RelatedCatalogueItemsFor($where: CatalogueItemWhere) {\n    catalogueItems(where: $where) {\n      relatedCatalogueItemsFor {\n        name\n        catalogueCategory {\n          name\n          uid\n        }\n        supplier {\n          name\n          uid\n        }\n        description\n        catalogueNumber\n        uid\n        manufacturerUrl\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetContactPersonRoles {\n    contactPersonRoles {\n      uid\n      name\n    }\n  }\n'
): (typeof documents)['\n  query GetContactPersonRoles {\n    contactPersonRoles {\n      uid\n      name\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query RoomCardQuery($where: RoomCardWhere) {\n    roomCards(where: $where) {\n      name\n      status\n      purityClass\n      prescribedClothing\n      entryToHvacTent\n      cleaningScheduleDate\n      cleaningScheduleDays\n      additionalRequirements\n      coolingWater\n      indoorEnvironmentQuality\n      compressedAirDistribution\n      nitrogenCentralDistribution\n      maxPressureInColdDistribution\n      coolingWaterClient\n      indoorEnvironmentQualityClient\n      compressedAirDistributionClient\n      nitrogenCentralDistributionClient\n      maxPressureInColdDistributionClient\n      contactPersonsHall {\n        uid\n        role {\n          uid\n          name\n        }\n        employee {\n          uid\n          fullName\n          phone1\n          phone2\n        }\n      }\n      contactPersonsDept {\n        uid\n        fullName\n        phone1\n        phone2\n      }\n      locations {\n        code\n        uid\n        name\n      }\n      teams {\n        name\n        uid\n      }\n    }\n  }\n'
): (typeof documents)['\n  query RoomCardQuery($where: RoomCardWhere) {\n    roomCards(where: $where) {\n      name\n      status\n      purityClass\n      prescribedClothing\n      entryToHvacTent\n      cleaningScheduleDate\n      cleaningScheduleDays\n      additionalRequirements\n      coolingWater\n      indoorEnvironmentQuality\n      compressedAirDistribution\n      nitrogenCentralDistribution\n      maxPressureInColdDistribution\n      coolingWaterClient\n      indoorEnvironmentQualityClient\n      compressedAirDistributionClient\n      nitrogenCentralDistributionClient\n      maxPressureInColdDistributionClient\n      contactPersonsHall {\n        uid\n        role {\n          uid\n          name\n        }\n        employee {\n          uid\n          fullName\n          phone1\n          phone2\n        }\n      }\n      contactPersonsDept {\n        uid\n        fullName\n        phone1\n        phone2\n      }\n      locations {\n        code\n        uid\n        name\n      }\n      teams {\n        name\n        uid\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateRoomCards($input: [RoomCardCreateInput!]!) {\n    createRoomCards(input: $input) {\n      roomCards {\n        uid\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateRoomCards($input: [RoomCardCreateInput!]!) {\n    createRoomCards(input: $input) {\n      roomCards {\n        uid\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateRoomCardMutation(\n    $where: RoomCardWhere\n    $update: RoomCardUpdateInput\n  ) {\n    updateRoomCards(where: $where, update: $update) {\n      roomCards {\n        purityClass\n        name\n        status\n        prescribedClothing\n        entryToHvacTent\n        cleaningScheduleDate\n        additionalRequirements\n        coolingWater\n        indoorEnvironmentQuality\n        compressedAirDistribution\n        nitrogenCentralDistribution\n        maxPressureInColdDistribution\n        coolingWaterClient\n        indoorEnvironmentQualityClient\n        compressedAirDistributionClient\n        nitrogenCentralDistributionClient\n        maxPressureInColdDistributionClient\n        contactPersonsHall {\n          role {\n            uid\n            name\n          }\n          employee {\n            uid\n            fullName\n            phone1\n            phone2\n          }\n        }\n        contactPersonsDept {\n          uid\n          fullName\n          phone1\n          phone2\n        }\n        locations {\n          code\n          uid\n          name\n        }\n        teams {\n          name\n          uid\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateRoomCardMutation(\n    $where: RoomCardWhere\n    $update: RoomCardUpdateInput\n  ) {\n    updateRoomCards(where: $where, update: $update) {\n      roomCards {\n        purityClass\n        name\n        status\n        prescribedClothing\n        entryToHvacTent\n        cleaningScheduleDate\n        additionalRequirements\n        coolingWater\n        indoorEnvironmentQuality\n        compressedAirDistribution\n        nitrogenCentralDistribution\n        maxPressureInColdDistribution\n        coolingWaterClient\n        indoorEnvironmentQualityClient\n        compressedAirDistributionClient\n        nitrogenCentralDistributionClient\n        maxPressureInColdDistributionClient\n        contactPersonsHall {\n          role {\n            uid\n            name\n          }\n          employee {\n            uid\n            fullName\n            phone1\n            phone2\n          }\n        }\n        contactPersonsDept {\n          uid\n          fullName\n          phone1\n          phone2\n        }\n        locations {\n          code\n          uid\n          name\n        }\n        teams {\n          name\n          uid\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query TeamsQuery {\n    teams {\n      uid\n      name\n    }\n  }\n'
): (typeof documents)['\n  query TeamsQuery {\n    teams {\n      uid\n      name\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteRoomCards(\n    $deleteHallContactPeopleWhere: HallContactPersonWhere\n    $where: RoomCardWhere\n  ) {\n    deleteRoomCards(where: $where) {\n      nodesDeleted\n    }\n    deleteHallContactPeople(where: $deleteHallContactPeopleWhere) {\n      nodesDeleted\n    }\n  }\n'
): (typeof documents)['\n  mutation DeleteRoomCards(\n    $deleteHallContactPeopleWhere: HallContactPersonWhere\n    $where: RoomCardWhere\n  ) {\n    deleteRoomCards(where: $where) {\n      nodesDeleted\n    }\n    deleteHallContactPeople(where: $deleteHallContactPeopleWhere) {\n      nodesDeleted\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query RoomCardsQuery($where: RoomCardWhere) {\n    roomCards(where: $where) {\n      uid\n      name\n      purityClass\n      status\n      prescribedClothing\n      entryToHvacTent\n      cleaningScheduleDays\n      additionalRequirements\n      coolingWater\n      indoorEnvironmentQuality\n      compressedAirDistribution\n      nitrogenCentralDistribution\n      maxPressureInColdDistribution\n      locations {\n        code\n        name\n      }\n    }\n  }\n'
): (typeof documents)['\n  query RoomCardsQuery($where: RoomCardWhere) {\n    roomCards(where: $where) {\n      uid\n      name\n      purityClass\n      status\n      prescribedClothing\n      entryToHvacTent\n      cleaningScheduleDays\n      additionalRequirements\n      coolingWater\n      indoorEnvironmentQuality\n      compressedAirDistribution\n      nitrogenCentralDistribution\n      maxPressureInColdDistribution\n      locations {\n        code\n        name\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query LocationsQuery($where: LocationWhere) {\n    locations(where: $where) {\n      uid\n      name\n      code\n      subLocations {\n        uid\n      }\n    }\n  }\n'
): (typeof documents)['\n  query LocationsQuery($where: LocationWhere) {\n    locations(where: $where) {\n      uid\n      name\n      code\n      subLocations {\n        uid\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query SubLocationsQuery($where: LocationWhere) {\n    locations(where: $where) {\n      subLocations {\n        uid\n        name\n        code\n        subLocations {\n          uid\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query SubLocationsQuery($where: LocationWhere) {\n    locations(where: $where) {\n      subLocations {\n        uid\n        name\n        code\n        subLocations {\n          uid\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query SystemTypeQuery(\n    $systemTypesWhere: SystemTypeWhere\n    $where: SystemTypeGroupWhere\n  ) {\n    systemTypeGroups(where: $where, options: { sort: [{ name: ASC }] }) {\n      name\n      uid\n      systemTypes(\n        where: $systemTypesWhere\n        options: { sort: [{ name: ASC }] }\n      ) {\n        name\n        code\n        uid\n      }\n    }\n  }\n'
): (typeof documents)['\n  query SystemTypeQuery(\n    $systemTypesWhere: SystemTypeWhere\n    $where: SystemTypeGroupWhere\n  ) {\n    systemTypeGroups(where: $where, options: { sort: [{ name: ASC }] }) {\n      name\n      uid\n      systemTypes(\n        where: $systemTypesWhere\n        options: { sort: [{ name: ASC }] }\n      ) {\n        name\n        code\n        uid\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\nmutation UpdateSystems($disconnect: SystemDisconnectInput, $where: SystemWhere) {\n  updateSystems(disconnect: $disconnect, where: $where) {\n    systems {\n      sparePartsConnection {\n        edges {\n          coverage\n          node {\n            name\n            parentPath {\n              name \n              uid \n            }\n            location {\n              code\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n}'
): (typeof documents)['\nmutation UpdateSystems($disconnect: SystemDisconnectInput, $where: SystemWhere) {\n  updateSystems(disconnect: $disconnect, where: $where) {\n    systems {\n      sparePartsConnection {\n        edges {\n          coverage\n          node {\n            name\n            parentPath {\n              name \n              uid \n            }\n            location {\n              code\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query SystemDetail($where: SystemWhere) {\n    systems(where: $where) {\n      ...SystemDetail\n  }\n   }\n'
): (typeof documents)['\n  query SystemDetail($where: SystemWhere) {\n    systems(where: $where) {\n      ...SystemDetail\n  }\n   }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query SubSystemDetail($where: SystemWhere) {\n    systems(where: $where) {\n      uid\n      name\n      systemLevel\n      location {\n        uid\n        name\n      }\n      physicalItem {\n        uid\n        name\n        itemUsage {\n          uid\n          name\n        }\n      }\n      sp_coverage\n      minimalSpareParstCount\n  }\n   }\n'
): (typeof documents)['\n  query SubSystemDetail($where: SystemWhere) {\n    systems(where: $where) {\n      uid\n      name\n      systemLevel\n      location {\n        uid\n        name\n      }\n      physicalItem {\n        uid\n        name\n        itemUsage {\n          uid\n          name\n        }\n      }\n      sp_coverage\n      minimalSpareParstCount\n  }\n   }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation ClearSystemCodeMutation(\n    $where: SystemWhere\n    $update: SystemUpdateInput\n  ) {\n    updateSystems(where: $where, update: $update) {\n      systems {\n        systemCode\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation ClearSystemCodeMutation(\n    $where: SystemWhere\n    $update: SystemUpdateInput\n  ) {\n    updateSystems(where: $where, update: $update) {\n      systems {\n        systemCode\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateSystems($input: [SystemCreateInput!]!) {\n    createSystems(input: $input) {\n      systems {\n       ...SystemDetail\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateSystems($input: [SystemCreateInput!]!) {\n    createSystems(input: $input) {\n      systems {\n       ...SystemDetail\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query SystemDetailParent($where: SystemWhere) {\n    systems(where: $where) {\n      uid\n      name\n      parentPath {\n        uid\n        name\n        systemLevel\n      }\n      responsible {\n        uid\n        fullName\n      }\n      location {\n        uid\n        name\n      }\n      zone {\n        uid\n        name\n      }\n  }\n   }\n'
): (typeof documents)['\n  query SystemDetailParent($where: SystemWhere) {\n    systems(where: $where) {\n      uid\n      name\n      parentPath {\n        uid\n        name\n        systemLevel\n      }\n      responsible {\n        uid\n        fullName\n      }\n      location {\n        uid\n        name\n      }\n      zone {\n        uid\n        name\n      }\n  }\n   }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateSystemMutation(\n    $where: SystemWhere\n    $update: SystemUpdateInput!\n    $updateItemsWhere: ItemWhere\n    $updateItem: ItemUpdateInput\n    $node: String\n    $nodeUid: String\n    $action: String\n    $itemUid: String\n    $systemOriginatedUid: String\n  ) {\n    updateItems(where: $updateItemsWhere, update: $updateItem) {\n      items {\n        name\n      }\n    }\n    updateSystems(where: $where, update: $update) {\n      systems {\n        ...SystemDetail\n      }\n    }\n    updatedByResolver(node: $node, nodeUid: $nodeUid, action: $action)\n    itemOriginatedResolver(\n      itemUid: $itemUid\n      systemOriginatedUid: $systemOriginatedUid\n    )\n  }\n'
): (typeof documents)['\n  mutation UpdateSystemMutation(\n    $where: SystemWhere\n    $update: SystemUpdateInput!\n    $updateItemsWhere: ItemWhere\n    $updateItem: ItemUpdateInput\n    $node: String\n    $nodeUid: String\n    $action: String\n    $itemUid: String\n    $systemOriginatedUid: String\n  ) {\n    updateItems(where: $updateItemsWhere, update: $updateItem) {\n      items {\n        name\n      }\n    }\n    updateSystems(where: $where, update: $update) {\n      systems {\n        ...SystemDetail\n      }\n    }\n    updatedByResolver(node: $node, nodeUid: $nodeUid, action: $action)\n    itemOriginatedResolver(\n      itemUid: $itemUid\n      systemOriginatedUid: $systemOriginatedUid\n    )\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateSystemParentMutation(\n    $where: SystemWhere\n    $update: SystemUpdateInput!\n    $systemFromUid: String\n    $systemUid: String\n  ) {\n    updateSystems(where: $where, update: $update) {\n      systems {\n        ...SystemDetail\n      }\n    }\n    systemMovedFromResolver(\n      systemFromUid: $systemFromUid\n      systemUid: $systemUid\n    )\n  }\n'
): (typeof documents)['\n  mutation UpdateSystemParentMutation(\n    $where: SystemWhere\n    $update: SystemUpdateInput!\n    $systemFromUid: String\n    $systemUid: String\n  ) {\n    updateSystems(where: $where, update: $update) {\n      systems {\n        ...SystemDetail\n      }\n    }\n    systemMovedFromResolver(\n      systemFromUid: $systemFromUid\n      systemUid: $systemUid\n    )\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateSparePartRelation($fromSystemIds: [ID!]!, $toSystemIds: [ID!]!) {\n    createSparePartRelation(fromSystemIds: $fromSystemIds, toSystemIds: $toSystemIds)\n  }\n'
): (typeof documents)['\n  mutation CreateSparePartRelation($fromSystemIds: [ID!]!, $toSystemIds: [ID!]!) {\n    createSparePartRelation(fromSystemIds: $fromSystemIds, toSystemIds: $toSystemIds)\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query SystemsSpareParts($where: SystemWhere) {\n    systems(where: $where) {\n      spareParts {\n        name\n        parentPath {\n          name\n          uid\n        }\n        systemLevel\n        systemType {\n          name\n        }\n        description\n        zone {\n          name\n        }\n        location {\n          name\n          uid\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query SystemsSpareParts($where: SystemWhere) {\n    systems(where: $where) {\n      spareParts {\n        name\n        parentPath {\n          name\n          uid\n        }\n        systemLevel\n        systemType {\n          name\n        }\n        description\n        zone {\n          name\n        }\n        location {\n          name\n          uid\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query SystemSparePartsFor($where: SystemWhere) {\n    systems(where: $where) {\n      sparePartsFor {\n        name\n        parentPath {\n          name\n          uid\n        }\n        systemLevel\n        systemType {\n          name\n        }\n        description\n        zone {\n          name\n        }\n        location {\n          name\n          uid\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query SystemSparePartsFor($where: SystemWhere) {\n    systems(where: $where) {\n      sparePartsFor {\n        name\n        parentPath {\n          name\n          uid\n        }\n        systemLevel\n        systemType {\n          name\n        }\n        description\n        zone {\n          name\n        }\n        location {\n          name\n          uid\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment SystemFields on System {\n    uid\n    name\n    systemCode\n    sp_coverage\n    sparePartsCoverageSum\n    minimalSpareParstCount\n    responsibleTeam {\n      uid\n      name\n    }\n    systemLevel\n    description\n    subSystems {\n      uid\n      name\n      location {\n        uid\n        name\n      }\n      systemLevel\n      parentPath {\n        uid\n        name\n        systemLevel\n      }\n      physicalItem {\n        uid\n        eun\n        name\n        serialNumber\n        itemUsage {\n          uid\n          name\n        }\n      }\n    }\n    keySystem {\n      uid\n      name\n    }\n    parentPath {\n      uid\n      name\n      systemLevel\n    }\n    location {\n      uid\n      name\n      code\n    }\n    maintainedBy {\n      fullName\n      uid\n    }\n    operators {\n      uid\n      fullName\n    }\n    parentSystem {\n      uid\n      name\n    }\n    responsible {\n      uid\n      fullName\n    }\n    systemType {\n      uid\n      name\n    }\n    zone {\n      uid\n      name\n    }\n  }\n'
): (typeof documents)['\n  fragment SystemFields on System {\n    uid\n    name\n    systemCode\n    sp_coverage\n    sparePartsCoverageSum\n    minimalSpareParstCount\n    responsibleTeam {\n      uid\n      name\n    }\n    systemLevel\n    description\n    subSystems {\n      uid\n      name\n      location {\n        uid\n        name\n      }\n      systemLevel\n      parentPath {\n        uid\n        name\n        systemLevel\n      }\n      physicalItem {\n        uid\n        eun\n        name\n        serialNumber\n        itemUsage {\n          uid\n          name\n        }\n      }\n    }\n    keySystem {\n      uid\n      name\n    }\n    parentPath {\n      uid\n      name\n      systemLevel\n    }\n    location {\n      uid\n      name\n      code\n    }\n    maintainedBy {\n      fullName\n      uid\n    }\n    operators {\n      uid\n      fullName\n    }\n    parentSystem {\n      uid\n      name\n    }\n    responsible {\n      uid\n      fullName\n    }\n    systemType {\n      uid\n      name\n    }\n    zone {\n      uid\n      name\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment CatalogueItem on CatalogueItem {\n    uid\n    name\n    catalogueNumber\n    description\n    catalogueCategory {\n      uid\n      name\n    }\n    supplier {\n      uid\n      name\n    }\n    propertiesConnection {\n      edges {\n        value\n        node {\n          uid\n          name\n          groups {\n            uid\n            name\n          }\n          type {\n            name\n            uid\n          }\n          unit {\n            name\n            uid\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment CatalogueItem on CatalogueItem {\n    uid\n    name\n    catalogueNumber\n    description\n    catalogueCategory {\n      uid\n      name\n    }\n    supplier {\n      uid\n      name\n    }\n    propertiesConnection {\n      edges {\n        value\n        node {\n          uid\n          name\n          groups {\n            uid\n            name\n          }\n          type {\n            name\n            uid\n          }\n          unit {\n            name\n            uid\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment ServiceItem on ServiceItem {\n    uid\n    name\n    isDelivered\n    order {\n      uid\n      name\n      orderDate\n    }\n    detailsConnection {\n      edges {\n        value\n        node {\n          uid\n          name\n          groups {\n            uid\n            name\n          }\n          type {\n            name\n            uid\n          }\n          unit {\n            name\n            uid\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment ServiceItem on ServiceItem {\n    uid\n    name\n    isDelivered\n    order {\n      uid\n      name\n      orderDate\n    }\n    detailsConnection {\n      edges {\n        value\n        node {\n          uid\n          name\n          groups {\n            uid\n            name\n          }\n          type {\n            name\n            uid\n          }\n          unit {\n            name\n            uid\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment PhysicalItem on Item {\n    uid\n    eun\n    name\n    notes\n    serialNumber\n    conditionStatus {\n      uid\n      name\n    }\n    orderConnection {\n      edges {\n        isDelivered\n        node {\n          uid\n          orderDate\n          name\n        }\n      }\n    }\n    order {\n      uid\n      orderDate\n      name\n    }\n    itemUsage {\n      uid\n      name\n    }\n    serviceItemsConnection {\n      edges {\n        created\n        node {\n          uid\n    name\n    isDelivered\n    order {\n      uid\n      name\n      orderDate\n    }\n    detailsConnection {\n      edges {\n        value\n        node {\n          uid\n          name\n          groups {\n            uid\n            name\n          }\n          type {\n            name\n            uid\n          }\n          unit {\n            name\n            uid\n          }\n        }\n      }\n    }\n        }\n      }\n    }\n    catalogueItem {\n      ...CatalogueItem\n    }\n  }\n'
): (typeof documents)['\n  fragment PhysicalItem on Item {\n    uid\n    eun\n    name\n    notes\n    serialNumber\n    conditionStatus {\n      uid\n      name\n    }\n    orderConnection {\n      edges {\n        isDelivered\n        node {\n          uid\n          orderDate\n          name\n        }\n      }\n    }\n    order {\n      uid\n      orderDate\n      name\n    }\n    itemUsage {\n      uid\n      name\n    }\n    serviceItemsConnection {\n      edges {\n        created\n        node {\n          uid\n    name\n    isDelivered\n    order {\n      uid\n      name\n      orderDate\n    }\n    detailsConnection {\n      edges {\n        value\n        node {\n          uid\n          name\n          groups {\n            uid\n            name\n          }\n          type {\n            name\n            uid\n          }\n          unit {\n            name\n            uid\n          }\n        }\n      }\n    }\n        }\n      }\n    }\n    catalogueItem {\n      ...CatalogueItem\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment SystemDetail on System {\n    uid\n    name\n    systemCode\n    sp_coverage\n    sparePartsCoverageSum\n    minimalSpareParstCount\n    responsibleTeam {\n      uid\n      name\n    }\n    systemLevel\n    attribute {\n      uid\n      name\n    }\n    description\n    subSystems {\n      uid\n      name\n      deleted\n      sp_coverage\n      minimalSpareParstCount\n      location {\n        uid\n        name\n      }\n      systemLevel\n      parentPath {\n        uid\n        name\n        systemLevel\n      }\n      physicalItem {\n        uid\n        eun\n        name\n        serialNumber\n        itemUsage {\n          uid\n          name\n        }\n      }\n    }\n    keySystem {\n      uid\n      name\n    }\n    parentPath {\n      uid\n      name\n      systemLevel\n    }\n    location {\n      uid\n      name\n      code\n    }\n    maintainedBy {\n      fullName\n      uid\n    }\n    operators {\n      uid\n      fullName\n    }\n    parentSystem {\n      uid\n      name\n    }\n    responsible {\n      uid\n      fullName\n    }\n    systemType {\n      uid\n      name\n    }\n    zone {\n      uid\n      name\n    }\n    physicalItem {\n      ...PhysicalItem\n    }\n    sparePartsConnection {\n      edges {\n        coverage\n        node {\n          name\n          uid\n          parentPath {\n            name\n            uid\n          }\n          location {\n            name\n            code\n          }\n          physicalItem {\n            ...PhysicalItem\n          }\n        }\n      }\n    }\n    sparePartsFor {\n      ...SystemFields\n      physicalItem {\n        ...PhysicalItem\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment SystemDetail on System {\n    uid\n    name\n    systemCode\n    sp_coverage\n    sparePartsCoverageSum\n    minimalSpareParstCount\n    responsibleTeam {\n      uid\n      name\n    }\n    systemLevel\n    attribute {\n      uid\n      name\n    }\n    description\n    subSystems {\n      uid\n      name\n      deleted\n      sp_coverage\n      minimalSpareParstCount\n      location {\n        uid\n        name\n      }\n      systemLevel\n      parentPath {\n        uid\n        name\n        systemLevel\n      }\n      physicalItem {\n        uid\n        eun\n        name\n        serialNumber\n        itemUsage {\n          uid\n          name\n        }\n      }\n    }\n    keySystem {\n      uid\n      name\n    }\n    parentPath {\n      uid\n      name\n      systemLevel\n    }\n    location {\n      uid\n      name\n      code\n    }\n    maintainedBy {\n      fullName\n      uid\n    }\n    operators {\n      uid\n      fullName\n    }\n    parentSystem {\n      uid\n      name\n    }\n    responsible {\n      uid\n      fullName\n    }\n    systemType {\n      uid\n      name\n    }\n    zone {\n      uid\n      name\n    }\n    physicalItem {\n      ...PhysicalItem\n    }\n    sparePartsConnection {\n      edges {\n        coverage\n        node {\n          name\n          uid\n          parentPath {\n            name\n            uid\n          }\n          location {\n            name\n            code\n          }\n          physicalItem {\n            ...PhysicalItem\n          }\n        }\n      }\n    }\n    sparePartsFor {\n      ...SystemFields\n      physicalItem {\n        ...PhysicalItem\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  fragment User on User {\n    uid\n    email\n    firstName\n    isEnabled\n    lastName\n    passwordToChange\n    employee {\n      uid\n      fullName\n    }\n    roles {\n      name\n      code\n      uid\n    }\n    username\n    uid\n    facility {\n      name\n      code\n    }\n  }\n'
): (typeof documents)['\n  fragment User on User {\n    uid\n    email\n    firstName\n    isEnabled\n    lastName\n    passwordToChange\n    employee {\n      uid\n      fullName\n    }\n    roles {\n      name\n      code\n      uid\n    }\n    username\n    uid\n    facility {\n      name\n      code\n    }\n  }\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
