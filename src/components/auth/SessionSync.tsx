import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { clearAuthToken, setAuthToken } from '@/core/http/fetchClient'

/**
 * Keeps the fetchClient auth-token cache in lockstep with the NextAuth session
 * so requests no longer call getSession() (a /api/auth/session round-trip) on
 * every call. Covers login, logout, and silent user-switch. Renders nothing.
 */
export const SessionSync = () => {
    const { data, status } = useSession()

    useEffect(() => {
        if (status === 'authenticated') {
            setAuthToken(data?.user?.apiAccessToken ?? null)
        } else if (status === 'unauthenticated') {
            clearAuthToken()
        }
    }, [status, data?.user?.apiAccessToken])

    return null
}
