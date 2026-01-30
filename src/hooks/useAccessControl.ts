import { useSession } from 'next-auth/react'
import { useCallback } from 'react'

import type { ROLE } from '@/types/constants/roles'

export const useAccessControl = (roles?: ROLE | ROLE[]) => {
    const { data } = useSession()

    return useCallback(() => {
        if (!data?.user?.roles) return false

        const roleArray = Array.isArray(roles) ? roles : [roles]
        return data.user.roles.some(role => roleArray.includes(role))
    }, [data, roles])
}
