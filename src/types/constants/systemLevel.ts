// REST-side system level. A const object + literal union (not a TS enum) so values
// coming from the remaining GraphQL-typed code (generated `SystemLevel` enum) stay
// assignable to it during the migration.
export const SystemLevel = {
    KeySystems: 'KEY_SYSTEMS',
    SubsystemsAndParts: 'SUBSYSTEMS_AND_PARTS',
    SystemDomain: 'SYSTEM_DOMAIN',
    TechnologyUnit: 'TECHNOLOGY_UNIT',
    Trash: 'TRASH',
} as const

export type SystemLevel = (typeof SystemLevel)[keyof typeof SystemLevel]

export const SYSTEM_LEVELS: readonly SystemLevel[] = Object.values(SystemLevel)

export const isSystemLevel = (value: unknown): value is SystemLevel =>
    typeof value === 'string' && (SYSTEM_LEVELS as readonly string[]).includes(value)
