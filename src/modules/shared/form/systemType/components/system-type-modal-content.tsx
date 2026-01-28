import type { Row } from '@tanstack/react-table'
import { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableControlled } from '@/modules/shared/table/pandaTable/PandaTableCotrolled'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import type { CodebookType } from '@/types/responses/codebook'

import { useSystemTypesForSelect } from '../hooks/useSystemTypesForSelect'
import type {
  SystemTypeModalContentProps,
  SystemTypeTreeRow
} from '../types/system-type-select.types'
import { useSystemTypeSelectColumns } from './system-type-select.columns'

const TABLE_ID = 'system-type-select-modal'

/**
 * Modal content for selecting a system type.
 *
 * Features:
 * - Tree structure with expandable system type groups
 * - SearchBar with local state (no URL params)
 * - Auto-expand tree when searching
 * - Only children (system types) are selectable, not groups
 * - Auto-confirm on child selection
 */
export const SystemTypeModalContent: React.FC<SystemTypeModalContentProps> = ({
  onSelect,
  onClose
}) => {
  // Fetch system type groups with children
  const { data: treeData, isLoading, search } = useSystemTypesForSelect(TABLE_ID)

  // Get columns with search term for highlighting
  const columns = useSystemTypeSelectColumns(search)

  // Create table instance with tree support
  const table = usePandaTable<SystemTypeTreeRow>({
    tableId: TABLE_ID,
    columns,
    data: treeData,
    settings: {
      enableRowSelection: false,
      enableFiltering: false,
      manualFiltering: false
    },
    getSubRows: row => row?.children || []
  })

  const { toggleAllRowsExpanded } = table

  // Auto-expand/collapse tree based on search
  useEffect(() => {
    if (search) {
      toggleAllRowsExpanded(true)
    } else {
      toggleAllRowsExpanded(false)
    }
  }, [search, toggleAllRowsExpanded])

  // Handle row click - only children are selectable
  // Note: Groups are expanded via ExpandableNameCell, not row click
  const handleRowClick = (row: Row<SystemTypeTreeRow>) => {
    // Groups are not selectable - expansion handled by ExpandableNameCell
    if (row.original.isGroup) {
      return
    }

    // Auto-confirm selection - return CodebookType format
    const selected: CodebookType = {
      uid: row.original.uid,
      name: `${row.original.name} (${row.original.code})`
    }
    onSelect(selected)
    onClose?.()
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Search bar */}
      <SearchBar tableId={TABLE_ID} useQuery={false} />

      {/* System types tree table */}
      <div className={cn('h-[300px]', isLoading && 'opacity-70')}>
        <PandaTableControlled
          tableId={TABLE_ID}
          data={treeData}
          table={table}
          loading={isLoading}
          settings={{
            enableRowSelection: false,
            enableFiltering: false,
            manualFiltering: false
          }}
          className="relative overflow-y-auto h-[300px] border-l border-b border-gray-400"
          getRowProps={row => ({
            onClick: () => handleRowClick(row),
            className: cn(
              'cursor-pointer',
              // Groups have different cursor to indicate expand action
              row.original.isGroup && 'hover:bg-muted/50',
              // Children are selectable with highlight on hover
              !row.original.isGroup && 'hover:bg-orange-100 dark:hover:bg-orange-900/50'
            )
          })}
        />
      </div>

      {/* Footer button */}
      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          <FormattedMessage id={message.common.buttons.close} />
        </Button>
      </div>
    </div>
  )
}
