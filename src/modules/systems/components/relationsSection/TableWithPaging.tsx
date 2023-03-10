import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import useSWR from 'swr'

import EmptyResults from '@/components/EmptyResults'
import TableComponent from '@/components/table/Table.comp'
import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import { message } from '@/i18n/src/messages'
import { RELATION_TYPE_CODE } from '@/modules/systems/types/constants'

import { useSystemMapRows } from '../../hooks/relations/useMapRows'
import { SystemsForRelResponse } from '../../types/responses'

const messages = message.systemsPage.relations.addRelationModal

const TableWithPaging = ({
  searchValue,
  relationTypeCode,
  setSelectedSystem,
  selectedSystem
}: {
  searchValue?: string
  relationTypeCode?: RELATION_TYPE_CODE
  setSelectedSystem: Dispatch<
    SetStateAction<
      | {
          name: string
          uid: string
        }
      | undefined
    >
  >
  selectedSystem?: {
    name: string
    uid: string
  }
}) => {
  const router = useRouter()
  const intl = useIntl()

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
    searchValue && endpoints.systemsForRelationship
  )

  const data = useSystemMapRows({
    systems: systems?.data,
    setSelectedSystem,
    selectedSystem
  })

  useEffect(() => {
    setSelectedSystem(undefined)
  }, [page, setSelectedSystem])

  useEffect(() => {
    setTotalCount(systems?.totalCount)
  }, [systems, setTotalCount])

  const collumsTitle = Object.keys(messages.tableHeader).map(key =>
    intl.formatMessage({ id: messages.tableHeader[key] })
  )

  return (
    <div className="flex flex-col min-h-[535px] justify-between">
      <TableComponent collumsTitle={collumsTitle} data={data} />
      {!systems && <EmptyResults />}
      {systems && systems.data.length === 0 && <EmptyResults />}
      {getPaginationComponent()}
    </div>
  )
}

export default TableWithPaging
