import { Neo4jGraphQL } from '@neo4j/graphql'
import { readFileSync } from 'fs'
import path from 'path'

import getDriver from '@/utils/neo4j'

import resolvers from './resolvers'

const driver = getDriver()

const schemaPath = path.resolve(
  process.cwd(),
  'src/server/apollo/schema.graphql'
)
const typeDefs = readFileSync(schemaPath, 'utf8')

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
