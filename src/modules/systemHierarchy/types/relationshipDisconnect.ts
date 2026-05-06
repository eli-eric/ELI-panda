import type { SystemDisconnectInput } from '@/types/gql/graphql'

export type DisconnectField = keyof SystemDisconnectInput

const DISCONNECT_FIELD_MAP: Record<
    string,
    { inbound: DisconnectField; outbound: DisconnectField } | undefined
> = {
    IS_SPARE_FOR: { inbound: 'spareParts', outbound: 'sparePartsFor' },
    IS_COOLED_FROM: { inbound: 'cools', outbound: 'cooledFrom' },
    IS_POWERED_FROM: { inbound: 'powers', outbound: 'poweredFrom' },
    IS_CONTROLLED_BY: { inbound: 'controls', outbound: 'controlledBy' },
    IS_INTERLOCKED_BY: { inbound: 'interlocks', outbound: 'interlockedBy' },
    PROVIDES_DATA_TO: { inbound: 'receivesDataFrom', outbound: 'providesDataTo' },
    DIRECTS_BEAM_TO: { inbound: 'receivesBeamFrom', outbound: 'directsBeamTo' },
    PROVIDES_VACUUM_FOR: { inbound: 'receivesVacuumFrom', outbound: 'providesVacuumFor' },
}

export const getDisconnectField = (
    relationshipType: string,
    direction: 'inbound' | 'outbound',
): DisconnectField | undefined => DISCONNECT_FIELD_MAP[relationshipType]?.[direction]

const SPARE_FIELDS: ReadonlySet<DisconnectField> = new Set<DisconnectField>([
    'spareParts',
    'sparePartsFor',
])

export const isSpareDisconnect = (field: DisconnectField): boolean => SPARE_FIELDS.has(field)
