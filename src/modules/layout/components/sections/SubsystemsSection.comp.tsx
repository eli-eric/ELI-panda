import { type FC } from 'react'

import { Disclosure } from '@/components/ui'
import { getColorBySystemLevel } from '@/modules/systemItem/utils'
import { PATH } from '@/types/constants/paths'

import { SystemLink } from '../SystemLink.comp'

interface SubsystemsSectionProps {
  systemDetail: any
}

export const SubsystemsSection: FC<SubsystemsSectionProps> = ({
  systemDetail
}) => {
  if (!systemDetail?.subSystems || systemDetail.subSystems.length === 0)
    return null

  return (
    <Disclosure
      title={`Subsystems (${systemDetail.subSystems.length})`}
      defaultOpen={false}
      className="w-full border rounded-md overflow-hidden"
      buttonClassName="p-3 bg-blue-50 dark:bg-blue-900/20"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      <div className="space-y-2">
        {systemDetail.subSystems.map((subsystem: any) => (
          <div
            key={subsystem.uid}
            className={`p-3 rounded border transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${getColorBySystemLevel(subsystem.systemLevel || undefined)}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <SystemLink href={`${PATH.SYSTEM}/${subsystem.uid}`} external>
                  {subsystem.name}
                </SystemLink>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {subsystem.location?.name && (
                    <span>📍 {subsystem.location.name}</span>
                  )}
                  {subsystem.physicalItem?.eun && (
                    <span className="ml-2">
                      EUN: {subsystem.physicalItem.eun}
                    </span>
                  )}
                </div>
              </div>

              {subsystem.sp_coverage !== null &&
                subsystem.sp_coverage !== undefined && (
                  <div className="text-right">
                    <span
                      className={`text-xs font-medium ${
                        subsystem.sp_coverage < 1
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-green-600 dark:text-green-400'
                      }`}
                    >
                      SP: {(subsystem.sp_coverage * 100).toFixed(1)}%
                    </span>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <SystemLink
          href={`${PATH.SYSTEM}/${systemDetail.uid}#subsystems`}
          external
          variant="button"
          className="w-full justify-center text-sm py-2"
        >
          View All Subsystems
        </SystemLink>
      </div>
    </Disclosure>
  )
}
