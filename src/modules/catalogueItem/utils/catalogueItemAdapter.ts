import type { CatalogueItem as CatalogueItemUI } from '@/types/responses/catalogue'

import type { CatalogueItem as CatalogueItemAPI } from '../types/responses'

/**
 * Maps API CatalogueItem type to UI CatalogueItem type
 * Handles differences between backend and frontend type definitions
 *
 * @param apiItem - Catalogue item from API
 * @returns Catalogue item compatible with UI components
 */
export const mapAPIItemToUIItem = (
  apiItem: CatalogueItemAPI
): CatalogueItemUI => {
  return {
    uid: apiItem.uid,
    name: apiItem.name,
    description: apiItem.description || '',
    category: apiItem.category || { uid: '', name: '' },
    supplier: apiItem.supplier || undefined,
    manufacturerUrl: apiItem.manufacturerUrl || '',
    catalogueNumber: apiItem.catalogueNumber,
    miniImageUrl: undefined, // API doesn't provide this on create
    lastUpdateTime: apiItem.lastUpdateTime,
    lastUpdateBy: 'system', // API doesn't provide this on create
    details: apiItem.details
  }
}

/**
 * Maps UI CatalogueItem type to API CatalogueItem type
 * Used when preparing data for API submission
 *
 * @param uiItem - Catalogue item from UI
 * @returns Catalogue item compatible with API
 */
export const mapUIItemToAPIItem = (
  uiItem: CatalogueItemUI
): CatalogueItemAPI => {
  return {
    uid: uiItem.uid,
    catalogueNumber: uiItem.catalogueNumber,
    name: uiItem.name,
    description: uiItem.description || undefined,
    category: uiItem.category,
    supplier: uiItem.supplier,
    manufacturerUrl: uiItem.manufacturerUrl || undefined,
    details: uiItem.details,
    lastUpdateTime: uiItem.lastUpdateTime
  }
}
