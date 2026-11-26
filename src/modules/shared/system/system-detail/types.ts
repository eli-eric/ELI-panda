import type { SystemLevel } from '@/types/constants/systemLevel'

// REST contract for the systems detail family (`/system/:uid…`, `/physical-item/:uid…`).
// Mirrors eli-panda-api models — keep the two in sync.

export interface Codebook {
    uid: string
    name: string
    code?: string | null
}

export interface EmployeeRef {
    uid: string
    name: string
}

export interface UidRef {
    uid: string
}

export interface ParentPathEntry {
    uid: string
    name: string
    systemLevel?: SystemLevel | null
}

export interface SystemDetailCatalogueItem {
    uid: string
    name: string
    catalogueNumber: string | null
    category: Codebook | null
    supplier: Codebook | null
}

export interface SystemDetailPhysicalItem {
    uid: string
    name: string
    eun: string | null
    serialNumber: string | null
    notes: string | null
    price: number | null
    currency: string | null
    printEUN: boolean | null
    itemUsage: Codebook | null
    conditionStatus: Codebook | null
    catalogueItem: SystemDetailCatalogueItem | null
}

export interface SystemDetailStatistics {
    subsystemsCount: number
    directSubsystemsCount: number
    sparePartsCount: number
    sparesForCount: number
    minimalSpareParstCount: number | null
    sparePartsCoverageSum: number | null
    sp_coverage: number | null
}

export interface SystemDetail {
    uid: string
    name: string
    description: string | null
    systemCode: string | null
    systemAlias: string | null
    systemLevel: SystemLevel | null
    lastUpdateTime: string | null
    parentUid: string | null
    parentPath: ParentPathEntry[]
    systemType: Codebook | null
    location: Codebook | null
    zone: Codebook | null
    importance: Codebook | null
    attribute: Codebook | null
    responsible: EmployeeRef | null
    responsibleTeam: Codebook | null
    owner: EmployeeRef | null
    operators: EmployeeRef[]
    maintainedBy: EmployeeRef[]
    miniImageUrl: string[] | null
    minimalSpareParstCount: number | null
    sparePartsCoverageSum: number | null
    sp_coverage: number | null
    physicalItem: SystemDetailPhysicalItem | null
    statistics: SystemDetailStatistics
}

// PATCH semantics: absent key = unchanged, explicit null = clear.
export interface SystemPatchFields {
    name?: string
    description?: string | null
    systemCode?: string | null
    systemAlias?: string | null
    systemLevel?: SystemLevel | null
    systemType?: UidRef | null
    location?: UidRef | null
    zone?: UidRef | null
    importance?: UidRef | null
    attribute?: UidRef | null
    responsible?: UidRef | null
    responsibleTeam?: UidRef | null
    owner?: UidRef | null
    operators?: UidRef[]
    maintainedBy?: UidRef[]
    minimalSpareParstCount?: number | null
}

export interface PhysicalItemPatchFields {
    serialNumber?: string | null
    notes?: string | null
    itemUsage?: UidRef | null
    conditionStatus?: UidRef | null
}

export type WithConcurrencyToken<T> = T & { lastUpdateTime?: string | null }

// POST /systems — PATCH field shapes; absent responsible/location/zone are inherited from the parent.
export interface CreateSystemBody extends SystemPatchFields {
    parentUid?: string
    name: string
    systemLevel: SystemLevel
}

export interface CreateSubsystemBody {
    name: string
    systemLevel: SystemLevel
}

export interface SpareSystemRef {
    uid: string
    name: string
    systemCode: string | null
    systemLevel: SystemLevel | null
    parentPath: { uid: string; name: string }[]
    location: Codebook | null
    physicalItem: {
        uid: string
        eun: string | null
        itemUsage: Codebook | null
        catalogueItem: { uid: string; catalogueNumber: string | null } | null
    } | null
}

export interface SpareRelation {
    coverage: number | null
    system: SpareSystemRef
}

export interface SystemSpareParts {
    minimalSpareParstCount: number | null
    sparePartsCoverageSum: number | null
    sp_coverage: number | null
    spareParts: SpareRelation[]
    spareFor: SpareRelation[]
}

export interface CatalogueProperty {
    uid: string
    name: string
    type: string
    unit: string | null
    // null for service-only properties (no catalogue value)
    value: string | null
    serviceValue: string | null
    isOverridden: boolean
}

export interface CataloguePropertyGroup {
    key: string
    name: string
    properties: CatalogueProperty[]
}

export interface PhysicalItemCatalogueProperties {
    groups: CataloguePropertyGroup[]
    hasOverriddenProperties: boolean
}

export interface OrderRef {
    uid: string
    name: string
    orderDate: string | null
}

export interface PhysicalItemOrders {
    order: (OrderRef & { isDelivered: boolean | null }) | null
    serviceItems: {
        uid: string
        name: string
        isDelivered: boolean
        created: string | null
        order: OrderRef | null
    }[]
}

// Direct children, as returned by GET /system/:uid/subsystems (legacy System model).
export interface SubsystemRow {
    uid: string
    name: string
    systemCode?: string | null
    systemLevel?: SystemLevel | null
    location?: Codebook | null
    physicalItem?: {
        uid: string
        eun?: string | null
        serialNumber?: string | null
        itemUsage?: Codebook | null
        catalogueItem?: { name?: string | null; catalogueNumber?: string | null } | null
    } | null
}

export const SYSTEM_CONFLICT_CODE = {
    STALE: 'STALE',
    DUPLICATE_SYSTEM_CODE: 'DUPLICATE_SYSTEM_CODE',
} as const

export type SystemConflictCode = (typeof SYSTEM_CONFLICT_CODE)[keyof typeof SYSTEM_CONFLICT_CODE]

// Removable engineering edges (HAS_SUBSYSTEM is structural and never deleted this way).
export const REMOVABLE_RELATIONSHIP_TYPES = [
    'IS_SPARE_FOR',
    'IS_COOLED_FROM',
    'IS_POWERED_FROM',
    'IS_CONTROLLED_BY',
    'IS_INTERLOCKED_BY',
    'PROVIDES_DATA_TO',
    'DIRECTS_BEAM_TO',
    'PROVIDES_VACUUM_FOR',
] as const

export type RemovableRelationshipType = (typeof REMOVABLE_RELATIONSHIP_TYPES)[number]
