import axios from 'axios'
import BaseURL from 'core/types/constants/common'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const result = await axios({
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'post',
          url: BaseURL + '/authenticate',
          data: { username: credentials?.username, password: credentials?.password }
        }).catch(error => {
          console.log(error)
          //catching erros
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
    signIn: '/'
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.roles) {
        params.token.roles = params.user.roles
        params.token.apiAccessToken = params.user.accessToken
        params.token.facility = params.user.facility
        params.token.fullName = params.user.firstName + ' ' + params.user.lastName
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
