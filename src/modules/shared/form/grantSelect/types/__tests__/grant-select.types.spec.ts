import type { Grant } from '@/modules/grants/types/grant.types'

import { isGrantSelected, toSelectedGrant } from '../grant-select.types'

describe('toSelectedGrant', () => {
    it('picks only uid/code/name from full Grant object', () => {
        const grant = {
            uid: 'g-1',
            code: 'CC',
            name: 'Grant X',
            grantGroup: { name: 'Group' },
            extra: 'should be dropped',
        } as unknown as Grant
        expect(toSelectedGrant(grant)).toEqual({ uid: 'g-1', code: 'CC', name: 'Grant X' })
    })
})

describe('isGrantSelected', () => {
    it('returns true when uid matches', () => {
        expect(
            isGrantSelected('g-1', [
                { uid: 'g-1', code: 'C', name: 'N' },
                { uid: 'g-2', code: 'C2', name: 'N2' },
            ]),
        ).toBe(true)
    })

    it('returns false when uid not in list', () => {
        expect(isGrantSelected('g-3', [{ uid: 'g-1', code: 'C', name: 'N' }])).toBe(false)
    })

    it('returns false on empty list', () => {
        expect(isGrantSelected('g-1', [])).toBe(false)
    })
})
