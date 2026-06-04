import type { FC } from 'react'

import { Separator } from '@/components/ui/separator'
import { useItemPropertiesData } from '@/hooks/useItemPropertiesData'

import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { PhysicalItemProperties } from './PhysicalItemProperties.comp'

interface PhysicalItemPropertiesSidebarProps {
    systemUid: string
}

// Sidebar variant of the catalogue properties: shows ALL properties (grouped), with the
// service-override markers preserved. Reads the already-cached detail query for the
// catalogue/service-item fragments that SystemLeaf drops.
export const PhysicalItemPropertiesSidebar: FC<PhysicalItemPropertiesSidebarProps> = ({
    systemUid,
}) => {
    const { physicalItem } = useSystemDetail(systemUid)

    const { groupedProperties, hasOverriddenProperties, hasProperties } = useItemPropertiesData({
        catalogueItem: physicalItem?.catalogueItem,
        serviceItems: physicalItem?.serviceItemsConnection?.edges,
    })

    if (!hasProperties) return null

    return (
        <>
            <Separator />
            <PhysicalItemProperties
                groupedProperties={groupedProperties}
                hasOverriddenProperties={hasOverriddenProperties}
                variant="sidebar"
            />
        </>
    )
}
