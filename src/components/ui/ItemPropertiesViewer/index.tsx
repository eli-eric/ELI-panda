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

import { Settings } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Disclosure } from '@/components/ui/Disclosure'
import { Separator } from '@/components/ui/separator'
import type { ServiceItemData } from '@/hooks/useItemPropertiesData'
import { useItemPropertiesData } from '@/hooks/useItemPropertiesData'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
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
  const { formatMessage: fm } = useIntl()
  const { groupedProperties, hasOverriddenProperties, hasProperties } =
    useItemPropertiesData({
      catalogueItem,
      serviceItems
    })

  if (!hasProperties) {
    return null
  }

  const title = (
    <div className="flex items-center gap-2">
      <Settings className="h-4 w-4 text-muted-foreground" />
      <span>{fm({ id: message.common.ui.catalogueProperties })}</span>
      {hasOverriddenProperties && (
        <Badge
          variant="destructive"
          className="text-[10px] px-1.5 py-0.5 h-auto"
        >
          {fm({ id: message.common.ui.modified })}
        </Badge>
      )}
    </div>
  )

  return (
    <Disclosure
      title={title}
      defaultOpen={true}
      className="w-full border rounded-lg"
      buttonClassName="p-2 text-sm font-semibold"
      panelClassName="p-2 space-y-2 shadow-md rounded-lg"
    >
      {groupedProperties.map((group, groupIndex) => (
        <div key={group.key}>
          {group.name !== 'General' && (
            <div className="mb-1.5">
              <h4 className="text-xs font-semibold text-foreground mb-1">
                {group.name}
              </h4>
              <Separator />
            </div>
          )}
          <div className="flex flex-wrap gap-1">
            {group.properties.map(property => {
              const getValue = (value: any) => {
                if (value === null || value === undefined || value === '') {
                  return 'N/A'
                }
                return value
              }

              // Check both serviceValue and value for empty values before fallback
              const rawValue = property.serviceValue || property.value
              const displayValue = getValue(rawValue)
              const isOverridden = property.isOverridden

              return (
                <div
                  key={property.uid}
                  className={cn(
                    'flex-shrink-0 p-1.5 rounded border transition-colors min-w-[120px] max-w-[200px]',
                    isOverridden
                      ? 'border-destructive/20 bg-destructive/5'
                      : 'border-border bg-muted/20'
                  )}
                  title={`${property.name}: ${displayValue}${property.unit ? ` (${property.unit})` : ''}`}
                >
                  <div className="flex items-start justify-between gap-0.5 mb-1">
                    <span className="text-[10px] font-medium text-foreground leading-tight whitespace-nowrap truncate flex-1">
                      {property.name}
                    </span>
                    {isOverridden && (
                      <Badge
                        variant="destructive"
                        className="text-[8px] px-0.5 py-0 h-3 leading-none flex-shrink-0"
                      >
                        {fm({ id: message.common.ui.modifiedShort })}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <div
                      className={cn(
                        'text-[10px] font-medium leading-tight line-clamp-2',
                        isOverridden ? 'text-destructive' : 'text-foreground'
                      )}
                    >
                      {displayValue}
                      {property.unit && (
                        <span className="text-muted-foreground font-normal ml-0.5 text-[9px]">
                          ({property.unit})
                        </span>
                      )}
                    </div>

                    {isOverridden && property.value && (
                      <div className="text-[9px] text-muted-foreground leading-tight line-clamp-1">
                        <span className="line-through">
                          {property.value}
                          {property.unit && ` (${property.unit})`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          {groupIndex < groupedProperties.length - 1 && (
            <Separator className="mt-2" />
          )}
        </div>
      ))}
    </Disclosure>
  )
}

export default ItemPropertiesViewer
