import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useRef } from 'react'

const SearchBarComponent = () => {
  const searchValueRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const query = router.query
  const { slug } = router.query

  useEffect(() => {
    //@ts-ignore
    searchValueRef.current.value = router.query.search || null
  }, []) // eslint-disable-line

  const setSearch = () => {
    const enteredSearch = searchValueRef.current?.value
    router.push(
      {
        query: enteredSearch
          ? { ...query, search: enteredSearch }
          : { slug: slug },
      },
      undefined,
      {
        shallow: true,
      },
    )
  }

  /* let timer: NodeJS.Timeout
  searchValueRef.current?.addEventListener('keyup', ev => {
    ev.preventDefault()
    clearTimeout(timer)
    timer = setTimeout(() => {
      setSearch()
    }, 400)
  }) */

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    setSearch()
  }

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b">
      <div id="layout-search-bar" className="flex flex-1 justify-between px-4">
        <div className="flex flex-1">
          <form
            data-testid="search"
            className="flex w-full md:ml-0"
            action="#"
            method="GET"
            onSubmit={submitHandler}
          >
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
      </div>
    </div>
  )
}

export default SearchBarComponent
