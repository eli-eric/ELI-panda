export const CATALOGUE_CATEGORIES_QUERY_KEY = 'catalogueCategoriesTree'
export const CATALOGUE_ITEM_DETAIL_QUERY_KEY = 'catalogueItemDetail'
export const CATALOGUE_CATEGORY_DETAIL_QUERY_KEY = 'catalogueCategoryDetail'
export const CATALOGUE_ITEM_HISTORY_QUERY_KEY = 'catalogueItemHistory'
export const CATALOGUE_ITEMS_TABLE_ID = 'catalogueItemsExplorer'

export const CATALOGUE_VIEWS = {
    TABLE: 'table',
    CATEGORY_DETAIL: 'categoryDetail',
} as const

export type CatalogueView = (typeof CATALOGUE_VIEWS)[keyof typeof CATALOGUE_VIEWS]

export const CATALOGUE_ITEM_TABS = {
    DETAIL: 'detail',
    PARAMETERS: 'parameters',
    RELATED_ITEMS: 'related-items',
    ORDERS: 'orders',
    STATISTICS: 'statistics',
    ATTACHMENTS: 'attachments',
    HISTORY: 'history',
} as const

export type CatalogueItemTab = (typeof CATALOGUE_ITEM_TABS)[keyof typeof CATALOGUE_ITEM_TABS]

export const CATALOGUE_CATEGORY_TABS = {
    DETAIL: 'detail',
    PROPERTY_GROUPS: 'property-groups',
    PHYSICAL_ITEM_PROPERTIES: 'physical-item-properties',
    HISTORY: 'history',
} as const

export type CatalogueCategoryTab =
    (typeof CATALOGUE_CATEGORY_TABS)[keyof typeof CATALOGUE_CATEGORY_TABS]
