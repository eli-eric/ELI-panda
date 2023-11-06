import 'next-auth'

import type { Role } from '@/types/constants/roles'

declare module 'next-auth' {
  interface User {
    uid: string
    username: string
    email: string
    fullName: string
    facility: string
    facilityCode: string
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
    facilityCode: string
    roles: Array<Role>
    apiAccessToken: string
  }
}
