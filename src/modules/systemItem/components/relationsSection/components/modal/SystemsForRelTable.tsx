import { useRouter } from 'next/router'
import { type Dispatch, type SetStateAction, useEffect, useMemo } from 'react'
import useSWR from 'swr'

import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import usePagination from '@/hooks/table/usePagination-deprecated'
import type { RELATION_TYPE_CODE } from '@/modules/systems-deprecated/types/constants'
import type { SystemsForRelResponse } from '@/modules/systems-deprecated/types/responses'

import type { SelectedSystemForRel } from './SelectRelation'

interface Props {
  searchValue?: string
  relationTypeCode?: RELATION_TYPE_CODE
  setSelectedSystem: Dispatch<SetStateAction<SelectedSystemForRel | undefined>>
  selectedSystem?: SelectedSystemForRel
}

const SystemsForRel = ({ searchValue, relationTypeCode, setSelectedSystem, selectedSystem }: Props) => {
  const router = useRouter()

  const { pagination, setTotalCount, getPaginationComponent, page } = usePagination({
    dependecies: [searchValue]
  })
  const query = useMemo(
    () => ({
      systemFromUid: router.query.uid,
      relationTypeCode,
      search: searchValue,
      pagination
    }),
    [router, relationTypeCode, searchValue, pagination]
  )
  const endpoints = useEndpoint({ query })
  const { data: systems } = useSWR<SystemsForRelResponse>(
    searchValue && endpoints.systemsForRelationship,
    mockFetcher,
    { suspense: false }
  )

  //TODO refactor with useGeneralTable

  useEffect(() => {
    setSelectedSystem(undefined)
  }, [page, setSelectedSystem])

  useEffect(() => {
    setTotalCount(systems?.totalCount)
  }, [systems, setTotalCount])

  return (
    <div className="flex flex-col min-h-[337px] justify-between">
      {/* TODO SEARCH TABLE */}
      {getPaginationComponent()}
    </div>
  )
}

export default SystemsForRel
