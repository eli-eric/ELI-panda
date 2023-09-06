import { gql } from '@apollo/client'

export default gql`
  type CatalogueCategory {
    uid: String
    name: String
    code: String
    subCategories: [CatalogueCategory!]! @relationship(type: "HAS_SUBCATEGORY", direction: OUT)
    parentCategory: CatalogueCategory! @relationship(type: "HAS_SUBCATEGORY", direction: IN)
  }
`
