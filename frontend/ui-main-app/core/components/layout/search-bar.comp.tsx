import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

import ProfileDropdownContainer from './dropdown-menu/dropdown-menu.cont'

const SearchBarComp = () => {
  const searchValueRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    //@ts-ignore
    searchValueRef.current.value = router.query.search || null
  }, [])

  const setSearch = () => {
    console.log(router.query)
    const query = router.query
    const enteredSearch = searchValueRef.current?.value
    router.push({ query: { ...query, search: enteredSearch } }, undefined, { shallow: true })
  }

  let timer: NodeJS.Timeout
  searchValueRef.current?.addEventListener('keyup', ev => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      setSearch()
    }, 400)
  })

  return (
    <div className="flex flex-1 justify-between px-4">
      <div className="flex flex-1">
        <form className="flex w-full md:ml-0" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <input
              ref={searchValueRef}
              id="search-field"
              className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Search"
              type="search"
              name="search"
            />
          </div>
        </form>
      </div>
      <div className="ml-4 flex items-center md:ml-6">
        {/* Profile dropdown */}
        <ProfileDropdownContainer />
      </div>
    </div>
  )
}

export default SearchBarComp
