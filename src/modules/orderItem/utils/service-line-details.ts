import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'

import type { ServiceLineDetails } from '../types/form'

export const detailsToObject = (
    details: ServiceLineDetails | undefined,
): Record<string, CatalogueItemDetail> => {
    if (!details) return {}
    if (Array.isArray(details)) {
        return details.reduce<Record<string, CatalogueItemDetail>>((acc, detail) => {
            if (detail?.property?.uid) acc[detail.property.uid] = detail
            return acc
        }, {})
    }
    return details
}

export const detailsToArray = (
    details: ServiceLineDetails | undefined,
): CatalogueItemDetail[] => {
    if (!details) return []
    if (Array.isArray(details)) return details
    return Object.values(details)
}
