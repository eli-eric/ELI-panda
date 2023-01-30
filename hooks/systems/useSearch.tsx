import Card from 'components/systems/Card'
import Link from 'components/systems/Link'
import { useRouter } from 'next/router'
import { fetchFakeSystems } from 'pages/tree/[slug]'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

const debounce = (fn, ms = 500) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    setTimeout(() => fn(...args), ms)
  }
}

const useSearch = (path = '', param = 'q') => {
  const router = useRouter()
  const { query, push } = router
  const ref = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState(query[param])

  useEffect(() => {
    ref.current?.focus()
  }, [searchQuery])

  const updateParam = () => push({ query: { ...query, [param]: searchQuery } }, undefined, { shallow: true })

  const Prompt = () => {
    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          updateParam()
        }}
      >
        <input
          ref={ref}
          defaultValue={searchQuery ?? query[param]}
          placeholder="type here"
          onChange={debounce(e => setSearchQuery(e.target.value), 1000)}
          onBlur={updateParam}
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
