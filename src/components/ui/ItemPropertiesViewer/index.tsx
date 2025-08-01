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

import { AlertTriangle, Settings } from 'lucide-react'
import type { FC } from 'react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Disclosure } from '@/components/ui/Disclosure'
import { Separator } from '@/components/ui/separator'
import type { ServiceItemData } from '@/hooks/useItemPropertiesData'
import { useItemPropertiesData } from '@/hooks/useItemPropertiesData'
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
      <span>Catalogue Properties</span>
      {hasOverriddenProperties && (
        <Badge
          variant="destructive"
          className="text-[10px] px-1.5 py-0.5 h-auto"
        >
          Modified
        </Badge>
      )}
    </div>
  )

  return (
    <Disclosure
      title={title}
      defaultOpen={false}
      className="w-full border rounded-lg"
      buttonClassName="p-3 text-base font-semibold"
      panelClassName="p-4 space-y-4 shadow-md rounded-lg"
    >
      {hasOverriddenProperties && (
        <Alert className="py-2 mb-4">
          <AlertTriangle className="h-3 w-3" />
          <AlertDescription className="text-xs">
            Some original catalog parameters have been modified by service
          </AlertDescription>
        </Alert>
      )}

      {groupedProperties.map((group, groupIndex) => (
        <div key={group.key}>
          {group.name !== 'General' && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-foreground mb-2">
                {group.name}
              </h4>
              <Separator />
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
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
                    'space-y-1 p-2 rounded border transition-colors',
                    isOverridden
                      ? 'border-destructive/20 bg-destructive/5'
                      : 'border-border bg-muted/20'
                  )}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-xs font-medium text-foreground leading-tight line-clamp-2">
                      {property.name}
                    </span>
                    {isOverridden && (
                      <Badge
                        variant="destructive"
                        className="text-[10px] px-1 py-0 h-auto leading-none"
                      >
                        M
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <div
                      className={cn(
                        'text-xs font-medium leading-tight',
                        isOverridden ? 'text-destructive' : 'text-foreground'
                      )}
                    >
                      {displayValue}
                      {property.unit && (
                        <span className="text-muted-foreground font-normal ml-1">
                          ({property.unit})
                        </span>
                      )}
                    </div>

                    {isOverridden && property.value && (
                      <div className="text-[10px] text-muted-foreground leading-tight">
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
            <Separator className="mt-4" />
          )}
        </div>
      ))}
    </Disclosure>
  )
}

export default ItemPropertiesViewer
