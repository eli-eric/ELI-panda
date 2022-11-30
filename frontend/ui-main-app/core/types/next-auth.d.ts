import 'next-auth'

import { ROLES } from 'types/constants/roles'

declare module 'next-auth' {
  interface Session {
    user: {
      uid: string
      username: string
      email: string
      fullName: string
      facility: string
      roles: Array<ROLES>
      apiAccessToken: string
    }
  }
}
