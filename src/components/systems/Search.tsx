import { Suspense, useEffect, useRef } from 'react'
import { fetchFakeSystems } from 'src/pages/tree/[slug]'
import useSWR from 'swr'

import Card, { Heading } from '../ui/card/card.comp'
import ProgressBarComponent from '../ui/progress-bar.comp'
import { Item } from './Subsystems'

const List = (props: { query: string }) => {
  const { query } = props
  const { data } = useSWR(query, fetchFakeSystems, {
    suspense: true
  })
  return (
    <>
      {data && data.length > 0 ? (
        data.map(({ uid, name }) => <Item key={uid} text={name} href={'/tree/' + uid} />)
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

export const Prompt = (props: { query: string; setQuery: (value: string) => void }) => {
  const { query, setQuery } = props

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [query])

  return (
    <form
      className="grow"
      onSubmit={e => {
        e.preventDefault()
        const value = e.target['prompt'].value
        setQuery(value)
      }}
    >
      <input
        ref={ref}
        name="prompt"
        className="w-full h-full px-2 rounded-md border border-gray-300 "
        onChange={e => {
          if (e.target.value === '') {
            setQuery('')
          }
        }}
        defaultValue={query}
        placeholder="Type here to search this system"
      />
    </form>
  )
}
