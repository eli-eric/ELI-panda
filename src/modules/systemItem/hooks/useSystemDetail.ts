import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import { ROLE } from '@/types/constants/roles'

import type { SystemDetailFormType } from '../types/form'

const useSystemDetail = () => {
  const router = useRouter()
  const uid = router.query.uid as string
  const { system: systemEndpoint } = useEndpoint({ uid })

  const { response, loading, error, mutate } = useFetch<SystemDetailFormType>({
    url: uid && systemEndpoint,
    config: {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true
    },
    useMockFetcher: true
  })
  const { data: session } = useSession()
  const disabledEdit = !session?.user.roles.includes(ROLE.SYSTEM_EDIT)

  return {
    systemDetail: response,
    loading: loading,
    error,
    mutate,
    disabledEdit,
    uid,
    systemEndpoint
  }
}

export default useSystemDetail
