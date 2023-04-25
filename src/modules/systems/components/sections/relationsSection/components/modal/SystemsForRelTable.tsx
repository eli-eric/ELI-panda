import { useRouter } from 'next/router'
import { Dispatch, Fragment, SetStateAction, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import useSWR from 'swr'

import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import useTable from '@/hooks/useTable'
import { message } from '@/i18n/src/messages'
import { RELATION_TYPE_CODE } from '@/modules/systems/types/constants'
import { SystemDetailResponse, SystemsForRelResponse } from '@/modules/systems/types/responses'

import { SelectedSystemForRel } from './SelectRelation'

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
  const { data: systems } = useSWR<SystemsForRelResponse>(
    searchValue && endpoints.systemsForRelationship,
    mockFetcher,
    { suspense: false }
  )

  //TODO refactor with useGeneralTable
  const { getTable, TableRowItem } = useTable<SystemDetailResponse>({
    collums: [
      'Name',
      'Description',
      'System Code',
      'System Type',
      'System Alias',
      'Location',
      'Owner',
      'Importance',
      'Zone'
    ],
    data: systems?.data,
    renderRow: item => (
      <Fragment>
        <TableRowItem text={item.name} />
        <TableRowItem text={item.description} isInfoTooltip={true} />
        <TableRowItem text={item.systemCode} />
        <TableRowItem text={item.systemType?.name} />
        <TableRowItem text={item.systemAlias} />
        <TableRowItem text={item.location?.name} />
        <TableRowItem text={item.owner?.name} />
        <TableRowItem text={item.importance?.name} />
        <TableRowItem text={item.zone?.name} />
      </Fragment>
    ),
    onClick: item => {
      setSelectedSystem({ name: item.name, uid: item.uid })
    },
    loading: !systems?.data && !!searchValue,
    isSelected: item => selectedSystem?.uid === item.uid
  })

  useEffect(() => {
    setSelectedSystem(undefined)
  }, [page, setSelectedSystem])

  useEffect(() => {
    setTotalCount(systems?.totalCount)
  }, [systems, setTotalCount])

  return (
    <div className="flex flex-col min-h-[337px] justify-between">
      {getTable()}
      {getPaginationComponent()}
    </div>
  )
}

export default SystemsForRel
