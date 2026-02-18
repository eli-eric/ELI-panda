const SYSTEM_LEVEL = {
    KEY_SYSTEMS: 'KEY_SYSTEMS',
    SUBSYSTEMS_AND_PARTS: 'SUBSYSTEMS_AND_PARTS',
    TECHNOLOGY_UNIT: 'TECHNOLOGY_UNIT',
} as const

const codebookRef = (uid: string, name: string, code?: string) => ({
    additionalData: null,
    code: code ?? null,
    name,
    uid,
})

const createSystemDetail = (params: {
    uid: string
    name: string
    systemCode: string
    systemLevel: string
    systemTypeName: string
    parentPath?: Array<{ name: string; uid: string }>
}) => ({
    attribute: null,
    description: `${params.name} detail description`,
    location: codebookRef('loc-a1', 'A1 Building', 'A1'),
    maintainedBy: [],
    name: params.name,
    operators: [],
    parentPath: params.parentPath ?? [],
    physicalItem: null,
    responsible: {
        fullName: 'Playwright Responsible',
        uid: 'employee-responsible',
    },
    responsibleTeam: codebookRef('team-maintenance', 'Maintenance Team', 'MT'),
    sparePartsConnection: {
        edges: [],
    },
    sparePartsFor: [],
    systemCode: params.systemCode,
    systemLevel: params.systemLevel,
    systemType: codebookRef('system-type-main', params.systemTypeName, 'MAIN'),
    uid: params.uid,
    zone: codebookRef('zone-alpha', 'Zone Alpha', 'ZA'),
})

const systemDetailsByUid = {
    'leaf-cooling-pump-a': createSystemDetail({
        name: 'Cooling Pump A',
        parentPath: [{ name: 'Beamline Root', uid: 'sys-root' }],
        systemCode: 'CL-001',
        systemLevel: SYSTEM_LEVEL.SUBSYSTEMS_AND_PARTS,
        systemTypeName: 'Cooling Module',
        uid: 'leaf-cooling-pump-a',
    }),
    'leaf-pressure-sensor-b': createSystemDetail({
        name: 'Pressure Sensor B',
        parentPath: [{ name: 'Beamline Root', uid: 'sys-root' }],
        systemCode: 'PS-002',
        systemLevel: SYSTEM_LEVEL.SUBSYSTEMS_AND_PARTS,
        systemTypeName: 'Sensor Module',
        uid: 'leaf-pressure-sensor-b',
    }),
    'sys-cooling': createSystemDetail({
        name: 'Cooling Branch',
        parentPath: [{ name: 'Beamline Root', uid: 'sys-root' }],
        systemCode: 'CB-010',
        systemLevel: SYSTEM_LEVEL.TECHNOLOGY_UNIT,
        systemTypeName: 'Cooling Unit',
        uid: 'sys-cooling',
    }),
    'sys-root': createSystemDetail({
        name: 'Beamline Root',
        parentPath: [],
        systemCode: 'BL-ROOT',
        systemLevel: SYSTEM_LEVEL.KEY_SYSTEMS,
        systemTypeName: 'Beamline',
        uid: 'sys-root',
    }),
    'sys-vacuum': createSystemDetail({
        name: 'Vacuum Branch',
        parentPath: [{ name: 'Beamline Root', uid: 'sys-root' }],
        systemCode: 'VB-020',
        systemLevel: SYSTEM_LEVEL.TECHNOLOGY_UNIT,
        systemTypeName: 'Vacuum Unit',
        uid: 'sys-vacuum',
    }),
}

