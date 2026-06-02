import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import { setAuthToken } from '@/core/http/fetchClient'

/**
 * Keeps the fetchClient auth-token cache in lockstep with the NextAuth session
 * so requests no longer call getSession() (a /api/auth/session round-trip) on
 * every call. Covers login, logout, and silent user-switch. Renders nothing.
 */
export const SessionSync = () => {
    const { data, status } = useSession()

    useEffect(() => {
        // Cache the resolved state for both authenticated and logged-out sessions
        // (null), so neither path re-calls getSession() per request. Invalidation
        // on a 401 is handled inside fetchClient.
        if (status === 'authenticated') {
            setAuthToken(data?.user?.apiAccessToken ?? null)
        } else if (status === 'unauthenticated') {
            setAuthToken(null)
        }
    }, [status, data?.user?.apiAccessToken])

    return null
}
