export {
    HIERARCHY_QUERY_KEY,
    LEAVES_COUNT_QUERY_KEY,
    LEAVES_QUERY_KEY,
    RELATIONSHIP_GRAPH_QUERY_KEY,
    SYSTEM_DETAIL_QUERY_KEY,
} from '@/utils/query/queryKeys'

export const LEAVES_TABLE_ID = 'systemLeaves'
export const RELATIONSHIP_GRAPH_INITIAL_LIMIT = 20
export const RELATIONSHIP_GRAPH_LOAD_MORE_LIMIT = 10

export const HIERARCHY_TABS = {
    DETAIL: 'detail',
    PERSONS: 'persons',
    PHYSICAL_ITEM: 'physical-item',
    SPARE_PARTS: 'spare-parts',
    SPARE_FOR: 'spare-for',
    RELATIONSHIPS: 'relationships',
    ATTACHMENTS: 'attachments',
    HISTORY: 'history',
    GRAPH: 'graph',
} as const

export type HierarchyTab = (typeof HIERARCHY_TABS)[keyof typeof HIERARCHY_TABS]

export const isHierarchyTab = (value: unknown): value is HierarchyTab =>
    (Object.values(HIERARCHY_TABS) as unknown[]).includes(value)