export const SYSTEM_HIERARCHY_MOCKS = {
    historyByUid: {
        'leaf-cooling-pump-a': [
            {
                action: 'update',
                changedAt: '2025-01-20T12:34:00.000Z',
                changedBy: 'QA Engineer',
                detail: {
                    direction: 'IN',
                    systemName: 'Beamline Root',
                    systemUid: 'sys-root',
                },
                historyType: 'GENERAL',
                uid: 'history-1',
            },
        ],
        'leaf-pressure-sensor-b': [
            {
                action: 'create',
                changedAt: '2025-01-21T09:15:00.000Z',
                changedBy: 'Automation Bot',
                detail: {
                    direction: 'IN',
                    systemName: 'Beamline Root',
                    systemUid: 'sys-root',
                },
                historyType: 'GENERAL',
                uid: 'history-2',
            },
        ],
    },
    hierarchy: [
        {
            children: [
                {
                    children: [],
                    hasLeafChildren: true,
                    name: 'Cooling Branch',
                    systemCode: 'CB-010',
                    systemLevel: SYSTEM_LEVEL.TECHNOLOGY_UNIT,
                    uid: 'sys-cooling',
                },
                {
                    children: [],
                    hasLeafChildren: true,
                    name: 'Vacuum Branch',
                    systemCode: 'VB-020',
                    systemLevel: SYSTEM_LEVEL.TECHNOLOGY_UNIT,
                    uid: 'sys-vacuum',
                },
            ],
            hasLeafChildren: false,
            name: 'Beamline Root',
            systemCode: 'BL-ROOT',
            systemLevel: SYSTEM_LEVEL.KEY_SYSTEMS,
            uid: 'sys-root',
        },
    ],
    leavesByParentUid: {
        'sys-root': {
            data: [
                {
                    description: 'Primary cooling pump for test scenario',
                    location: codebookRef('loc-a1', 'A1 Building', 'A1'),
                    maintainedBy: [],
                    miniImageUrl: null,
                    name: 'Cooling Pump A',
                    operators: [],
                    owner: null,
                    parentPath: [{ name: 'Beamline Root', uid: 'sys-root' }],
                    physicalItem: null,
                    responsible: codebookRef(
                        'employee-responsible',
                        'Playwright Responsible',
                        'PR',
                    ),
                    responsibleTeam: codebookRef('team-maintenance', 'Maintenance Team', 'MT'),
                    sparesIn: 0,
                    sparesOut: 0,
                    systemAlias: null,
                    systemCode: 'CL-001',
                    systemLevel: SYSTEM_LEVEL.SUBSYSTEMS_AND_PARTS,
                    systemType: codebookRef('system-type-main', 'Cooling Module', 'CM'),
                    uid: 'leaf-cooling-pump-a',
                    zone: codebookRef('zone-alpha', 'Zone Alpha', 'ZA'),
                },
                {
                    description: 'Pressure sensor for backup line',
                    location: codebookRef('loc-a1', 'A1 Building', 'A1'),
                    maintainedBy: [],
                    miniImageUrl: null,
                    name: 'Pressure Sensor B',
                    operators: [],
                    owner: null,
                    parentPath: [{ name: 'Beamline Root', uid: 'sys-root' }],
                    physicalItem: null,
                    responsible: codebookRef(
                        'employee-responsible',
                        'Playwright Responsible',
                        'PR',
                    ),
                    responsibleTeam: codebookRef('team-maintenance', 'Maintenance Team', 'MT'),
                    sparesIn: 0,
                    sparesOut: 0,
                    systemAlias: null,
                    systemCode: 'PS-002',
                    systemLevel: SYSTEM_LEVEL.SUBSYSTEMS_AND_PARTS,
                    systemType: codebookRef('system-type-main', 'Sensor Module', 'SM'),
                    uid: 'leaf-pressure-sensor-b',
                    zone: codebookRef('zone-alpha', 'Zone Alpha', 'ZA'),
                },
            ],
            totalCount: 2,
        },
        'sys-vacuum': {
            data: [],
            totalCount: 0,
        },
    },
}

export const getSystemDetailByUid = (uid: string | null | undefined) => {
    if (!uid) return null
    return systemDetailsByUid[uid as keyof typeof systemDetailsByUid] ?? null
}
