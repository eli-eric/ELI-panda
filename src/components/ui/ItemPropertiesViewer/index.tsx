/**
 * IMPORTANT NOTE ABOUT SERVICE ITEMS:
 *
 * This component currently supports a single service item via the serviceItem prop.
 *
 * Enhancement to support multiple service items sorted by creation date:
 * 1. Update the PhysicalItemFragment to use the serviceItemsConnection with the 'created' timestamp on edges
 * 2. Update this component to accept an array of service items via a serviceItems prop
 * 3. Sort the service items by 'created' date and process properties giving priority to recent items
 * 4. Run 'yarn generate' to update the GraphQL types
 *
 * The schema changes were already made (isServicedBy relationship with created property), but
 * the front-end types need to be regenerated to reflect these changes.
 */

import type { FC } from 'react'

import { Disclosure } from '@/components/ui'
import type { ServiceItemData } from '@/hooks/useItemPropertiesData'
import { useItemPropertiesData } from '@/hooks/useItemPropertiesData'
import type { FragmentType } from '@/types/gql'
import type { CatalogueItemFragment } from '@/utils/graphql/fragments'

// Update the interface to accept the data structure we're receiving
interface ItemPropertiesViewerProps {
  catalogueItem?: FragmentType<typeof CatalogueItemFragment>
  serviceItems?: ServiceItemData[]
}

export const ItemPropertiesViewer: FC<ItemPropertiesViewerProps> = ({
  catalogueItem,
  serviceItems
}) => {
  const { groupedProperties, hasOverriddenProperties, hasProperties } =
    useItemPropertiesData({
      catalogueItem,
      serviceItems
    })

  if (!hasProperties) {
    return null
  }

  return (
    <Disclosure
      title="Catalogue Properties"
      defaultOpen={true}
      className="w-full border rounded-md dark:border-slate-700 bg-white dark:bg-slate-900"
      buttonClassName="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
      panelClassName="px-4 py-4 border-t dark:border-slate-700"
      transparentButton={true}
    >
      {hasOverriddenProperties && (
        <div className="mb-3 flex items-center">
          <span className="text-sm font-medium text-red-600 dark:text-red-400">
            *Original catalog parameter modified by Service
          </span>
        </div>
      )}
      {groupedProperties.map(group => (
        <div key={group.key} className="mb-4 last:mb-0">
          {group.name !== 'General' && (
            <h4 className="text-sm font-medium text-slate-900 text-center dark:text-slate-100 mb-2 pb-1 border-b dark:border-slate-700">
              {group.name}
            </h4>
          )}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {group.properties.map(property => {
              const displayValue =
                property.serviceValue ?? property.value ?? 'N/A'
              const isOverridden = property.isOverridden

              return (
                <li key={property.uid} className="flex flex-col space-y-1">
                  <span className="font-medium text-sm text-slate-700 dark:text-slate-300">
                    {property.name}
                  </span>
                  <span
                    className={`text-sm ${
                      isOverridden
                        ? 'text-red-600 dark:text-red-400 font-medium'
                        : 'text-slate-900 dark:text-slate-200'
                    }`}
                  >
                    {displayValue} {property.unit && `(${property.unit})`}
                  </span>
                  {isOverridden && property.value && (
                    <span className="text-xs text-slate-500 dark:text-slate-400 line-through">
                      Original: {property.value}{' '}
                      {property.unit && `(${property.unit})`}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </Disclosure>
  )
}

export default ItemPropertiesViewer
