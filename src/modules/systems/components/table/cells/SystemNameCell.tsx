import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import type { CellContext } from '@tanstack/react-table'

import { DeleteButton, EditButton } from '@/components/Buttons'
import type { SystemDetail } from '@/modules/systems/types/responses'

interface SystemNameCellProps extends CellContext<SystemDetail, any> {
  setUid: (uid: string) => void
}

export const SystemNameCell = ({ row, getValue, setUid }: SystemNameCellProps) => (
  <div
    style={{
      paddingLeft: `${row.depth * 2}rem`
    }}
  >
    <div className="flex">
      {row.original.hasSubsystems ? (
        <button
          onClick={() => {
            if (!row.getIsExpanded()) {
              setUid(row.original.uid)
            }
            row.toggleExpanded()
          }}
          style={{ cursor: 'pointer' }}
          className="flex items-center hover:text-gray-400"
        >
          {row.getIsExpanded() ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
          <span>{getValue()}</span>
        </button>
      ) : (
        <span className="pl-4">{getValue()}</span>
      )}
      <EditButton className="ml-auto" />
      <DeleteButton className="ml-2" />
    </div>
  </div>
)
