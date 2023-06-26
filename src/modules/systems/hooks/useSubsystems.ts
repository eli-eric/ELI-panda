import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import type { SystemDetail } from '../types/responses'
import { makeSubsystems } from '../utils'
import { useSystems } from './useSystems'

export const useSubsystems = () => {
  const [uid, setUid] = useState<string | null>(null)
  const { mutate } = useSystems()

  const { systemSubsystems } = useEndpoint({ uid: uid || '' })

  const { loading: pending } = useFetch<SystemDetail[]>({
    url: uid ? systemSubsystems : null,
    useMockFetcher: true,
    config: {
      suspense: false,
      onSuccess: subsystems => mutate(prev => prev && makeSubsystems(uid, prev, subsystems), { revalidate: false }),
      onError: () => toast.error('Error fetching subsystems')
    }
  })
  return { setUid, pending }
}
