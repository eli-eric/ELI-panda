import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { Fragment, Suspense, useEffect, useRef } from 'react'
import useSWR from 'swr'

import Card from '@/components/card/card.comp'
import EmptyResults from '@/components/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import TableComponent2 from '@/components/table2/Table.comp'
import TableRowComponent, { TableRowItem } from '@/components/table2/TableRow.comp'
import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import usePagination from '@/hooks/usePagination'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'

import { SystemDetailResponse, SystemsResponse } from '../types/responses'

const messages = message.cataloguePage.defaultMessage

const Row = ({ index, item }: { index: number; item: SystemDetailResponse }) => {
  const router = useRouter()

  const onClickHandler = () => {
    router.push({ pathname: PATH.SYSTEMS + '/' + item.uid, query: { q: router.query.q } })
  }

  return (
    <TableRowComponent index={index} onClick={onClickHandler}>
      <TableRowItem text={item.name} />
      <TableRowItem text={item.systemCode} />
      <TableRowItem text={item.systemType?.name} />
      <TableRowItem text={item.owner?.name} />
      <TableRowItem text={item.importance?.name} />
    </TableRowComponent>
  )
}

const List = ({ query }: { query: string }) => {
  const { getPaginationComponent, pagination, setTotalCount } = usePagination({
    dependecies: [query]
  })
  const router = useRouter()
  const { systemsList } = useEndpoint({
    uid: router.query.uid as string,
    query: { search: query, pagination }
  })
  const { data: systems } = useSWR<SystemsResponse>(systemsList, mockFetcher, { suspense: false })

  useEffect(() => {
    setTotalCount(systems?.totalCount)
  }, [systems, setTotalCount])
  return (
    <Fragment>
      <TableComponent2
        tableHeaders={['name', 'systemCode', 'systemType', 'owner', 'importance']}
        loadingData={!!systems}
        noData={systems?.totalCount === 0}
      >
        {systems?.data.map((item, index) => (
          <Row key={item.uid} item={item} index={index} />
        ))}
      </TableComponent2>
      {!systems && <EmptyResults />}
      {systems && getPaginationComponent()}
    </Fragment>
  )
}

export const Results = (props: { query: string }) => {
  const { query } = props

  return (
    <Card>
      <Suspense fallback={<ProgressBarComponent />}>
        <nav aria-label="Search Results">
          <List query={query} />
        </nav>
      </Suspense>
    </Card>
  )
}

export const Prompt = (props: { query: string; setQuery: (value: string) => void }) => {
  const { query, setQuery } = props

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [query])

  return (
    <form
      className="flex w-full md:ml-0"
      onSubmit={e => {
        e.preventDefault()
        const value = e.target['prompt'].value
        setQuery(value)
      }}
    >
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          ref={ref}
          name="prompt"
          className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
          onChange={e => {
            if (e.target.value === '') {
              setQuery('')
            }
          }}
          defaultValue={query}
          placeholder="Search in systems"
        />
      </div>
    </form>
  )
}
