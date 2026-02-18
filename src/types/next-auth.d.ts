import 'next-auth'

import type { ROLE } from '@/types/constants/roles'

declare module 'next-auth' {
    interface User {
        uid: string
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
        uid: string
        jti: string
        exp: number
        iat: number
        email: string
        fullName: string
        facility: string
        facilityCode: string
        roles: Array<ROLE>
        apiAccessToken: string
    }
}
