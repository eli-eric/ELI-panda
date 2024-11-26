import 'next-auth'

import type { ROLE } from '@/types/constants/roles'

declare module 'next-auth' {
  interface User {
    uid: string
    username: string
    email: string
    fullName: string
    facility: string
    facilityCode: string
    roles: Array<ROLE>
    apiAccessToken: string
  }
  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string
    jti: string
    exp: number
    facility: string
    facilityCode: string
    roles: Array<ROLE>
    apiAccessToken: string
  }
}
