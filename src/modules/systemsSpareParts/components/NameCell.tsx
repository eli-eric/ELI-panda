import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import type { CellContext } from '@tanstack/react-table'
import type { FC } from 'react'

import { TableButtonsWrapper } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import type { SystemDetail } from '@/types/responses/systems'
import { classNames } from '@/utils'

import { ShowSpareButton } from './ShowSpareButton'

interface SystemNameCellProps extends CellContext<SystemDetail, any> {
  tableId: string
  setUid: (uid: string | null) => void
}

export const SpareNameCell: FC<SystemNameCellProps> = ({
  tableId,
  row,
  setUid,
  getValue
}) => {
  const { original } = row
  const { sparesIn, sparesOut } = original

  return (
    <div
      style={{
        paddingLeft: `${row.depth * 2}rem`
      }}
      className={classNames('relative')}
    >
      <div className="flex items-center">
        <div className="flex items-center">
          <Tooltip
            content={original.parentPath?.map(v => v.name).join(' > ')}
            placement="top"
            className={
              original.parentPath && original.parentPath?.length > 0
                ? ''
                : 'hidden'
            }
          >
            <div>
              {original.hasSubsystems ? (
                <button
                  onClick={() => {
                    if (!row.getIsExpanded()) {
                      setUid(original.uid)
                    } else {
                      setUid(null)
                    }
                    row.toggleExpanded()
                  }}
                  className="flex items-center hover:text-gray-400 cursor-pointer"
                >
                  {row.getIsExpanded() ? (
                    <ChevronDownIcon className="w-4 h-4" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4" />
                  )}
                  <span className="pl-1">
                    <span>{getValue()}</span>
                  </span>
                </button>
              ) : (
                <div className="flex items-center">
                  <span className="pl-5">
                    <span>{getValue()}</span>
                  </span>
                </div>
              )}
            </div>
          </Tooltip>
        </div>

        <TableButtonsWrapper>
          <ShowSpareButton
            tableId={tableId}
            uid={original.uid}
            sparesIn={sparesIn}
            sparesOut={sparesOut}
          />
        </TableButtonsWrapper>
      </div>
    </div>
  )
}
