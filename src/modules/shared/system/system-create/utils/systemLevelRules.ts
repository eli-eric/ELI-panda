import { SystemLevel } from '@/types/constants/systemLevel'

const ALLOWED_CHILDREN: Record<SystemLevel, SystemLevel[]> = {
    [SystemLevel.SystemDomain]: [SystemLevel.TechnologyUnit],
    [SystemLevel.TechnologyUnit]: [
        SystemLevel.TechnologyUnit,
        SystemLevel.KeySystems,
        SystemLevel.Trash,
    ],
    [SystemLevel.KeySystems]: [
        SystemLevel.KeySystems,
        SystemLevel.SubsystemsAndParts,
        SystemLevel.Trash,
    ],
    [SystemLevel.SubsystemsAndParts]: [SystemLevel.SubsystemsAndParts, SystemLevel.Trash],
    [SystemLevel.Trash]: [],
}

export const getAllowedChildSystemLevels = (parent: SystemLevel): SystemLevel[] =>
    ALLOWED_CHILDREN[parent] ?? []

export const canCreateUnder = (parent: SystemLevel): boolean =>
    getAllowedChildSystemLevels(parent).length > 0

// A root system has no parent to constrain it (the API accepts any level); Trash is
// only ever a child.
const ROOT_LEVELS: SystemLevel[] = [
    SystemLevel.SystemDomain,
    SystemLevel.TechnologyUnit,
    SystemLevel.KeySystems,
    SystemLevel.SubsystemsAndParts,
]

/** Levels a new system may take: under `parentLevel`, or any non-Trash level for a root. */
export const getAllowedCreateLevels = (parentLevel?: SystemLevel | null): SystemLevel[] =>
    parentLevel ? getAllowedChildSystemLevels(parentLevel) : ROOT_LEVELS
