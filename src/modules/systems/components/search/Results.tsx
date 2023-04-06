import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect } from 'react'
import useSWR from 'swr'

import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import useTable from '@/hooks/useTable'
import { PATH } from '@/types/constants/paths'

import { SystemDetailResponse, SystemsResponse } from '../../types/responses'

interface Props {
  query?: string
}

const Results = ({ query }: Props) => {
  const router = useRouter()
  const { getPaginationComponent, pagination, setTotalCount } = usePagination({
    dependecies: [query]
  })
  const { systemsList } = useEndpoint({
    uid: router.query.uid as string,
    query: { search: query, pagination }
  })
  const { data: systems } = useSWR<SystemsResponse>(systemsList, mockFetcher)

  const onClickRow = useCallback(
    (item: SystemDetailResponse) => {
      router.push({ pathname: PATH.SYSTEMS + '/' + item.uid, query: { q: router.query.q } })
    },
    [router]
  )

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
    onClick: onClickRow,
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
    )
  })

  useEffect(() => {
    setTotalCount(systems?.totalCount)
  }, [systems, setTotalCount])

  return (
    <Fragment>
      {query && (
        <div className="flex flex-col min-h-[378px] justify-between border-b">
          {/* <TableComponent
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
          >
            {systems?.data.map((item, index) => (
              <ResultItem key={item.uid + index} item={item} index={index} />
            ))}
          </TableComponent> */}
          {getTable()}
          {getPaginationComponent()}
        </div>
      )}
    </Fragment>
  )
}

export default Results
