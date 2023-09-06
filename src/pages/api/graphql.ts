import { neoSchema } from '@/server/apollo/schema'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'

const server = async (): Promise<ApolloServer> => {
  const schema = await neoSchema.getSchema()
  return new ApolloServer({ schema })
}

export default startServerAndCreateNextHandler(await server())
