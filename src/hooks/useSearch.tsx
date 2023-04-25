import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  useQuery?: boolean
  onSuccess?: (search: string) => void

  renderEnd?: () => JSX.Element
  renderBegin?: () => JSX.Element
}

export const useSearch = ({ useQuery = true, onSuccess, renderEnd, renderBegin }: Props) => {
  const router = useRouter()
  const query = router.query
  const [searchValue, setSearchValue] = useState<string | undefined>(
    useQuery ? (router.query.search as string) : undefined
  )

  const { register, handleSubmit } = useForm<{ search: string }>({
    defaultValues: { search: searchValue }
  })

  const onSubmit = (data: { search: string }) => {
    if (useQuery) {
      router.replace({ query: { ...query, search: data.search } })
    }
    setSearchValue(data.search)
    onSuccess && onSuccess(data.search)
  }

  const renderSearchBar = () => (
    <div id="search-bar" className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b">
      <div className="flex flex-1 justify-between px-4">
        <div className="flex items-center mr-2">{renderBegin && renderBegin()}</div>
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
                id="search-field"
                {...register('search')}
                className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>
        {renderEnd && renderEnd()}
      </div>
    </div>
  )

  return { renderSearchBar, searchValue }
}
