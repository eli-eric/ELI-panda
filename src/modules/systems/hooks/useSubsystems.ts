import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import type { SystemDetail } from '../types/responses'
import { makeSubsystems } from '../utils'
import { useSystems } from './useSystems'

export const useSubsystems = tableId => {
  const [uid, setUid] = useState<string | null>(null)
  const { mutate } = useSystems(tableId)

  const { systemSubsystems } = useEndpoint({ uid: uid || '' })

  const { loading: pending, response } = useFetch<SystemDetail[]>({
    url: uid ? systemSubsystems : null,
    config: {
      suspense: false,
      onError: () => toast.error('Error fetching subsystems')
    }
  })

  useEffect(() => {
    if (response) {
      mutate(prev => prev && makeSubsystems(uid, prev, response), { revalidate: false })
      setUid(null)
    }
  }, [response, mutate, uid])

  return { setUid, pending }
}
