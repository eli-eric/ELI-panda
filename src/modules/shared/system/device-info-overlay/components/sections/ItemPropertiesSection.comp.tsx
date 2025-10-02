import { type FC } from 'react'
import { useIntl } from 'react-intl'

import { Disclosure } from '@/components/ui'
import { message } from '@/i18n/src/messages'

import { SystemDetailParameter } from '../system-detail-parameter.comp'

interface ItemPropertiesSectionProps {
  groupedProperties: any[]
  hasOverriddenProperties: boolean
  hasProperties: boolean
}

export const ItemPropertiesSection: FC<ItemPropertiesSectionProps> = ({
  groupedProperties,
  hasOverriddenProperties,
  hasProperties
}) => {
  const { formatMessage: fm } = useIntl()
  if (!hasProperties) return null

  return (
    <Disclosure
      title="Physical Item - Properties"
      defaultOpen={true}
      className="w-full border rounded-md overflow-hidden shadow-md"
      buttonClassName="bg-amber-100 dark:bg-amber-600 text-gray-900 dark:text-gray-100 hover:bg-amber-200 dark:hover:bg-amber-700 transition-colors"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      {hasOverriddenProperties && (
        <div className="mb-3 flex items-center">
          <span className="text-sm font-medium text-red-600 dark:text-red-400">
            {fm({ id: message.common.systemOverlay.originalCatalogParameter })}
          </span>
        </div>
      )}
      {groupedProperties.map((group: any) => (
        <div key={group.key} className="mb-4 last:mb-0">
          {group.name !== 'General' && (
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2 pb-1 border-b dark:border-gray-600">
              {group.name}
            </h4>
          )}
          <div className="grid grid-cols-1 gap-2 text-sm">
            {group.properties
              .sort((a: any, b: any) =>
                (a.name || '').localeCompare(b.name || '', 'cs', {
                  numeric: true,
                  sensitivity: 'base'
                })
              )
              .map((property: any) => {
                const displayValue =
                  property.serviceValue ?? property.value ?? 'N/A'
                const isOverridden = property.isOverridden

                return (
                  <SystemDetailParameter
                    key={property.uid}
                    title={property.name}
                    value={displayValue}
                    className={
                      isOverridden
                        ? 'text-red-600 dark:text-red-400 font-medium'
                        : undefined
                    }
                    unit={property.unit}
                    additionalInfo={
                      isOverridden && property.value
                        ? `Original: ${property.value}${property.unit ? ` [${property.unit}]` : ''}`
                        : undefined
                    }
                  />
                )
              })}
          </div>
        </div>
      ))}
    </Disclosure>
  )
}
