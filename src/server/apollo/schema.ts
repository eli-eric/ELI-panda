import { gql } from '@apollo/client'
import { Neo4jGraphQL } from '@neo4j/graphql'
import { readFileSync } from 'fs'

import getDriver from '@/utils/neo4j'

const driver = getDriver()

const typeDefs = gql(readFileSync('src/server/apollo/schema.graphql', { encoding: 'utf-8' }))

export const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  features: {
    authorization: {
      key: process.env.NEXTAUTH_SECRET!
    }
  }
})
