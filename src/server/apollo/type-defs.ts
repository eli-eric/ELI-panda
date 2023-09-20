import { gql } from '@apollo/client'

export default gql`
  type JWT @jwt {
    roles: [String!]!
  }
  type Query {
    catalogueCategories: [CatalogueCategory]!
  }
  type ParentPathItem {
    uid: String
    name: String
  }

  "Catalogue Category node"
  type CatalogueCategory @authentication(operations: [READ], jwt: { roles_INCLUDES: "catalogue-view" }) {
    uid: String
    name: String
    code: String
    image: String
    subCategories: [CatalogueCategory!]! @relationship(type: "HAS_SUBCATEGORY", direction: OUT)
    parentCategory: CatalogueCategory @relationship(type: "HAS_SUBCATEGORY", direction: IN)
    parentPath: [ParentPathItem!]!
      @cypher(
        statement: """
        OPTIONAL MATCH (parent)-[:HAS_SUBCATEGORY*1..50]->(this)
        WITH this, collect({uid: parent.uid, name: parent.name}) AS parentPaths
        WITH this, CASE WHEN size(parentPaths) = 0 THEN [this] ELSE parentPaths END AS finalPaths
        UNWIND finalPaths AS finalPath
        RETURN {uid: finalPath.uid, name: finalPath.name} as parentPath
        """
        columnName: "parentPath"
      )
  }
`
