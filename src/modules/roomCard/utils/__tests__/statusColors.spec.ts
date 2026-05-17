import type { RoomCardStatus } from '@/types/gql/graphql'

import {
    getOperationalStateDotColor,
    getOperationalStateLabel,
    getStatusBadgeColor,
    getStatusLabel,
} from '../statusColors'

describe('getStatusBadgeColor', () => {
    it.each([
        ['DIRTY_MODE', 'bg-red-200'],
        ['CLEAN_MODE', 'bg-lime-200'],
        ['IN_PREPARATION_MODE', 'bg-orange-300'],
    ] as const)('maps %s to %s', (status, expectedFragment) => {
        expect(getStatusBadgeColor(status as RoomCardStatus)).toContain(expectedFragment)
    })

    it('falls back to gray for undefined / unknown', () => {
        expect(getStatusBadgeColor()).toContain('bg-gray-200')
        expect(getStatusBadgeColor('NOT_A_STATUS' as RoomCardStatus)).toContain('bg-gray-200')
    })
})

describe('getStatusLabel', () => {
    it.each([
        ['DIRTY_MODE', 'Dirty Mode'],
        ['CLEAN_MODE', 'Clean Mode'],
        ['IN_PREPARATION_MODE', 'In Preparation'],
    ] as const)('returns label for %s', (status, expected) => {
        expect(getStatusLabel(status as RoomCardStatus)).toBe(expected)
    })

    it('falls back to "Unknown Status" otherwise', () => {
        expect(getStatusLabel()).toBe('Unknown Status')
    })
})

describe('getOperationalStateLabel', () => {
    it('returns codebook name when present', () => {
        expect(getOperationalStateLabel({ uid: 'x', name: 'Running' })).toBe('Running')
    })

    it('falls back for null/undefined/empty name', () => {
        expect(getOperationalStateLabel(null)).toBe('Unknown State')
        expect(getOperationalStateLabel(undefined)).toBe('Unknown State')
        expect(getOperationalStateLabel({ uid: 'x', name: '' })).toBe('Unknown State')
    })
})

describe('getOperationalStateDotColor', () => {
    it.each([
        ['OS1', 'bg-green-500'],
        ['OS2', 'bg-green-300'],
        ['OS3', 'bg-yellow-400'],
        ['OS4', 'bg-orange-400'],
        ['OS5', 'bg-red-500'],
        ['OS6', 'bg-red-700'],
    ])('maps %s to %s', (code, fragment) => {
        expect(getOperationalStateDotColor(code)).toContain(fragment)
    })

    it('falls back to gray for unknown / empty', () => {
        expect(getOperationalStateDotColor()).toContain('bg-gray-400')
        expect(getOperationalStateDotColor('NOPE')).toContain('bg-gray-400')
    })
})
