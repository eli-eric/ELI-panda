/**
 * Custom hook for processing item properties data from catalogue and service items.
 * Extracts the logic from ItemPropertiesViewer to allow flexible UI rendering.
 */

import { useMemo } from 'react'

import type { FragmentType } from '@/types/gql'
import { useFragment } from '@/types/gql'
import { CatalogueItemFragment } from '@/utils/graphql/fragments'

export interface PropertyItem {
    uid: string
    name: string
    value: string | null
    unit?: string | null
    type: string
    serviceValue?: string | null
    isOverridden?: boolean
}

export interface PropertyGroup {
    key: string
    name: string
    properties: PropertyItem[]
}

export interface ServiceItemData {
    __typename?: string
    created?: any
    node: {
        __typename?: string
        uid: string
        name: string
        isDelivered: boolean
        order?: {
            __typename?: string
            uid: string
            name: string
            orderDate?: any
        } | null
        detailsConnection: {
            __typename?: string
            edges?: Array<{
                __typename?: string
                value?: string | null
                node: {
                    __typename?: string
                    uid: string
                    name: string
                    groups: Array<{
                        __typename?: string
                        uid: string
                        name: string
                    }>
                    type?: {
                        __typename?: string
                        name: string
                        uid: string
                    } | null
                    unit?: {
                        __typename?: string
                        name: string
                        uid: string
                    } | null
                }
            }> | null
        }
    }
}

interface UseItemPropertiesDataProps {
    catalogueItem?: FragmentType<typeof CatalogueItemFragment>
    serviceItems?: ServiceItemData[]
}

interface UseItemPropertiesDataReturn {
    groupedProperties: PropertyGroup[]
    hasOverriddenProperties: boolean
    hasProperties: boolean
}

// Helper function to safely parse range values
const formatRangeValue = (value: string | null | undefined): string => {
    if (!value) return 'N/A - N/A'

    try {
        const parsedValue = JSON.parse(value)
        const min = parsedValue?.min ?? 'N/A'
        const max = parsedValue?.max ?? 'N/A'
        return `${min} - ${max}`
    } catch (error) {
        return value || 'N/A - N/A'
    }
}

// Helper function to format property values based on type
const getFormattedValue = (
    value: string | null | undefined,
    typeName: string | null | undefined,
): string => {
    if (typeName === 'Range') {
        return formatRangeValue(value)
    }

    return value || 'N/A'
}

export const useItemPropertiesData = ({
    catalogueItem: catalogueItemProp,
    serviceItems: serviceItemsProp,
}: UseItemPropertiesDataProps): UseItemPropertiesDataReturn => {
    // Always call hooks unconditionally, handle null cases later
    const catalogueItemFragment = useFragment(CatalogueItemFragment, catalogueItemProp || null)

    // Get the actual data or empty arrays if null
    const catalogueItem = catalogueItemProp ? catalogueItemFragment : null
    const serviceItems = useMemo(() => serviceItemsProp || [], [serviceItemsProp])

    // Sort service items by creation date (newest first)
    const sortedServiceItems = useMemo(() => {
        return [...serviceItems].sort((a, b) => {
            const dateA = a.created ? new Date(a.created).getTime() : 0
            const dateB = b.created ? new Date(b.created).getTime() : 0
            return dateB - dateA
        })
    }, [serviceItems])

    // Memoize properties to avoid creating new references on each render
    const catalogueProperties = useMemo(
        () => catalogueItem?.propertiesConnection?.edges || [],
        [catalogueItem?.propertiesConnection?.edges],
    )

    // Collect all service item properties
    const allServiceProperties = useMemo(() => {
        // Create a map to track the latest value for each property by uid
        const latestPropertyValues = new Map()

        // Iterate through service items (already sorted by newest first)
        sortedServiceItems.forEach(edge => {
            const serviceItem = edge.node
            const serviceItemProperties = serviceItem.detailsConnection?.edges || []

            // Process each property from this service item
            serviceItemProperties.forEach(prop => {
                // Only add if we haven't seen this property yet (first occurrence is newest)
                if (!latestPropertyValues.has(prop.node.uid)) {
                    latestPropertyValues.set(prop.node.uid, prop)
                }
            })
        })

        // Convert the map values to an array
        return Array.from(latestPropertyValues.values())
    }, [sortedServiceItems])

    // Group properties by their group
    const groupedProperties = useMemo(() => {
        const propertyGroups: Record<string, PropertyGroup> = {}

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
                        properties: [],
                    }
                }

                propertyGroups[noGroupKey].properties.push({
                    uid: edge.node.uid,
                    name: edge.node.name,
                    value: formattedValue,
                    unit: edge.node.unit?.name,
                    type: typeName || 'Unknown',
                })

                return
            }

            // Handle properties with groups
            groups.forEach(group => {
                if (!propertyGroups[group.uid]) {
                    propertyGroups[group.uid] = {
                        key: group.uid,
                        name: group.name,
                        properties: [],
                    }
                }

                propertyGroups[group.uid].properties.push({
                    uid: edge.node.uid,
                    name: edge.node.name,
                    value: formattedValue,
                    unit: edge.node.unit?.name,
                    type: typeName || 'Unknown',
                })
            })
        })

        // Process service properties and mark overrides
        allServiceProperties.forEach(edge => {
            const typeName = edge.node.type?.name
            const serviceValue = getFormattedValue(edge.value, typeName)
            const groups = edge.node.groups || []

            // Check all groups, including properties without a group
            const allGroups = groups.length ? groups : [{ uid: 'no-group', name: 'General' }]

            allGroups.forEach(group => {
                if (!propertyGroups[group.uid]) {
                    propertyGroups[group.uid] = {
                        key: group.uid,
                        name: group.name,
                        properties: [],
                    }
                }

                // Find if this property already exists in the group (from catalogue)
                const existingProperty = propertyGroups[group.uid].properties.find(
                    p => p.uid === edge.node.uid,
                )

                if (existingProperty) {
                    // Property exists, check if it's an override
                    existingProperty.serviceValue = serviceValue
                    existingProperty.isOverridden = existingProperty.value !== serviceValue
                } else {
                    // Property doesn't exist from catalogue, add from service
                    propertyGroups[group.uid].properties.push({
                        uid: edge.node.uid,
                        name: edge.node.name,
                        value: null, // No catalogue value
                        serviceValue: serviceValue,
                        unit: edge.node.unit?.name,
                        type: typeName || 'Unknown',
                        isOverridden: false, // Not an override since there's no original value
                    })
                }
            })
        })

        // Convert the record to an array for rendering
        return Object.values(propertyGroups)
    }, [catalogueProperties, allServiceProperties])

    // Check if there are any overridden properties
    const hasOverriddenProperties = useMemo(() => {
        return groupedProperties.some(group => group.properties.some(prop => prop.isOverridden))
    }, [groupedProperties])

    // Check if there are any properties at all
    const hasProperties = useMemo(() => {
        return (
            (catalogueProperties && catalogueProperties.length > 0) ||
            (allServiceProperties && allServiceProperties.length > 0)
        )
    }, [catalogueProperties, allServiceProperties])

    return {
        groupedProperties,
        hasOverriddenProperties,
        hasProperties,
    }
}
