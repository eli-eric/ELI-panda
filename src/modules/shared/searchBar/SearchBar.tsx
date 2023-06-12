import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useQueryState } from 'next-usequerystate'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useDebounce } from 'usehooks-ts'

import useTableStateStore from '@/store/useTableStateStore'

interface Props {
  useQuery?: boolean

  left?: JSX.Element
  right?: JSX.Element
  tableId: string
}

const SearchBar = ({ useQuery = true, left, right, tableId }: Props) => {
  const [querySearch, setQuerySearch] = useQueryState('search', { history: 'replace' })
  const { setSearch, instances } = useTableStateStore()
  const { register, handleSubmit, control } = useForm<{ search: string }>({
    defaultValues: { search: querySearch || (tableId && instances[tableId]?.search) || '' }
  })

  const searchValue = useDebounce(useWatch({ control, name: 'search' }), 500)

  useEffect(() => {
    if (useQuery) {
      setQuerySearch(searchValue ? searchValue : null, { shallow: true })
    }
    setSearch(tableId, searchValue)
  }, [searchValue, setQuerySearch, useQuery, tableId, setSearch])

  const onSubmit = (data: { search: string }) => {
    if (useQuery) {
      setQuerySearch(data.search ? data.search : null, { shallow: true })
    }
    setSearch(tableId, data.search)
  }

  return (
    <div id="search-bar" className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b">
      <div className="flex flex-1 justify-between px-4">
        {left && <div className="flex items-center mr-2">{left}</div>}
        <div className="flex flex-1">
          <form className="flex w-full md:ml-0" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="search-field" className="sr-only">
              Search...
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                {...register('search')}
                className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>
        {right && <div className="hidden md:hidde lg:flex items-center mr-2">{right}</div>}
      </div>
    </div>
  )
}

export default SearchBar
