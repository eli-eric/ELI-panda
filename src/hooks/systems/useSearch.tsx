import Card from '@components/systems/Card'
import Link from '@components/systems/Link'
import { useRouter } from 'next/router'
import { fetchFakeSystems } from 'src/pages/tree/[slug]'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

const useSearch = (path = '', param = 'q') => {
  const router = useRouter()
  const { query, push } = router
  const ref = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState(query[param])

  useEffect(() => {
    query[param] && setSearchQuery(query[param])
  }, [query, param, setSearchQuery])

  const updateParam = (value: string) => push({ query: { ...query, [param]: value } }, undefined, { shallow: true })

  useEffect(() => {
    ref.current?.focus()
  }, [query])

  const Prompt = () => {
    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          const value = e.target['prompt'].value
          setSearchQuery(value)
          updateParam(value)
        }}
      >
        <input
          ref={ref}
          name="prompt"
          onChange={e => {
            if (e.target.value === '') {
              updateParam('')
              setSearchQuery('')
            }
          }}
          defaultValue={searchQuery}
          placeholder="Search current system"
        />
      </form>
    )
  }

  const Results = () => {
    const { data = [] } = useSWR(searchQuery && path + searchQuery, fetchFakeSystems, {
      suspense: true
    })

    return (
      <Card className="w-full overflow-auto">
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
    )
  }

  const hasResults = !!searchQuery

  return { Prompt, Results, hasResults }
}

export default useSearch
