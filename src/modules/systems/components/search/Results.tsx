import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useMemo } from 'react'
import { Column } from 'react-table'
import useSWR from 'swr'

import TooltipComponent from '@/components/tooltip.comp'
import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import useGeneralTable from '@/hooks/useGeneralTable'
import usePagination from '@/hooks/usePagination'
import useQueryString from '@/hooks/useQueryString'
import useSortingStore from '@/store/sortingStore'
import { PATH } from '@/types/constants/paths'

import { SystemsResponse } from '../../types/responses'

interface Props {
  query?: string
}

const Results = ({ query }: Props) => {
  const router = useRouter()
  const { getPaginationComponent, pagination, setTotalCount } = usePagination({
    dependecies: [query]
  })

  const { instances } = useSortingStore()
  const sortConfigQuery = useQueryString(instances['systems'])

  useEffect(() => {
    console.log('sortConfigQuery', sortConfigQuery)
  }, [sortConfigQuery])

  const { systemsList } = useEndpoint({
    uid: router.query.uid as string,
    query: { search: query, pagination, sortBy: sortConfigQuery }
  })
  const { data: systems } = useSWR<SystemsResponse>(systemsList, mockFetcher, { suspense: false })

  const columns: Array<Column> = useMemo(
    () => [
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
              <TooltipComponent text={value}>
                <InformationCircleIcon className="h-6 w-6" />
              </TooltipComponent>
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

  const { getTable } = useGeneralTable({
    tableId: 'systems',
    data: systems?.data,
    columns: columns,
    loading: !systems,
    isSortable: true,
    getRowProps: ({ original }) => ({
      onClick: () => {
        router.push({ pathname: PATH.SYSTEMS + '/' + original['uid'], query: { q: router.query.q } })
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
      {query && (
        <div className="flex flex-col min-h-[378px] justify-between border-b">
          {getTable()}
          {getPaginationComponent()}
        </div>
      )}
    </Fragment>
  )
}

export default Results
