import { useMemo } from 'react'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import type { CatalogueItemDetail } from '../types/responses'

const useGroupDetails = (uid?: string) => {
  const { catalogueCategoryProperties } = useEndpoint({ uid })

  const { response } = useFetch<CatalogueItemDetail[]>({
    url: uid && catalogueCategoryProperties,
    onError: () => {
      toast.error('Failed to load group details')
    },
    useMockFetcher: false
  })

  const groups = useMemo(
    () => response?.map(item => item.propertyGroup).filter((value, index, self) => self.indexOf(value) === index),
    [response]
  )

  return { groupDetails: response, groups }
}

export default useGroupDetails
