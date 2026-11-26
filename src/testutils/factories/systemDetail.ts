import type { SystemDetail } from '@/modules/shared/system/system-detail'

let uidCounter = 0
const nextUid = (prefix: string) => `${prefix}-${++uidCounter}`

/** Complete REST `SystemDetail` with empty relations — override what the test needs. */
export const makeSystemDetail = (overrides: Partial<SystemDetail> = {}): SystemDetail => ({
    uid: overrides.uid ?? nextUid('sys'),
    name: 'System',
    description: null,
    systemCode: null,
    systemAlias: null,
    systemLevel: null,
    lastUpdateTime: '2026-11-26T10:00:00.000+01:00',
    parentUid: null,
    parentPath: [],
    systemType: null,
    location: null,
    zone: null,
    importance: null,
    attribute: null,
    responsible: null,
    responsibleTeam: null,
    owner: null,
    operators: [],
    maintainedBy: [],
    miniImageUrl: null,
    minimalSpareParstCount: null,
    sparePartsCoverageSum: null,
    sp_coverage: null,
    physicalItem: null,
    statistics: {
        subsystemsCount: 0,
        directSubsystemsCount: 0,
        sparePartsCount: 0,
        sparesForCount: 0,
        minimalSpareParstCount: null,
        sparePartsCoverageSum: null,
        sp_coverage: null,
    },
    ...overrides,
})
