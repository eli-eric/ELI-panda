import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

import type { ROLE } from '@/types/constants/roles'

export const usePermission = (roles?: ROLE[]) => {
  const { data } = useSession()

  return useMemo(
    () => data?.user?.roles?.some(role => roles?.includes(role)),
    [data, roles]
  )
}

export default usePermission
