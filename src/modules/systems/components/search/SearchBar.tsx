import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef } from 'react'

interface Props {
  query: string
  setQuery: (value: string) => void
}

const SearchBar = ({ query, setQuery }: Props) => {
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

export default SearchBar
