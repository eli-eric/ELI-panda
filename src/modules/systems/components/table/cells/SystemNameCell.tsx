import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'
import { Fragment } from 'react'

import { DeleteButton, DetailButton, EditButton, PlusButton } from '@/components/Buttons'
import type { SystemDetail } from '@/modules/systems/types/responses'
import { PATH } from '@/types/constants/paths'

interface SystemNameCellProps extends CellContext<SystemDetail, any> {
  setUid: (uid: string) => void
  canEdit?: boolean
  hideButtons?: boolean
}

export const SystemNameCell = ({ row, getValue, setUid, canEdit = true, hideButtons = false }: SystemNameCellProps) => (
  <div
    style={{
      paddingLeft: `${row.depth * 2}rem`
    }}
  >
    <div className="flex items-center">
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
          <span className="pl-1">{getValue()}</span>
        </button>
      ) : (
        <span className="pl-5">{getValue()}</span>
      )}
      {!hideButtons && (
        <Fragment>
          <Link href={PATH.SYSTEM + '/' + row.original.uid} className="ml-auto">
            <Fragment>{canEdit ? <EditButton /> : <DetailButton />}</Fragment>
          </Link>
          {canEdit && <DeleteButton className="ml-2" />}
          {canEdit && (
            <Link href={{ pathname: PATH.SYSTEM, query: { parentUid: row.original.uid } }} className="ml-2">
              <PlusButton />
            </Link>
          )}
        </Fragment>
      )}
    </div>
  </div>
)
