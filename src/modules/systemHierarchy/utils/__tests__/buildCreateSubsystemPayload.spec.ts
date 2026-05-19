import { Actions, SystemLevel } from '@/types/gql/graphql'

import { buildCreateSubsystemPayload } from '../buildCreateSubsystemPayload'

const baseArgs = {
    parentUid: 'parent-1',
    name: 'Pump A',
    systemLevel: SystemLevel.KeySystems,
    sessionUserUid: 'user-7',
    facilityCode: 'ELI',
    inherit: {},
}

describe('buildCreateSubsystemPayload', () => {
    it('emits parentSystem.connect, facility.connect, name, systemLevel, deleted=false', () => {
        const payload = buildCreateSubsystemPayload(baseArgs)
        expect(payload).toMatchObject({
            name: 'Pump A',
            systemLevel: SystemLevel.KeySystems,
            deleted: false,
            parentSystem: { connect: { where: { node: { uid: 'parent-1' } } } },
            facility: { connect: { where: { node: { code: 'ELI' } } } },
        })
    })

    it('emits updatedBy.connect with Actions.Insert and the session user uid (history-tracking guard)', () => {
        const payload = buildCreateSubsystemPayload(baseArgs)
        expect(payload.updatedBy).toEqual({
            connect: [
                {
                    where: { node: { uid: 'user-7' } },
                    edge: { action: Actions.Insert },
                },
            ],
        })
    })

    it.each([
        ['responsibleUid', 'responsible'],
        ['locationUid', 'location'],
        ['zoneUid', 'zone'],
    ] as const)('sets %s when provided, omits when undefined', (inheritKey, payloadKey) => {
        const withValue = buildCreateSubsystemPayload({
            ...baseArgs,
            inherit: { [inheritKey]: 'inh-uid' },
        })
        expect(withValue[payloadKey]).toEqual({ connect: { where: { node: { uid: 'inh-uid' } } } })

        const without = buildCreateSubsystemPayload(baseArgs)
        expect(without[payloadKey]).toBeUndefined()
    })
})
