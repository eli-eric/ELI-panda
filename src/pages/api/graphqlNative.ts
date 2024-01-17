import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import type { NextApiRequest, NextApiResponse } from 'next'

import { neoSchema } from '@/server/apollo/schema'

const server = async (): Promise<ApolloServer> => {
  const schema = await neoSchema.getSchema()
  await neoSchema.assertIndexesAndConstraints({ options: { create: true } })

  const apolloConfig = {
    schema
  }
  return new ApolloServer(apolloConfig)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const appoloServer = await server()

  return startServerAndCreateNextHandler(appoloServer, {
    context: async (req, res) => {
      const token = req.headers.authorization?.split(' ')[1] || ''
      return { req, res, token: token }
    }
  })(req, res)
}
