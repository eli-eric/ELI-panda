import type { ColumnDef } from '@tanstack/react-table'
import { type FC, useMemo } from 'react'

import { Disclosure, Table } from '@/components/ui'
import { useShowDeviceStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import {
  getColorBySystemLevel,
  getFontBySystemLevel
} from '@/modules/systemItem/utils'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'
import type {
  SystemInterfaceSparePartsRelationship,
  SystemLevel
} from '@/types/gql/graphql'
import { cx } from '@/utils'

import { SystemDetailParameter } from '../system-detail-parameter.comp'

interface SparePartsCoverageSectionProps {
  systemDetail: any
}

export const SparePartsCoverageSection: FC<SparePartsCoverageSectionProps> = ({
  systemDetail
}) => {
  const { setUID } = useShowDeviceStore()
  const columns = useMemo((): ColumnDef<
    SystemInterfaceSparePartsRelationship,
    any
  >[] => {
    const columns: ColumnDef<SystemInterfaceSparePartsRelationship, any>[] = [
      {
        id: 'icon',
        meta: {
          noHeader: true
        },
        cell: ({
          row: {
            original: {
              node: { physicalItem, name, sp_coverage, sparePartsCoverageSum }
            }
          }
        }) => (
          <div className="flex items-center gap-2">
            <span>{String(Number(sparePartsCoverageSum).toFixed(2))}</span>
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
  if (!systemDetail) return null

  return (
    <Disclosure
      title="Spare Parts Coverage"
      defaultOpen={true}
      className="w-full border rounded-md overflow-hidden shadow-md"
      buttonClassName="bg-orange-50 dark:bg-orange-900/20"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      <div className="grid grid-cols-1 gap-2 text-sm">
        <SystemDetailParameter
          title="Current Coverage"
          value={
            systemDetail.sp_coverage !== null &&
            systemDetail.sp_coverage !== undefined
              ? `${(systemDetail.sp_coverage * 100).toFixed(1)}%`
              : 'N/A'
          }
          className={
            systemDetail.sp_coverage !== null &&
            systemDetail.sp_coverage !== undefined &&
            systemDetail.sp_coverage < 1
              ? 'text-red-600 dark:text-red-400 font-medium'
              : 'text-green-600 dark:text-green-400 font-medium'
          }
        />
        {systemDetail.sp_coverage !== null &&
          systemDetail.sp_coverage !== undefined && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    systemDetail.sp_coverage < 1 ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{
                    width: `${Math.min(systemDetail.sp_coverage * 100, 100)}%`
                  }}
                />
              </div>
            </div>
          )}
      </div>
      {systemDetail?.sparePartsConnection.edges &&
        systemDetail.sparePartsConnection.edges.length > 0 && (
          <Table<SystemInterfaceSparePartsRelationship>
            columns={columns}
            getRowProps={({ node }, index) => ({
              className: cx(
                node?.physicalItem &&
                  'font-bold text-gray-700 dark:text-gray-200',
                getColorBySystemLevel(
                  String(node?.systemLevel) as SystemLevel,
                  index
                ),
                getFontBySystemLevel(String(node?.systemLevel) as SystemLevel),
                'cursor-pointer'
              ),
              onClick: () => {
                setUID(node.uid)
              }
            })}
            data={systemDetail?.sparePartsConnection.edges}
          />
        )}
    </Disclosure>
  )
}
