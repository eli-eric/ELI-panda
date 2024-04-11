import { Neo4jGraphQL } from '@neo4j/graphql'

import getDriver from '@/utils/neo4j'

import { typeDefs } from './typeDefs'
import resolvers from './resolvers'

const driver = getDriver()
export const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  resolvers,
  features: {
    authorization: {
      key: process.env.NEXTAUTH_SECRET ?? ''
    }
  }
})
