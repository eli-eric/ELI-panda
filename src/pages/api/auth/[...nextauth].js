import axios from 'axios'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import AzureADProvider from 'next-auth/providers/azure-ad'
import getDriver from '@/utils/neo4j'

var jwt = require('jsonwebtoken')

export const authOptions = {
  session: {
    jwt: true
  },
  providers: [
    AzureADProvider({
      id: 'azure-ad',
      clientId: process.env.AZURE_AD_BEAMLINES_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_BEAMLINES_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_BEAMLINES_TENANT_ID
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const result = await axios({
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'post',
          url: process.env.PANDA_API_GW_URL + '/authenticate',
          data: {
            username: credentials?.username,
            password: credentials?.password
          }
        }).catch(error => {
          //catching erros
          console.log(error)
          if (error.response) {
            if (error.request.res.statusCode === 401) {
              throw new Error('Wrong password or user name')
            } else {
              throw new Error(error.response.data)
            }
          }
        })
        return result.data
      }
    })
  ],
  pages: {
    signIn: '/',
    error: '/'
  },
  callbacks: {
    async jwt(params) {
      // update token

      const providerId = params?.account?.provider

      if (providerId === 'azure-ad') {
        // todo
      }

      // const token = jwt.sign(
      //   {
      //     sub: 'mojeid',
      //     jti: 'jiri.svacha@eli-beams.eu',
      //     exp: Date.now() + 1000 * 60 * 60 * 24 * 365,
      //     facilityName: 'ELI - Beamlines',
      //     facilityCode: 'B',
      //     roles: ['basics', 'systems-view', 'catalogue-view']
      //   },
      //   process.env.NEXTAUTH_SECRET
      // )

      // const neo4jDriver = getDriver()

      // neo4jDriver
      //   .session()
      //   .run('MATCH (n:User) RETURN { email: n.email, name: n.firstName + " " + n.lastName} as user LIMIT 5')
      //   .then(result => {
      //     result.records.forEach(record => {
      //       const node = record.get('user')
      //       console.log(node.email)
      //     })
      //   })

      if (params.user?.roles) {
        params.token.roles = params.user.roles
        params.token.apiAccessToken = params.user.accessToken
        params.token.facility = params.user.facility
        params.token.facilityCode = params.user.facilityCode
        params.token.uid = params.user.uid
        params.token.fullName = params.user.firstName + ' ' + params.user.lastName
      }
      // return final_token
      return params.token
    },
    async session(params) {
      params.session.user.roles = params.token.roles
      params.session.user.apiAccessToken = params.token.apiAccessToken
      params.session.user.facilityCode = params.token.facilityCode
      params.session.user.facility = params.token.facility
      params.session.user.uid = params.token.uid
      params.session.user.fullName = params.token.fullName

      return params.session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
}

export default NextAuth(authOptions)
