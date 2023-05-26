import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

const usePermission = (roles?: string[]) => {
  const { data } = useSession()
  return useMemo(() => data?.user?.roles?.some(role => roles?.includes(role)), [data, roles])
}

export default usePermission
