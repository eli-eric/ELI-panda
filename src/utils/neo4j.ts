import type { Driver } from 'neo4j-driver'
import neo4j from 'neo4j-driver'

let driver: Driver

const defaultOptions = {
  uri: process.env.NEO4J_URI || 'bolt://217.198.121.181:7682',
  username: process.env.NEO4J_USER || 'neo4j',
  password: process.env.NEO4J_PASSWORD || 'Pohoda.Jazz.Neo4j!65'
}

export default function getDriver() {
  const { uri, username, password } = defaultOptions
  if (!driver) {
    driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
  }

  return driver
}
