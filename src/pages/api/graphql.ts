import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'

import { neoSchema } from '@/server/apollo/schema'

import { authOptions } from './auth/[...nextauth]'

const server = async (): Promise<ApolloServer> => {
  const schema = await neoSchema.getSchema()
  await neoSchema.assertIndexesAndConstraints({ options: { create: true } })

  const apolloConfig = {
    schema
  }
  return new ApolloServer(apolloConfig)
}

function logger(session, req, res, next) {
  const uid = crypto.randomUUID()
  const oldEnd = res.end
  console.log(
    new Date().toISOString(),
    uid,
    'user: ' + session?.user.fullName + ', userUid: ' + session?.user.uid,
    req.body
  )
  res.end = function (chunk, ...rest) {
    if (chunk)
      console.log(
        new Date().toISOString(),
        uid,
        'user: ' + session?.user.fullName + ', userUid: ' + session?.user.uid,
        chunk?.toString()
      )
    oldEnd.apply(res, [chunk, ...rest])
  }

  next()
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  )
  if (process.env.PANDA_ENV !== 'localhost') {
    logger(session, req, res, () => {})
  }

  if (!session?.user && process.env.PANDA_ENV !== 'localhost') {
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
