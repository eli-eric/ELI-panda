import type { FC } from 'react'
import { useMemo } from 'react'

import { Disclosure } from '@/components/ui'
import type { FragmentType } from '@/types/gql'
import { useFragment } from '@/types/gql'
import {
  CatalogueItemFragment,
  ServiceItemFragment
} from '@/utils/graphql/fragments'

interface PropertyGroupItem {
  key: string
  name: string
  properties: Array<{
    uid: string
    name: string
    value: string | null
    unit?: string | null
    type: string
    serviceValue?: string | null
    isOverridden?: boolean
  }>
}

interface ItemPropertiesViewerProps {
  catalogueItem?: FragmentType<typeof CatalogueItemFragment> | null
  serviceItem?: FragmentType<typeof ServiceItemFragment> | null
}

// Helper function to safely parse range values
const formatRangeValue = (value: string | null | undefined): string => {
  if (!value) return 'N/A'

  try {
    const parsedValue = JSON.parse(value)
    const min = parsedValue?.min ?? 'N/A'
    const max = parsedValue?.max ?? 'N/A'
    return `${min} - ${max}`
  } catch (error) {
    return value || 'N/A'
  }
}

// Helper function to format property values based on type
const getFormattedValue = (
  value: string | null | undefined,
  typeName: string | null | undefined
): string => {
  if (typeName === 'Range') {
    return formatRangeValue(value)
  }

  return value || 'N/A'
}

export const ItemPropertiesViewer: FC<ItemPropertiesViewerProps> = ({
  catalogueItem: catalogueItemProp,
  serviceItem: serviceItemProp
}) => {
  // Always call hooks unconditionally, handle null cases later
  const catalogueItemFragment = useFragment(
    CatalogueItemFragment,
    catalogueItemProp || null
  )
  const serviceItemFragment = useFragment(
    ServiceItemFragment,
    serviceItemProp || null
  )

  // Memoizujeme properties, aby se nevytvářely nové reference při každém renderu
  const catalogueProperties = useMemo(() => {
    // Use type assertion to tell TypeScript this property exists
    return (catalogueItemFragment as any)?.propertiesConnection?.edges || []
  }, [catalogueItemFragment])

  const serviceProperties = useMemo(() => {
    // Use type assertion to tell TypeScript this property exists
    return (serviceItemFragment as any)?.detailsConnection?.edges || []
  }, [serviceItemFragment])

  // Check if there are any overridden properties
  const hasOverriddenProperties = useMemo(() => {
    if (!serviceProperties.length || !catalogueProperties.length) return false

    return serviceProperties.some(sEdge =>
      catalogueProperties.some(
        cEdge =>
          cEdge.node.uid === sEdge.node.uid && cEdge.value !== sEdge.value
      )
    )
  }, [serviceProperties, catalogueProperties])

  // Group properties by their group
  const groupedProperties = useMemo(() => {
    const propertyGroups: Record<string, PropertyGroupItem> = {}

    // Process catalogue properties
    catalogueProperties.forEach(edge => {
      const groups = edge.node.groups || []
      const typeName = edge.node.type?.name
      const formattedValue = getFormattedValue(edge.value, typeName)

      // Handle properties without a group
      if (groups.length === 0) {
        const noGroupKey = 'no-group'

        if (!propertyGroups[noGroupKey]) {
          propertyGroups[noGroupKey] = {
            key: noGroupKey,
            name: 'General',
            properties: []
          }
        }

        propertyGroups[noGroupKey].properties.push({
          uid: edge.node.uid,
          name: edge.node.name,
          value: formattedValue,
          unit: edge.node.unit?.name,
          type: typeName || 'Unknown'
        })

        return
      }

      // Handle properties with groups
      groups.forEach(group => {
        if (!propertyGroups[group.uid]) {
          propertyGroups[group.uid] = {
            key: group.uid,
            name: group.name,
            properties: []
          }
        }

        propertyGroups[group.uid].properties.push({
          uid: edge.node.uid,
          name: edge.node.name,
          value: formattedValue,
          unit: edge.node.unit?.name,
          type: typeName || 'Unknown'
        })
      })
    })

    // Process service properties and mark overrides
    serviceProperties.forEach(edge => {
      const typeName = edge.node.type?.name
      const serviceValue = getFormattedValue(edge.value, typeName)
      const groups = edge.node.groups || []

      // Check all groups, including properties without a group
      const allGroups = groups.length
        ? groups
        : [{ uid: 'no-group', name: 'General' }]

      allGroups.forEach(group => {
        if (!propertyGroups[group.uid]) {
          propertyGroups[group.uid] = {
            key: group.uid,
            name: group.name,
            properties: []
          }
        }

        // Find if this property already exists in the group (from catalogue)
        const existingProperty = propertyGroups[group.uid].properties.find(
          p => p.uid === edge.node.uid
        )

        if (existingProperty) {
          // Property exists, check if it's an override
          existingProperty.serviceValue = serviceValue
          existingProperty.isOverridden =
            existingProperty.value !== serviceValue
        } else {
          // Property doesn't exist from catalogue, add from service
          propertyGroups[group.uid].properties.push({
            uid: edge.node.uid,
            name: edge.node.name,
            value: null, // No catalogue value
            serviceValue: serviceValue,
            unit: edge.node.unit?.name,
            type: typeName || 'Unknown',
            isOverridden: false // Not an override since there's no original value
          })
        }
      })
    })

    // Convert the record to an array for rendering
    return Object.values(propertyGroups)
  }, [catalogueProperties, serviceProperties])

  if (
    (!catalogueProperties || catalogueProperties.length === 0) &&
    (!serviceProperties || serviceProperties.length === 0)
  ) {
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
            <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2 pb-1 border-b dark:border-slate-700">
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
