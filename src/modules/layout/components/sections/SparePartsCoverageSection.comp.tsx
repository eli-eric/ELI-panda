import { type FC } from 'react'

import { Disclosure } from '@/components/ui'

import { SystemDetailParameter } from '../system-detail-parameter.comp'

interface SparePartsCoverageSectionProps {
  systemDetail: any
}

export const SparePartsCoverageSection: FC<SparePartsCoverageSectionProps> = ({
  systemDetail
}) => {
  if (!systemDetail) return null

  return (
    <Disclosure
      title="Spare Parts Coverage"
      defaultOpen={true}
      className="w-full border rounded-md overflow-hidden"
      buttonClassName="p-3 bg-orange-50 dark:bg-orange-900/20"
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

        <SystemDetailParameter
          title="Required Parts"
          value={systemDetail.minimalSpareParstCount?.toString() || '0'}
        />

        <SystemDetailParameter
          title="Available Parts"
          value={systemDetail.sparePartsCoverageSum?.toFixed(2) || '0.00'}
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
    </Disclosure>
  )
}
