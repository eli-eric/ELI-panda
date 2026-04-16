import type { CatalogueCategoryProperty, CatalogueItem, CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import type { CodebookType } from '@/types/responses/codebook'

let uidCounter = 0
const nextUid = (prefix: string) => `${prefix}-${++uidCounter}`

export const makeCodebook = (overrides: Partial<CodebookType> = {}): CodebookType => ({
    uid: overrides.uid ?? nextUid('cb'),
    name: overrides.name ?? 'Codebook',
    ...overrides,
})

export const makeCategoryProperty = (
    overrides: Partial<CatalogueCategoryProperty> = {},
): CatalogueCategoryProperty => ({
    uid: overrides.uid ?? nextUid('prop'),
    name: overrides.name ?? 'Property',
    type: overrides.type ?? makeCodebook({ name: 'text' }),
    unit: overrides.unit,
    defaultValue: overrides.defaultValue,
    listOfValues: overrides.listOfValues,
})

export const makeCatalogueDetail = (
    overrides: Partial<CatalogueItemDetail> = {},
): CatalogueItemDetail => ({
    propertyGroup: overrides.propertyGroup ?? 'General',
    value: overrides.value ?? '',
    property: overrides.property ?? makeCategoryProperty(),
})

export const makeCatalogueItem = (overrides: Partial<CatalogueItem> = {}): CatalogueItem => ({
    uid: overrides.uid ?? nextUid('item'),
    catalogueNumber: overrides.catalogueNumber ?? 'CAT-001',
    name: overrides.name ?? 'Item',
    description: overrides.description,
    categoryPath: overrides.categoryPath,
    categoryName: overrides.categoryName,
    category: overrides.category ?? null,
    supplier: overrides.supplier,
    manufacturerUrl: overrides.manufacturerUrl,
    details: overrides.details,
    lastUpdateTime: overrides.lastUpdateTime ?? new Date().toISOString(),
})
