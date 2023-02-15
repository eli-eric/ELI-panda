import 'next-auth'

import { Role } from '@/types/constants/roles'

declare module 'next-auth' {
  interface User {
    uid: string
    username: string
    email: string
    fullName: string
    facility: string
    roles: Array<Role>
    apiAccessToken: string
  }
  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid: string
    username: string
    email: string
    fullName: string
    facility: string
    roles: Array<Role>
    apiAccessToken: string
  }
}
