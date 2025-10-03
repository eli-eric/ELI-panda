import { Search } from 'lucide-react'
import { useQueryState } from 'next-usequerystate'
import React, { useEffect, useRef, useState } from 'react'

import { PlusButton, RefreshButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
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

export const SearchBar = ({
  useQuery = true,
  left,
  right,
  tableId,
  onChange
}: Props) => {
  const [querySearch, setQuerySearch] = useQueryState('search', {
    history: 'replace'
  })

  const { setSearch, instances, setSearchValue } = useTableStateStore()
  const searchInstance = querySearch || instances[tableId]?.search
  const value = instances[tableId]?.searchBarValue

  const onChangeRef = useRef(onChange)

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      setSearchValue(tableId, searchInstance || '')
    }
  }, [mounted, searchInstance, setSearchValue, tableId])

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      if (mounted) {
        if (onChangeRef.current) {
          onChangeRef.current(value || '')
        }
        setSearch(tableId, value)
        if (useQuery) {
          setQuerySearch(value || '', { shallow: true })
        }
      }
    }, 500)
    return () => clearTimeout(delayInputTimeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div
      id="search-bar"
      className="sticky top-0 z-10 bg-background border-b px-4 py-2"
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        {left && (
          <div className="flex items-center gap-2 flex-shrink-0">{left}</div>
        )}

        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={value || ''}
              onChange={e => {
                setSearchValue(tableId, e.target.value)
              }}
              placeholder="Search..."
              className="pl-10"
              type="search"
              name="search"
            />
          </div>
        </div>

        {right && (
          <div className="flex items-center gap-2 flex-shrink-0">{right}</div>
        )}
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

export const SearchBarButtonsComponent = ({
  editRole,
  handleRefresh,
  handleAdd,
  children
}: SearchBarButtonsProps) => {
  const canEdit = usePermission([editRole])
  return (
    <div className="flex gap-1">
      <Tooltip content="Refresh">
        <div>
          <RefreshButton onClick={handleRefresh} />
        </div>
      </Tooltip>
      {canEdit && (
        <Tooltip content="Add New">
          <div>
            <PlusButton onClick={handleAdd} />
          </div>
        </Tooltip>
      )}
      {children}
    </div>
  )
}
