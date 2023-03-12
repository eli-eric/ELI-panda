import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import useSWR from 'swr'

import Card from '@/components/card/card.comp'
import EmptyResults from '@/components/EmptyResults'
import TableComponent2 from '@/components/table2/Table.comp'
import TableRowComponent from '@/components/table2/TableRow.comp'
import { TableRowItem } from '@/components/table2/TableRowItem.comp'
import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'

import { SystemDetailResponse, SystemsResponse } from '../../types/responses'

const messages = message.cataloguePage.defaultMessage

const ResultRow = ({ item, index }: { item: SystemDetailResponse; index: number }) => {
  const router = useRouter()
  const { systemImage } = useEndpoint({ uid: item.uid })
  const { data: image } = useSWR(systemImage)
  const onClickHandler = uid => {
    router.push({ pathname: PATH.SYSTEMS + '/' + uid, query: { q: router.query.q } })
  }
  return (
    <TableRowComponent
      key={item.uid + index}
      index={index}
      onClick={() => onClickHandler(item.uid)}
    >
      <TableRowItem text={item.name} image={image} />
      <TableRowItem text={item.description} isInfoTooltip={true} />
      <TableRowItem text={item.systemCode} />
      <TableRowItem text={item.systemType?.name} />
      <TableRowItem text={item.systemAlias} />
      <TableRowItem text={item.location?.name} />
      <TableRowItem text={item.owner?.name} />
      <TableRowItem text={item.importance?.name} />
      <TableRowItem text={item.zone?.name} />
    </TableRowComponent>
  )
}

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
        <Card>
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
              <ResultRow key={item.uid + index} item={item} index={index} />
            ))}
          </TableComponent2>
          {!systems && <EmptyResults />}
          {systems && getPaginationComponent()}
        </Card>
      )}
    </Fragment>
  )
}

export default Results
