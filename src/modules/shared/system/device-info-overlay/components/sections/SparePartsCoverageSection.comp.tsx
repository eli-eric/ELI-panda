import { LinkIcon } from '@heroicons/react/24/outline'
import { type FC } from 'react'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { Disclosure } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import { useShowDeviceStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'

import { SystemDetailParameter } from '../system-detail-parameter.comp'

interface SparePartsCoverageSectionProps {
  systemDetail: any
}

export const SparePartsCoverageSection: FC<SparePartsCoverageSectionProps> = ({
  systemDetail
}) => {
  const { setUID } = useShowDeviceStore()

  if (!systemDetail) return null

  return (
    <Disclosure
      title="Spare Parts"
      defaultOpen={true}
      className="w-full border rounded-md overflow-hidden shadow-md"
      buttonClassName="bg-orange-50 dark:bg-orange-900/20"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      <div className="grid grid-cols-1 gap-2 text-sm">
        {systemDetail.sp_coverage !== null &&
          systemDetail.sp_coverage !== undefined && (
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
          )}
      </div>

      {/* Spare Parts Section */}
      {systemDetail?.sparePartsConnection?.edges &&
        systemDetail.sparePartsConnection.edges.length > 0 && (
          <div className="space-y-1">
            <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Spare Parts:
            </h4>
            {systemDetail.sparePartsConnection.edges.map(
              (edge: any, index: number) => {
                const { node } = edge
                const { physicalItem, name } = node

                return (
                  <button
                    key={index}
                    onClick={() => setUID(node.uid)}
                    className="flex justify-between text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 border border-transparent cursor-pointer group w-full"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <Badge className="text-[10px] bg-orange-100 dark:bg-orange-600 text-orange-800 dark:text-orange-100">
                        {String(Number(edge.coverage).toFixed(2))}
                      </Badge>
                      <div className="w-4 h-4 shrink-0">
                        <IconCell
                          itemUsageUid={
                            physicalItem?.itemUsage?.uid as ITEM_USAGE
                          }
                        />
                      </div>
                      <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors truncate">
                        {name}
                      </span>
                      <LinkIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-500 dark:text-blue-400 shrink-0" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tooltip content="Use this spare part">
                        <Button
                          onClick={() => {
                            // TODO: Implement use spare part functionality
                          }}
                          className="text-[10px]"
                        >
                          Use Spare
                        </Button>
                      </Tooltip>
                    </div>
                  </button>
                )
              }
            )}
          </div>
        )}

      {/* Designated Spare Part For Section */}
      {systemDetail?.sparePartsFor && systemDetail.sparePartsFor.length > 0 && (
        <div className="space-y-1">
          <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Designated spare part for:
          </h4>
          {systemDetail.sparePartsFor.map((system: any, index: number) => {
            const { physicalItem, name, uid } = system

            return (
              <button
                key={index}
                onClick={() => setUID(uid)}
                className="flex justify-between text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 border border-transparent cursor-pointer group w-full"
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div className="w-4 h-4 shrink-0">
                    <IconCell
                      itemUsageUid={physicalItem?.itemUsage?.uid as ITEM_USAGE}
                    />
                  </div>
                  <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors truncate">
                    {name}
                  </span>
                  <LinkIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-500 dark:text-blue-400 shrink-0" />
                </div>
              </button>
            )
          })}
        </div>
      )}
    </Disclosure>
  )
}
