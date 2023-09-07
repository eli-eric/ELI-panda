import { neoSchema } from '@/server/apollo/schema'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'

const server = async (): Promise<ApolloServer> => {
  const schema = await neoSchema.getSchema()

  const apolloConfig = {
    schema,
    context: async ({ req }) => {
      const session = await getSession({ req })
      return { session }
    }
  }

  return new ApolloServer(apolloConfig)
}

export default async (req, res) => {
  const user = await getToken({ req })

  if (!user) {
    res.status(403).send('Authentication required.')
    return
  }

  return startServerAndCreateNextHandler(await server())(req, res)
}
