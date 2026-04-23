export const HIERARCHY_QUERY_KEY = 'systemsHierarchy'
export const LEAVES_QUERY_KEY = 'systemLeaves'
export const LEAVES_COUNT_QUERY_KEY = 'systemLeavesCount'
export const LEAVES_TABLE_ID = 'systemLeaves'
export const SYSTEM_DETAIL_QUERY_KEY = 'systemDetail'
export const RELATIONSHIP_GRAPH_QUERY_KEY = 'relationshipGraph'
export const RELATIONSHIP_GRAPH_INITIAL_LIMIT = 20
export const RELATIONSHIP_GRAPH_LOAD_MORE_LIMIT = 10

export const HIERARCHY_VIEWS = {
    TREE: 'tree',
    GRAPH: 'graph',
} as const

export type HierarchyView = (typeof HIERARCHY_VIEWS)[keyof typeof HIERARCHY_VIEWS]

export const HIERARCHY_TABS = {
    DETAIL: 'detail',
    PERSONS: 'persons',
    PHYSICAL_ITEM: 'physical-item',
    SPARE_PARTS: 'spare-parts',
    SPARE_FOR: 'spare-for',
    RELATIONSHIPS: 'relationships',
    ATTACHMENTS: 'attachments',
    HISTORY: 'history',
} as const

export type HierarchyTab = (typeof HIERARCHY_TABS)[keyof typeof HIERARCHY_TABS]
