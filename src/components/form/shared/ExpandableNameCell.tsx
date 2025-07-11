import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import type { Row } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { highlightText } from '@/utils'

import type { Codebooktree } from './CodebookTreeModalGraphql'

interface ExpandableNameCellProps {
  row: Row<Codebooktree>
  filterName?: string
  fetchChildren?: (uid: string) => void
  getValue: () => string
}

export const ExpandableNameCell = ({
  row,
  filterName,
  fetchChildren,
  getValue
}: ExpandableNameCellProps) => (
  <div
    style={{
      paddingLeft: `${row.depth * 2}rem`
    }}
    className={cn('my-1 flex items-center')}
    onClick={() => {
      if (row.original.isExpandable || row.getCanExpand()) {
        fetchChildren && fetchChildren(row.original.uid)
        row.toggleExpanded()
      }
    }}
  >
    {row.original.isExpandable || row.getCanExpand() ? (
      <div
        className={cn(
          'flex items-center',
          'cursot-pointer hover:text-gray-400'
        )}
      >
        <button>
          {row.getIsExpanded() ? (
            <ChevronDownIcon className="w-4 h-4" />
          ) : (
            <ChevronRightIcon className="w-4 h-4" />
          )}
        </button>

        <span className="ml-2">{highlightText(getValue(), filterName)}</span>
      </div>
    ) : (
      <span className="ml-2">{highlightText(getValue(), filterName)}</span>
    )}
  </div>
)
