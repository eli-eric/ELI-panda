import { SystemLevel } from '@/types/gql/graphql'

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
