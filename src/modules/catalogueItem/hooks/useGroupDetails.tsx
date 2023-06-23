import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import type { CatalogueItemDetail } from '../types/responses'

const useGroupDetails = (uid?: string) => {
  const router = useRouter()
  const itemUid = router.query.uid as string | undefined
  const { catalogueCategoryProperties } = useEndpoint(itemUid ? { uid, query: { itemUid } } : { uid })

  const { response } = useFetch<CatalogueItemDetail[]>({
    url: uid && catalogueCategoryProperties,
    onError: () => {
      toast.error('Failed to load group details')
    },
    useMockFetcher: false
  })

  const groups = useMemo(() => {
    const groupsUnsorted = response
      ?.map(item => item.propertyGroup)
      .filter((value, index, self) => self.indexOf(value) === index)
    // order groups by name
    const groups = groupsUnsorted?.sort((a, b) => a.localeCompare(b))
    return groups
  }, [response])

  return { groupDetails: response, groups }
}

export default useGroupDetails
