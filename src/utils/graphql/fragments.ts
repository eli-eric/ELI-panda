import { gql } from '@apollo/client'

export const SYSTEM_FIELDS = gql`
  fragment SystemFields on System {
    uid
    name
    systemCode
    systemAlias
    minimalSpareParstCount
    isCritical
    responsibleTeam {
      uid
      name
    }
    systemLevel
    description
    subSystems {
      uid
      name
      location {
        uid
        name
      }
      systemLevel
      systemAlias
      parentPath {
        uid
        name
        systemLevel
      }
      physicalItem {
        uid
        eun
        name
        serialNumber
        itemUsage {
          uid
          name
        }
      }
    }
    keySystem {
      uid
      name
    }
    parentPath {
      uid
      name
      systemLevel
    }
    location {
      uid
      name
      code
    }
    maintainedBy {
      fullName
      uid
    }
    operators {
      uid
      fullName
    }
    parentSystem {
      uid
      name
    }
    responsible {
      uid
      fullName
    }
    systemType {
      uid
      name
    }
    zone {
      uid
      name
    }
  }
`

export const CATALOGUE_ITEM = gql`
  fragment CatalogueItemFields on CatalogueItem {
    uid
    name
    catalogueNumber
    description
    catalogueCategory {
      uid
      name
    }
    supplier {
      uid
      name
    }
    propertiesConnection {
      edges {
        value
        node {
          name
          unit {
            name
            uid
          }
        }
      }
    }
  }
`

export const PHYSICAL_ITEM = gql`
  ${CATALOGUE_ITEM}
  fragment PhysicalItemFields on Item {
    uid
    eun
    name
    notes
    serialNumber
    conditionStatus {
      uid
      name
    }
    order {
      uid
      name
    }
    itemUsage {
      uid
      name
    }
    catalogueItem {
      ...CatalogueItemFields
    }
  }
`

export const SYSTEM_DETAIL = gql`
  ${SYSTEM_FIELDS}
  ${PHYSICAL_ITEM}
  fragment SystemDetail on System {
    ...SystemFields
    physicalItem {
      ...PhysicalItemFields
    }
    spareParts {
      ...SystemFields
      physicalItem {
        ...PhysicalItemFields
      }
    }
    sparePartsFor {
      ...SystemFields
      physicalItem {
        ...PhysicalItemFields
      }
    }
  }
`

export const USER = gql`
  fragment UserFields on User {
    uid
    email
    firstName
    isEnabled
    lastName
    passwordToChange
    employee {
      uid
      fullName
    }
    roles {
      name
      code
      uid
    }
    username
    uid
    facility {
      name
      code
    }
  }
`
