import type { ColumnDef } from '@tanstack/react-table'
import { type FC, useMemo } from 'react'

import { Disclosure, Table } from '@/components/ui'
import { useShowDeviceStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import type { TableSystem } from '@/modules/systemItem/components/subsystems/types'
import {
  getColorBySystemLevel,
  getFontBySystemLevel
} from '@/modules/systemItem/utils'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import { cx } from '@/utils'

interface SubsystemsSectionProps {
  systemDetail: any
}

export const SubsystemsSection: FC<SubsystemsSectionProps> = ({
  systemDetail
}) => {
  const { setUID } = useShowDeviceStore()

  const columns = useMemo((): ColumnDef<TableSystem, any>[] => {
    const columns: ColumnDef<TableSystem, any>[] = [
      {
        id: 'icon',
        meta: {
          noHeader: true
        },
        cell: ({
          row: {
            original: { physicalItem, name }
          }
        }) => (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4">
              <IconCell
                itemUsageUid={physicalItem?.itemUsage?.uid as ITEM_USAGE}
              />
            </div>
            <span>{name}</span>
          </div>
        )
      }
    ]

    return columns
  }, [])

  if (!systemDetail?.subSystems || systemDetail.subSystems.length === 0)
    return null

  return (
    <Disclosure
      title={`Subsystems (${systemDetail.subSystems.length})`}
      defaultOpen={false}
      className="w-full border rounded-md overflow-hidden shadow-md"
      buttonClassName="bg-blue-50 dark:bg-blue-900/20"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      <Table<TableSystem>
        columns={columns}
        enableFiltering
        enablePagination
        className={'relative overflow-x-auto mb-0 pb-0'}
        getRowProps={(
          { physicalItem, systemLevel, sp_coverage, uid },
          index
        ) => ({
          className: cx(
            physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
            getColorBySystemLevel(systemLevel || undefined, index),
            getFontBySystemLevel(systemLevel || undefined),
            sp_coverage != null &&
              sp_coverage < 1 &&
              'text-red-500 dark:text-red-500 font-bold',
            'cursor-pointer'
          ),
          onClick: () => {
            setUID(uid)
          }
        })}
        data={systemDetail.subSystems as TableSystem[]}
      />
    </Disclosure>
  )
}
