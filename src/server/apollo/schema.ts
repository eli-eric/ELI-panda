import { Neo4jGraphQL } from '@neo4j/graphql'

import getDriver from '@/utils/neo4j'

import resolvers from './resolvers'
import { readFileSync } from 'fs'

const driver = getDriver()

const typeDefs = readFileSync('src/server/apollo/schema.graphql', 'utf8')

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
