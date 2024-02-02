import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useQueryState } from 'next-usequerystate'
import React, { useEffect, useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useDebounce, useIsFirstRender } from 'usehooks-ts'

import { PlusButton, RefreshButton } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import useTableStateStore from '@/store/useTableStateStore'
import type { ROLE } from '@/types/constants/roles'

interface Props {
  useQuery?: boolean

  left?: JSX.Element
  right?: JSX.Element
  tableId: string
  onChange?: (value: string) => void
}

export const SearchBar = ({ useQuery = true, left, right, tableId, onChange }: Props) => {
  const [querySearch, setQuerySearch] = useQueryState('search', { history: 'replace' })
  const { setSearch, instances } = useTableStateStore()
  const searchInstance = instances[tableId]?.search

  const { register, handleSubmit, control, setValue } = useForm<{ search: string }>({
    defaultValues: { search: searchInstance }
  })

  const searchValue = useDebounce(useWatch({ control, name: 'search' }), 500)

  const onChangeRef = useRef(onChange)

  const isFirstRender = useIsFirstRender()

  // initialize update table state and query state and instance on first render
  useEffect(() => {
    if (isFirstRender) {
      if (useQuery) {
        // check if sortByQuery is set
        if (querySearch) {
          setSearch(tableId, querySearch)
          setValue('search', querySearch)
          // check if sortByStringInstance is set
        } else if (searchInstance) {
          setQuerySearch(searchInstance)
          setValue('search', searchInstance)
        }
      }
    }
  }, [isFirstRender, tableId, useQuery, querySearch, searchInstance, setSearch, setQuerySearch, setValue])
  // update
  useEffect(() => {
    if (!isFirstRender) {
      setSearch(tableId, searchValue)
      if (useQuery) {
        setQuerySearch(searchValue || null, { shallow: true })
      }
      if (onChangeRef.current) {
        onChangeRef.current(searchValue)
      }
    }
    // reason for disabling eslint: isFirstRender is a dependency but it should not trigger a re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId, useQuery, setSearch, setQuerySearch, searchValue])

  const onSubmit = (data: { search: string }) => {
    if (useQuery) {
      setQuerySearch(data.search ? data.search : null, { shallow: true })
    }
    setSearch(tableId, data.search)
    if (onChangeRef.current) {
      onChangeRef.current(searchValue)
    }
  }

  return (
    <div id="search-bar" className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white dark:bg-gray-800 border-b">
      <div className="flex flex-1 justify-between px-4">
        {left && <div className="flex items-center mr-2">{left}</div>}
        <div className="flex flex-1">
          <form className="flex w-full md:ml-0" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="search-field" className="sr-only">
              Search...
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600 dark:text-gray-200">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <MagnifyingGlassIcon
                  className="h-4 w-4

"
                  aria-hidden="true"
                />
              </div>
              <input
                {...register('search')}
                id="search-field"
                className="block h-full w-full dark:bg-gray-800 border-transparent py-2 pl-8 pr-3 text-gray-900 dark:text-gray-200 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
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

interface SearchBarButtonsProps {
  handleRefresh: () => void
  handleAdd: () => void
  editRole: ROLE
  children?: React.ReactNode
}

export const SearchBarButtonsComponent = ({ editRole, handleRefresh, handleAdd, children }: SearchBarButtonsProps) => {
  const canEdit = usePermission([editRole])
  return (
    <div className="flex">
      <RefreshButton className="mr-1" buttonSize="large" onClick={handleRefresh} />
      {canEdit && <PlusButton primary className="mr-1" buttonSize="large" onClick={handleAdd} />}
      {children}
    </div>
  )
}
