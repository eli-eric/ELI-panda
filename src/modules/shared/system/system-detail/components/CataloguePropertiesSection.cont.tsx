import type { FC } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import { usePhysicalItemCatalogueProperties } from '../hooks/queries/usePhysicalItemCatalogueProperties'
import { CataloguePropertiesList } from './CataloguePropertiesList.comp'

interface CataloguePropertiesSectionProps {
    physicalItemUid: string
    variant?: 'tab' | 'sidebar'
}

/** Fetches the server-resolved properties; renders nothing when the item has none. */
export const CataloguePropertiesSection: FC<CataloguePropertiesSectionProps> = ({
    physicalItemUid,
    variant,
}) => {
    const { groups, hasProperties, hasOverriddenProperties, isLoading } =
        usePhysicalItemCatalogueProperties(physicalItemUid)

    if (isLoading) return <Skeleton className="h-16 w-full" />
    if (!hasProperties) return null

    return (
        <CataloguePropertiesList
            groups={groups}
            hasOverriddenProperties={hasOverriddenProperties}
            variant={variant}
        />
    )
}
