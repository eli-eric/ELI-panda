import { neoSchema } from '@/server/apollo/schema'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'

import { authOptions } from './auth/[...nextauth]'

const server = async (): Promise<ApolloServer> => {
  const schema = await neoSchema.getSchema()

  const apolloConfig = {
    schema,
    plugins: [
      // Install a landing page plugin based on NODE_ENV
      process.env.PANDA_ENV === 'production' || process.env.PANDA_ENV === 'test'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageLocalDefault({ footer: false })
    ]
  }
  return new ApolloServer(apolloConfig)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions as NextAuthOptions)

  if (!session?.user && (process.env.PANDA_ENV !== 'localhost' ?? process.env.PANDA_ENV !== 'dev')) {
    res.status(403).send('Authentication required.')
    return
  }

  return startServerAndCreateNextHandler(await server(), {
    context: async (req, res) => {
      const token = await getToken({ req })
      return { req, res, token: token?.apiAccessToken }
    }
  })(req, res)
}
