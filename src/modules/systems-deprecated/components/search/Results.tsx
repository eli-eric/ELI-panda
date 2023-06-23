import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useMemo } from 'react'
import type { Column } from 'react-table'
import useSWR from 'swr'

import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useGeneralTable from '@/hooks/table/useGeneralTable-deprecated'
import usePagination from '@/hooks/table/usePagination-deprecated'
import useTableStateStore from '@/store/useTableStateStore'
import { PATH } from '@/types/constants/paths'

import type { SystemDetailResponse, SystemsResponse } from '../../types/responses'

interface ResultsProps {
  searchValue?: string
}

const Results = ({ searchValue }: ResultsProps) => {
  const router = useRouter()
  const { getPaginationComponent, pagination, setTotalCount } = usePagination({
    dependecies: [searchValue]
  })

  const { instances } = useTableStateStore()

  const { systemsList } = useEndpoint({
    uid: router.query.uid as string,
    query: { search: searchValue, pagination, sortBy: instances['systems']?.sortByQueryString }
  })
  const { data: systems } = useSWR<SystemsResponse>(systemsList, mockFetcher, { suspense: false })

  const columns = useMemo(
    (): Array<Column<SystemDetailResponse>> => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Description',
        accessor: 'description',
        Cell: ({ value }: any) => (
          <div className="flex items-center whitespace-normal">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-6 w-6" data-tooltip-id="tooltip" data-tooltip-content={value} />
            </div>
          </div>
        )
      },
      { Header: 'System Code', accessor: 'systemCode' },
      {
        Header: 'System Type',
        accessor: 'systemType',
        Cell: ({ value }: any) => <span>{value?.name}</span>
      },
      { Header: 'System Alias', accessor: 'systemAlias' },
      { Header: 'Location', accessor: 'location', Cell: ({ value }: any) => <span>{value?.name}</span> },
      { Header: 'Owner', accessor: 'owner', Cell: ({ value }: any) => <span>{value?.name}</span> },
      { Header: 'Importance', accessor: 'importance', Cell: ({ value }: any) => <span>{value?.name}</span> },
      { Header: 'Zone', accessor: 'zone', Cell: ({ value }: any) => <span>{value?.name}</span> }
    ],
    []
  )

  const { getTable } = useGeneralTable<SystemDetailResponse>({
    tableId: 'systems',
    data: systems?.data,
    columns: columns,
    loading: !systems,
    isSortable: true,
    uriSortBy: true,
    getRowProps: ({ original }) => ({
      onClick: () => {
        router.push({ pathname: PATH.SYSTEMS + '/' + original.uid, query: { ...router.query } })
      },
      className: 'cursor-pointer'
    }),
    className: 'overflow-y-auto'
  })

  useEffect(() => {
    setTotalCount(systems?.totalCount)
  }, [systems, setTotalCount])

  return (
    <Fragment>
      {searchValue && (
        <div className="flex flex-col min-h-[378px] justify-between border-b">
          {getTable()}
          {getPaginationComponent()}
        </div>
      )}
    </Fragment>
  )
}

export default Results
