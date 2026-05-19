import { SystemLevel } from '@/types/gql/graphql'

import { canCreateUnder, getAllowedChildSystemLevels } from '../systemLevelRules'

describe('getAllowedChildSystemLevels', () => {
    it('SystemDomain allows only TechnologyUnit', () => {
        expect(getAllowedChildSystemLevels(SystemLevel.SystemDomain)).toEqual([
            SystemLevel.TechnologyUnit,
        ])
    })

    it('TechnologyUnit allows TechnologyUnit, KeySystems, Trash', () => {
        expect(getAllowedChildSystemLevels(SystemLevel.TechnologyUnit)).toEqual([
            SystemLevel.TechnologyUnit,
            SystemLevel.KeySystems,
            SystemLevel.Trash,
        ])
    })

    it('KeySystems allows KeySystems, SubsystemsAndParts, Trash', () => {
        expect(getAllowedChildSystemLevels(SystemLevel.KeySystems)).toEqual([
            SystemLevel.KeySystems,
            SystemLevel.SubsystemsAndParts,
            SystemLevel.Trash,
        ])
    })

    it('SubsystemsAndParts allows SubsystemsAndParts, Trash', () => {
        expect(getAllowedChildSystemLevels(SystemLevel.SubsystemsAndParts)).toEqual([
            SystemLevel.SubsystemsAndParts,
            SystemLevel.Trash,
        ])
    })

    it('Trash allows nothing', () => {
        expect(getAllowedChildSystemLevels(SystemLevel.Trash)).toEqual([])
    })
})

describe('canCreateUnder', () => {
    it('returns true when parent has at least one allowed child level', () => {
        expect(canCreateUnder(SystemLevel.SystemDomain)).toBe(true)
        expect(canCreateUnder(SystemLevel.TechnologyUnit)).toBe(true)
        expect(canCreateUnder(SystemLevel.KeySystems)).toBe(true)
        expect(canCreateUnder(SystemLevel.SubsystemsAndParts)).toBe(true)
    })

    it('returns false for Trash', () => {
        expect(canCreateUnder(SystemLevel.Trash)).toBe(false)
    })
})
