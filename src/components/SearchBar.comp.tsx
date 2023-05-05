import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useFormContext } from 'react-hook-form'

interface Props {
  onSubmit: (data: { search: string }) => void
}

const SearchBarComponent = ({ onSubmit }: Props) => {
  const { register, handleSubmit } = useFormContext<{ search: string }>()
  return (
    <div id="search-bar" className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b">
      <div className="flex flex-1 justify-between px-4">
        <div className="flex flex-1">
          <form className="flex w-full md:ml-0" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                {...register('search')}
                className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchBarComponent
