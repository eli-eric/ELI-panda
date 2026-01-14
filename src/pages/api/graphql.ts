import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'

import { isFeatureEnabled } from '@/config/featureFlags'
import { isLocalEnvironment } from '@/lib/environment/utils'
import { neoSchema } from '@/server/apollo/schema'
import { createGraphqlLogger } from '@/server/logger'

import { authOptions } from './auth/[...nextauth]'

const server = async (): Promise<ApolloServer> => {
  const schema = await neoSchema.getSchema()
  await neoSchema.assertIndexesAndConstraints({ options: { create: true } })

  return new ApolloServer({
    schema
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  )
  if (isFeatureEnabled('enableGraphqlLogging')) {
    createGraphqlLogger(session, req, res)
  }

  if (!session?.user && !isLocalEnvironment()) {
    res.status(403).json('Authentication required.')
    return
  }
  const appoloServer = await server()

  return startServerAndCreateNextHandler(appoloServer, {
    context: async (req, res) => {
      const token = await getToken({ req })
      return { req, res, token: token?.apiAccessToken }
    }
  })(req, res)
}
