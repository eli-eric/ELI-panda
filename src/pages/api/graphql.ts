import { neoSchema } from '@/server/apollo/schema'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession, NextAuthOptions } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { authOptions } from './auth/[...nextauth]'

const server = async (): Promise<ApolloServer> => {
  const schema = await neoSchema.getSchema()

  const apolloConfig = {
    schema
  }
  return new ApolloServer(apolloConfig)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions as NextAuthOptions)
  /* if (!session?.user) {
    res.status(403).send('Authentication required.')
    return
  } */
  return startServerAndCreateNextHandler(await server(), {
    context: async (req, res) => {
      const token = await getToken({ req })
      return { req, res, token: token?.apiAccessToken }
    }
  })(req, res)
}
