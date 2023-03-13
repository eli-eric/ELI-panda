import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import useSWR from 'swr'

import EmptyResults from '@/components/EmptyResults'
import TableComponent2 from '@/components/table2/Table.comp'
import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'

import { SystemsResponse } from '../../types/responses'
import ResultItem from './ResultItem'

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

  useEffect(() => {
    setTotalCount(systems?.totalCount)
  }, [systems, setTotalCount])
  return (
    <Fragment>
      {query && (
        <div className="flex flex-col min-h-[378px] justify-between border-b">
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
            noData={systems?.totalCount === 0}
          >
            {systems?.data.map((item, index) => (
              <ResultItem key={item.uid + index} item={item} index={index} />
            ))}
          </TableComponent2>
          {!systems || (systems.totalCount === 0 && <EmptyResults />)}
          {systems && getPaginationComponent()}
        </div>
      )}
    </Fragment>
  )
}

export default Results
