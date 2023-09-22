import { Neo4jGraphQL } from '@neo4j/graphql'

import getDriver from '@/utils/neo4j'

import { typeDefs } from './typeDefs'

const driver = getDriver()

export const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  features: {
    authorization: {
      key: process.env.NEXTAUTH_SECRET!
    }
  }
})
