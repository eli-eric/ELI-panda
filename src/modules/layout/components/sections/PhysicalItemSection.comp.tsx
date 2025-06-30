import { type FC } from 'react'

import { Disclosure } from '@/components/ui'

import { SystemDetailParameter } from '../system-detail-parameter.comp'

interface PhysicalItemSectionProps {
  physicalItem: any
}

export const PhysicalItemSection: FC<PhysicalItemSectionProps> = ({
  physicalItem
}) => {
  if (!physicalItem) return null

  return (
    <Disclosure
      title="Physical Item"
      defaultOpen={true}
      className="w-full border rounded-md"
      buttonClassName="p-3 bg-gray-50 dark:bg-gray-700"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      <div className="grid grid-cols-1 gap-2 text-sm">
        {physicalItem.eun && (
          <SystemDetailParameter title="EUN" value={physicalItem.eun} />
        )}
        {physicalItem.serialNumber && (
          <SystemDetailParameter
            title="Serial Number"
            value={physicalItem.serialNumber}
          />
        )}
        {physicalItem.itemUsage?.name && (
          <SystemDetailParameter
            title="Item Usage"
            value={physicalItem.itemUsage.name}
          />
        )}
        {physicalItem.conditionStatus?.name && (
          <SystemDetailParameter
            title="Condition Status"
            value={physicalItem.conditionStatus.name}
          />
        )}
        {physicalItem.notes && (
          <div className="pt-2">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Notes:
            </p>
            <p className="text-xs text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded">
              {physicalItem.notes}
            </p>
          </div>
        )}
      </div>
    </Disclosure>
  )
}
