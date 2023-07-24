import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import type { SystemDetail } from '@/modules/systems/types/responses'
import { makeSubsystems } from '@/modules/systems/utils'

import { useSystemsForRel } from './useSystemsForRel'

export const useSubsystemsForRel = () => {
  const [uid, setUid] = useState<string | null>(null)
  const { mutate } = useSystemsForRel()

  const { systemSubsystemsForRelationship } = useEndpoint({ uid: uid || '' })

  const { loading: pending } = useFetch<SystemDetail[]>({
    url: uid ? systemSubsystemsForRelationship : null,
    useMockFetcher: false,
    config: {
      suspense: false,
      onSuccess: subsystems =>
        mutate(
          prev => {
            const up = prev && makeSubsystems(uid, prev, subsystems)
            return up
          },
          { revalidate: false }
        ),
      onError: () => toast.error('Error fetching subsystems')
    }
  })
  return { setUid, pending }
}
