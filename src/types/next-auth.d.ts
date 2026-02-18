import 'next-auth'

import type { ROLE } from '@/types/constants/roles'

declare module 'next-auth' {
    interface User {
        uid: string
        username: string
        name?: string
        email: string
        image?: string | null
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
        name: string
        email: string
        username: string
        image: string | null
        fullName: string
        facility: string
        facilityCode: string
        roles: Array<ROLE>
        apiAccessToken: string
    }
}
