import { isUnderCovered } from '../coverage'

describe('isUnderCovered', () => {
    it('returns true when sp_coverage is below 1', () => {
        expect(isUnderCovered({ sp_coverage: 0 })).toBe(true)
        expect(isUnderCovered({ sp_coverage: 0.5 })).toBe(true)
    })

    it('returns false when sp_coverage is 1 or above', () => {
        expect(isUnderCovered({ sp_coverage: 1 })).toBe(false)
        expect(isUnderCovered({ sp_coverage: 2.5 })).toBe(false)
    })

    it('returns false when sp_coverage is missing', () => {
        expect(isUnderCovered({})).toBe(false)
        expect(isUnderCovered({ sp_coverage: null })).toBe(false)
        expect(isUnderCovered(null)).toBe(false)
        expect(isUnderCovered(undefined)).toBe(false)
    })
})
