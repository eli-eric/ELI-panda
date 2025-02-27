import { gql } from '@/types/gql'

export const SystemFieldsFragment = gql(`
  fragment SystemFields on System {
    uid
    name
    systemCode
    sp_coverage
    sparePartsCoverageSum
    minimalSpareParstCount
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
`)

export const CatalogueItemFragment = gql(`
  fragment CatalogueItem on CatalogueItem {
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
          uid
          name
          type {
            name
            uid
          }
          unit {
            name
            uid
          }
        }
      }
    }
  }
`)

export const PhysicalItemFragment = gql(`
  fragment PhysicalItem on Item {
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
      ...CatalogueItem
    }
  }
`)

export const SystemDetailFragment = gql(`
  fragment SystemDetail on System {
    uid
    name
    systemCode
    sp_coverage
    sparePartsCoverageSum
    minimalSpareParstCount
    responsibleTeam {
      uid
      name
    }
    systemLevel
    attribute {
      uid
      name
    }
    description
    subSystems {
      uid
      name
      sp_coverage
      minimalSpareParstCount
      location {
        uid
        name
      }
      systemLevel
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
    physicalItem {
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
      ...CatalogueItem
    }
    }
    sparePartsConnection {
      edges {
        coverage
        node {
          name
          uid
          parentPath {
            name
            uid
          }
          location {
            name
            code
          }
          physicalItem {
            ...PhysicalItem
          }
        }
      }
    }
    sparePartsFor {
      ...SystemFields
      physicalItem {
        ...PhysicalItem
      }
    }

  }
`)

export const UserFragment = gql(`
  fragment User on User {
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
`)
