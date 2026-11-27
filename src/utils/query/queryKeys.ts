export const SYSTEM_DETAIL_QUERY_KEY = 'systemDetail'
export const RELATIONSHIP_GRAPH_QUERY_KEY = 'relationshipGraph'

// Systems family — shared between the explorer (systemHierarchy), the Edit System
// sheet and the overview tables, so a mutation in one surface refreshes the others.
export const SYSTEM_SPARE_PARTS_QUERY_KEY = 'systemSpareParts'
export const SYSTEM_SUBSYSTEMS_QUERY_KEY = 'systemSubsystemsDirect'
export const SYSTEM_HISTORY_QUERY_KEY = 'history'
export const PHYSICAL_ITEM_PROPERTIES_QUERY_KEY = 'physicalItemCatalogueProperties'
export const PHYSICAL_ITEM_ORDERS_QUERY_KEY = 'physicalItemOrders'
export const HIERARCHY_QUERY_KEY = 'systemsHierarchy'
export const LEAVES_QUERY_KEY = 'systemLeaves'
export const LEAVES_COUNT_QUERY_KEY = 'systemLeavesCount'
// Overview tables: `useSystems` keys by table id, control systems by endpoint name.
export const SYSTEMS_TABLE_QUERY_KEY = 'systems'
export const SYSTEM_CODES_QUERY_KEY = 'systemCodes'
