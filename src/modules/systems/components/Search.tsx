import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useRef } from 'react'
import useSWR from 'swr'

import Card, { Heading } from '@/components/card/card.comp'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { useEndpoint } from '@/hooks/useEndpoint'

import { Item } from './Subsystems'

const List = (props: { query: string }) => {
  const { query } = props
  const router = useRouter()
  const { systemsList } = useEndpoint({
    uid: router.query.uid as string,
    query: query
  })
  const { data } = useSWR(systemsList)
  return (
    <>
      {data && data.length > 0 ? (
        data.map(({ uid, name }) => <Item key={uid} text={name} uid={uid} />)
      ) : (
        <div className="text-gray-600 flex items-center px-3 py-2 text-sm font-medium rounded-md">
          <span className="truncate">No results found.</span>
        </div>
      )}
    </>
  )
}

export const Results = (props: { query: string }) => {
  const { query } = props

  return (
    <Card>
      <Heading text="Search Results" />
      <Suspense fallback={<ProgressBarComponent />}>
        <nav aria-label="Search Results">
          <List query={query} />
        </nav>
      </Suspense>
    </Card>
  )
}

export const Prompt = (props: {
  query: string
  setQuery: (value: string) => void
}) => {
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
