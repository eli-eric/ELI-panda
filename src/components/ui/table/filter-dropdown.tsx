import { Filter } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

interface FilterDropdownProps {
  column: any
  onFilterChange: (value: string) => void
  currentFilter: string
}

export function FilterDropdown({
  column,
  onFilterChange,
  currentFilter
}: FilterDropdownProps) {
  const { formatMessage: fm } = useIntl()
  const [filterValue, setFilterValue] = useState(currentFilter || '')

  // Update the filter value when the prop changes
  useEffect(() => {
    setFilterValue(currentFilter || '')
  }, [currentFilter])

  // Handle filter input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value)
  }

  // Apply filter when user clicks the apply button
  const applyFilter = () => {
    onFilterChange(filterValue)
  }

  // Clear the filter
  const clearFilter = () => {
    setFilterValue('')
    onFilterChange('')
  }

  // Apply filter when user presses Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyFilter()
    }
  }

  // Prevent click from bubbling up to the header cell
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'h-8 w-8 p-0',
            currentFilter
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          )}
          aria-label="Filter"
          title="Filter"
          onClick={handleButtonClick}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-medium text-foreground mb-2">
            {fm({ id: message.common.ui.filter })} {column.columnDef.header}
          </p>
          <Input
            type="text"
            placeholder="Filter value..."
            value={filterValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={handleButtonClick}
            autoFocus
            className="mb-3"
          />
          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={e => {
                e.stopPropagation()
                clearFilter()
              }}
            >
              {fm({ id: message.common.ui.clear })}
            </Button>
            <Button
              size="sm"
              onClick={e => {
                e.stopPropagation()
                applyFilter()
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
