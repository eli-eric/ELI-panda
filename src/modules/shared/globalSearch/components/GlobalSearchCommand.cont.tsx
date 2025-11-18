import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useCallback, useMemo } from 'react'

import { useDebounce } from '@/hooks/useDebounce'
import { NAV_BAR_CONFIG } from '@/types/constants/paths'

import { useGlobalSearch } from '../hooks/useGlobalSearch'
import { useGlobalSearchShortcut } from '../hooks/useGlobalSearchShortcut'
import { useGlobalSearchStore } from '../store/useGlobalSearchStore'
import type { GlobalSearchItem } from '../types'
import { getRedirectPath } from '../utils/getRedirectPath'
import { mapNavBarToQuickNav } from '../utils/mapNavBarToQuickNav'
import { GlobalSearchCommand } from './GlobalSearchCommand.comp'

/**
 * Container component for global search functionality
 * Manages state, data fetching, and navigation logic
 */
export const GlobalSearchCommandContainer = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const {
    searchValue,
    open,
    setSearchValue,
    setOpen,
    clearSearch,
    toggleOpen
  } = useGlobalSearchStore()

  // Debounce search input to avoid excessive API calls
  const debouncedSearch = useDebounce(searchValue, 500)

  // Quick navigation items filtered by user permissions
  const quickNavItems = useMemo(
    () => mapNavBarToQuickNav(NAV_BAR_CONFIG, session?.user?.roles),
    [session?.user?.roles]
  )

  // Fetch search results
  const { data, isLoading, isFetching, error } = useGlobalSearch({
    search: debouncedSearch,
    enabled: open // Only fetch when modal is open
  })

  // Handle keyboard shortcut - just toggle, don't clear search
  const handleToggle = useCallback(() => {
    toggleOpen()
  }, [toggleOpen])

  useGlobalSearchShortcut({ onToggle: handleToggle })

  // Handle modal open/close - don't clear search on close
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
    },
    [setOpen]
  )

  // Handle search input change
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value)
    },
    [setSearchValue]
  )

  // Handle clear button click
  const handleClear = useCallback(() => {
    clearSearch()
  }, [clearSearch])

  // Handle item selection - keep search value for quick re-search
  const handleSelect = useCallback(
    (item: GlobalSearchItem) => {
      const path = getRedirectPath(item.nodeType, item.uid)
      router.push(path)
      setOpen(false)
    },
    [router, setOpen]
  )

  // Handle quick navigation selection - keep search value
  const handleQuickNavSelect = useCallback(
    (url: string) => {
      router.push(url)
      setOpen(false)
    },
    [router, setOpen]
  )

  return (
    <GlobalSearchCommand
      open={open}
      onOpenChange={handleOpenChange}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      onClear={handleClear}
      results={data}
      isLoading={isLoading}
      isFetching={isFetching}
      onSelect={handleSelect}
      quickNavItems={quickNavItems}
      onQuickNavSelect={handleQuickNavSelect}
      error={error}
    />
  )
}
