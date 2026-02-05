import type { FC, PropsWithChildren } from 'react'

import { useAccessControl } from '@/hooks/useAccessControl'
import type { ROLE } from '@/types/constants/roles'

interface AccessControlProps {
    roles?: ROLE[] | ROLE
}

export const AccessControl: FC<PropsWithChildren<AccessControlProps>> = ({ roles, children }) => {
    const canAccess = useAccessControl(roles)()
    if (!roles) return null
    return canAccess ? <>{children}</> : null
}
