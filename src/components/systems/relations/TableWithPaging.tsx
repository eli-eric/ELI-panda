import { useRouter } from 'next/router'
import { Dispatch, Fragment, SetStateAction, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import useSWR from 'swr'

import TableComponent from '@/components/ui/Table.comp'
import { useSystemMapRows } from '@/hooks/systems/relations/useMapRows'
import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import { message } from '@/i18n/src/messages'
import { SystemsForRelResponse } from '@/types/responses'
import { RELATION_TYPE_CODE } from '@/types/system/constants'

import EmptyResults from './EmptyResults'

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

  const { pagination, setTotalCount, getPaginationComponent } = usePagination({ dependecies: [searchValue] })
  const query = useMemo(
    () => ({ systemFromUid: router.query.slug, relationTypeCode, search: searchValue, pagination }),
    [router, relationTypeCode, searchValue, pagination]
  )
  const endpoints = useEndpoint({ query })
  const { data: systems } = useSWR<SystemsForRelResponse>(searchValue && endpoints.systemsForRelationship)

  const data = useSystemMapRows({
    systems: systems?.data,
    setSelectedSystem,
    selectedSystem
  })

  useEffect(() => {
    setTotalCount(systems?.totalCount)
  }, [systems, setTotalCount])

  const collumsTitle = Object.keys(messages.tableHeader).map(key =>
    intl.formatMessage({ id: messages.tableHeader[key] })
  )

  return (
    <Fragment>
      <TableComponent collumsTitle={collumsTitle} data={data} />
      {!systems && <EmptyResults />}
      {systems && systems.totalCount === 0 && <EmptyResults />}
      {getPaginationComponent()}
    </Fragment>
  )
}

export default TableWithPaging
