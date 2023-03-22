import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import useSWR from 'swr'

import EmptyResults from '@/components/EmptyResults'
import TableComponent2 from '@/components/table2/Table.comp'
import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import { message } from '@/i18n/src/messages'
import { RELATION_TYPE_CODE } from '@/modules/systems/types/constants'
import { SystemsForRelResponse } from '@/modules/systems/types/responses'

import { SelectedSystemForRel } from './SelectRelation'
import SystemForRelItem from './SystemForRelItem'

const messages = message.systemsPage.relations.addRelationModal

interface Props {
  searchValue?: string
  relationTypeCode?: RELATION_TYPE_CODE
  setSelectedSystem: Dispatch<SetStateAction<SelectedSystemForRel | undefined>>
  selectedSystem?: SelectedSystemForRel
}

const SystemsForRel = ({ searchValue, relationTypeCode, setSelectedSystem, selectedSystem }: Props) => {
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
  const { data: systems } = useSWR<SystemsForRelResponse>(searchValue && endpoints.systemsForRelationship, mockFetcher)

  useEffect(() => {
    setSelectedSystem(undefined)
  }, [page, setSelectedSystem])

  useEffect(() => {
    setTotalCount(systems?.totalCount)
  }, [systems, setTotalCount])

  return (
    <div className="flex flex-col min-h-[337px] justify-between">
      <TableComponent2
        tableHeaders={[
          'Name',
          'Description',
          'System Code',
          'System Type',
          'System Alias',
          'Location',
          'Owner',
          'Importance',
          'Zone'
        ]}
        loadingData={!!systems}
      >
        {systems?.data.map((item, index) => (
          <SystemForRelItem
            key={item.uid + index}
            item={item}
            index={index}
            setSelectedSystem={setSelectedSystem}
            selectedSystem={selectedSystem}
          />
        ))}
      </TableComponent2>
      {!systems && <EmptyResults />}
      {systems && systems.data.length === 0 && <EmptyResults />}
      {getPaginationComponent()}
    </div>
  )
}

export default SystemsForRel
