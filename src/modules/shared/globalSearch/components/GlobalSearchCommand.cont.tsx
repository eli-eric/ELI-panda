import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

import { useGlobalSearch } from '../hooks/useGlobalSearch'
import { useGlobalSearchShortcut } from '../hooks/useGlobalSearchShortcut'
import type { GlobalSearchItem } from '../types'
import { getRedirectPath } from '../utils/getRedirectPath'
import { GlobalSearchCommand } from './GlobalSearchCommand.comp'

/**
 * Container component for global search functionality
 * Manages state, data fetching, and navigation logic
 */
export const GlobalSearchCommandContainer = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  console.log('GlobalSearchCommandContainer - searchValue:', searchValue)

  // Debounce search input to avoid excessive API calls
  const debouncedSearch = useDebounce(searchValue, 300)
  console.log(
    'GlobalSearchCommandContainer - debouncedSearch:',
    debouncedSearch
  )

  // Fetch search results
  const { data, isLoading, isFetching, error } = useGlobalSearch({
    search: debouncedSearch,
    enabled: open // Only fetch when modal is open
  })

  // Handle keyboard shortcut
  const handleToggle = useCallback(() => {
    setOpen(prev => !prev)
    // Clear search when closing
    if (open) {
      setSearchValue('')
    }
  }, [open])

  useGlobalSearchShortcut({ onToggle: handleToggle })

  // Handle modal open/close
  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen)
    // Clear search when closing
    if (!newOpen) {
      setSearchValue('')
    }
  }, [])

  // Handle search input change
  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  // Handle item selection
  const handleSelect = useCallback(
    (item: GlobalSearchItem) => {
      const path = getRedirectPath(item.nodeType, item.uid)
      router.push(path)
      setOpen(false)
      setSearchValue('')
    },
    [router]
  )

  return (
    <GlobalSearchCommand
      open={open}
      onOpenChange={handleOpenChange}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      results={data}
      isLoading={isLoading}
      isFetching={isFetching}
      onSelect={handleSelect}
      error={error}
    />
  )
}
