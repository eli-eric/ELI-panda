export const HIERARCHY_QUERY_KEY = 'systemsHierarchy'
export const LEAVES_QUERY_KEY = 'systemLeaves'
export const LEAVES_TABLE_ID = 'systemLeaves'
export const SYSTEM_DETAIL_QUERY_KEY = 'systemDetail'

export const HIERARCHY_TABS = {
    DETAIL: 'detail',
    PERSONS: 'persons',
    PHYSICAL_ITEM: 'physical-item',
    SPARE_PARTS: 'spare-parts',
    SPARE_FOR: 'spare-for',
    ATTACHMENTS: 'attachments',
    HISTORY: 'history',
} as const

export type HierarchyTab = (typeof HIERARCHY_TABS)[keyof typeof HIERARCHY_TABS]
