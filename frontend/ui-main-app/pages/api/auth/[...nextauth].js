import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

//const PANDA_API_GW_URL = 'http://localhost:50000/v1/'

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const result = await fetch(process.env.PANDA_API_GW_URL + 'authenticate', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ username: credentials?.username, password: credentials?.password })
        })

        if (result.ok) {
          let user = result.json()
          console.log(user)
          return user
        } else {
          console.log('failed to log in')
          throw new Error('Wrong password or user name')
        }
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.roles) {
        params.token.roles = params.user.roles
        params.token.apiAccessToken = params.user.accessToken
        params.token.facility = params.user.facility
        params.token.fullName = params.user.fullName
      }
      // return final_token
      return params.token
    },
    session(params) {
      params.session.user.roles = params.token.roles
      params.session.user.apiAccessToken = params.token.apiAccessToken
      params.session.user.facility = params.token.facility
      params.session.user.fullName = params.token.fullName

      return params.session
    }
  }
})
