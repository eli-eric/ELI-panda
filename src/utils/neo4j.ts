import type { Driver } from 'neo4j-driver'
import neo4j from 'neo4j-driver'

let driver: Driver

const defaultOptions = {
  uri: process.env.NEO4J_URI ?? '',
  username: process.env.NEO4J_USER ?? '',
  password: process.env.NEO4J_PASSWORD ?? ''
}

export default function getDriver() {
  const { uri, username, password } = defaultOptions

  if (!uri || !username || !password) {
    throw new Error(`Neo4j connection details are missing or incorrect.`)
  }

  try {
    if (!driver) {
      driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating Neo4j driver.', error)
    throw error // re-throw the error so that calling code knows something went wrong
  }

  return driver
}
