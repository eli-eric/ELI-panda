import Card from 'components/systems/Card'
import Link from 'components/systems/Link'
import { useRouter } from 'next/router'
import { fetchFakeSystems } from 'pages/tree/[slug]'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

const useSearch = (path = '', param = 'q') => {
  const router = useRouter()
  const { query, push } = router
  const ref = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState(query[param])

  const updateParam = value => push({ query: { ...query, [param]: value } }, undefined, { shallow: true })

  useEffect(() => {
    ref.current?.focus()
  }, [searchQuery, query])

  const Prompt = () => {
    return (
      <form
        onSubmit={e => {
          const value = e.target['prompt'].value
          setSearchQuery(value)
          updateParam(value)
        }}
      >
        <input
          ref={ref}
          name="prompt"
          onChange={e => e.target.value === '' && setSearchQuery('')}
          defaultValue={searchQuery ?? query[param]}
          placeholder="type here"
        />
      </form>
    )
  }

  const Results = () => {
    const { data = [] } = useSWR(searchQuery && path + searchQuery, fetchFakeSystems, { suspense: true })

    return (
      <div className={`h-[30vh] mb-4 ${(searchQuery ?? query[param]) || 'hidden'}`}>
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

  return { Prompt, Results }
}

export default useSearch
