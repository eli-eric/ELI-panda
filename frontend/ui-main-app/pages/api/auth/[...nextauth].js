import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log(credentials)
        const user = {
          uid: '71864520-9e86-427c-901c-0c220f951775',
          username: 'admin',
          email: 'albert.einstein@eli-laser.eu',
          facility: 'ELI ERIC'
        }

        if (credentials?.username !== 'admin' && credentials?.password !== 'elipanda2022') {
          console.log('failed to log in')
          throw new Error('Wrong password or user name')
        }
        return { user: user.username }
      }
    })
  ]
})
