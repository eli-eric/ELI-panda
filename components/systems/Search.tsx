import { fetchFakeSystems } from 'pages/tree/[slug]'
import useSWR from 'swr'

import Card from './Card'
import Link from './Link'

export const SearchInput = ({ router }) => {
  const { query, push } = router

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        push({ query: { ...query, q: e.target['prompt'].value } }, undefined, { shallow: true })
      }}
    >
      <input name="prompt" defaultValue={query.q} placeholder="search this system" />
      <input type="submit" value="Search" />
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
