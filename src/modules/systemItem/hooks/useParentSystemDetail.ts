import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import type { SystemDetailFormType } from '../types/form'

export const useParentSystemDetail = () => {
  const router = useRouter()
  const parentUid = router.query.parentUid as string | undefined
  const { system: systemEndpoint } = useEndpoint({ uid: parentUid })

  const { response, loading, error, mutate } = useFetch<SystemDetailFormType>({
    url: parentUid && systemEndpoint,
    config: {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true
    },
    useMockFetcher: false
  })

  const parentPath = useMemo(
    () =>
      response
        ? response?.parentPath
          ? [...response.parentPath, { uid: response?.uid, name: response?.name }]
          : [{ uid: response?.uid, name: response?.name }]
        : undefined,
    [response]
  )

  return {
    parentSystemDetail: response,
    loading: loading,
    error,
    mutate,
    parentPath,
    parentUid
  }
}
