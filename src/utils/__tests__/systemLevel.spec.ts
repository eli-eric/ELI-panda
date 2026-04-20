import { SystemLevel } from '@/types/gql/graphql'

import {
    getBadgeVariantBySystemLevel,
    getBorderBySystemLevel,
    getColorBySystemLevel,
    getFontBySystemLevel,
} from '../systemLevel'

describe('getColorBySystemLevel', () => {
    it('returns orange classes for KeySystems', () => {
        expect(getColorBySystemLevel(SystemLevel.KeySystems)).toContain('orange')
    })

    it('returns sky classes for SubsystemsAndParts', () => {
        expect(getColorBySystemLevel(SystemLevel.SubsystemsAndParts)).toContain('sky')
    })

    it('returns lime classes for TechnologyUnit', () => {
        expect(getColorBySystemLevel(SystemLevel.TechnologyUnit)).toContain('lime')
    })

    it('returns empty string for undefined', () => {
        expect(getColorBySystemLevel(undefined)).toBe('')
    })
})

describe('getBorderBySystemLevel', () => {
    it('returns border-2 classes for each level', () => {
        expect(getBorderBySystemLevel(SystemLevel.KeySystems)).toContain('border-2')
        expect(getBorderBySystemLevel(SystemLevel.SubsystemsAndParts)).toContain('border-2')
        expect(getBorderBySystemLevel(SystemLevel.TechnologyUnit)).toContain('border-2')
    })

    it('returns empty string for undefined', () => {
        expect(getBorderBySystemLevel(undefined)).toBe('')
    })
})

describe('getFontBySystemLevel', () => {
    it('returns text color classes for each level', () => {
        expect(getFontBySystemLevel(SystemLevel.KeySystems)).toContain('text-orange')
        expect(getFontBySystemLevel(SystemLevel.SubsystemsAndParts)).toContain('text-sky')
        expect(getFontBySystemLevel(SystemLevel.TechnologyUnit)).toContain('text-lime')
    })

    it('returns empty string for undefined', () => {
        expect(getFontBySystemLevel(undefined)).toBe('')
    })
})

describe('getBadgeVariantBySystemLevel', () => {
    it('returns orange badge for KeySystems', () => {
        expect(getBadgeVariantBySystemLevel(SystemLevel.KeySystems)).toContain('orange')
    })

    it('returns sky badge for SubsystemsAndParts', () => {
        expect(getBadgeVariantBySystemLevel(SystemLevel.SubsystemsAndParts)).toContain('sky')
    })

    it('returns lime badge for TechnologyUnit', () => {
        expect(getBadgeVariantBySystemLevel(SystemLevel.TechnologyUnit)).toContain('lime')
    })

    it('returns red badge for Trash', () => {
        expect(getBadgeVariantBySystemLevel(SystemLevel.Trash)).toContain('red')
    })

    it('returns gray default badge for undefined', () => {
        expect(getBadgeVariantBySystemLevel(undefined)).toContain('gray')
    })
})
