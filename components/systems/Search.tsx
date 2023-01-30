import { fetchFakeSystems } from 'pages/tree/[slug]'
import { useEffect } from 'react'
import useSWR from 'swr'

import Card from './Card'
import Link from './Link'

const debounce = (fn, ms = 500) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    setTimeout(() => fn(...args), ms)
  }
}

export const SearchInput = ({ router }) => {
  const { query, push } = router
  const ID = 'systems-search-input'

  useEffect(() => {
    query && document.getElementById(ID)?.focus()
  }, [query])

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        id={ID}
        defaultValue={query.q}
        placeholder="search this system"
        onChange={debounce(e => {
          push({ query: { ...query, q: e.target.value } }, undefined, { shallow: true })
        }, 1500)}
      />
    </form>
  )
}

export const SearchResults = ({ query }) => {
  const { data = [] } = useSWR(query, fetchFakeSystems, { suspense: true })

  return (
    <div className="h-[30vh] mb-4">
      <b>Results ({data.length})</b>
      <Card className="h-full overflow-auto">
        {data.length > 0 ? (
          <ul>
            {data.map(({ uid, name }) => (
              <li key={uid}>
                <Link href={`/tree/${uid}`}>{name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <div>No results found.</div>
        )}
      </Card>
    </div>
  )
}
