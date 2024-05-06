import { useRouter } from 'next/router'
import { useMemo } from 'react'

import type { CatalogueItemDetail } from '../types/responses'
import { useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'
import { makeQuery } from '@/utils/formatters'

const useGroupDetails = (uid?: string) => {
  const router = useRouter()
  const itemUid = router.query.uid as string | undefined
  const { data } = useQuery<CatalogueItemDetail[]>({
    queryKey: [
      'catalogueCategoryProperties',
      itemUid ? { uid, query: makeQuery({ itemUid }) } : { uid }
    ],
    queryFn: queryFetcher('catalogueCategoryProperties')
  })

  const groups = useMemo(() => {
    const groupsUnsorted = data
      ?.map(item => item.propertyGroup)
      .filter((value, index, self) => self.indexOf(value) === index)
    // order groups by name
    const groups = groupsUnsorted?.sort((a, b) => a.localeCompare(b))
    return groups
  }, [data])

  return { groupDetails: data, groups }
}

export default useGroupDetails
