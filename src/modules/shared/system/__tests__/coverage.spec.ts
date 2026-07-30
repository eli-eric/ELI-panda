import { formatCoverage, isUnderCovered } from '../coverage'

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

describe('formatCoverage', () => {
    it('renders the ratio as a percentage', () => {
        expect(formatCoverage(0.5)).toBe('50%')
        expect(formatCoverage(1)).toBe('100%')
        expect(formatCoverage(0)).toBe('0%')
    })

    it('trims the fraction to two decimals without trailing zeros', () => {
        expect(formatCoverage(0.3333)).toBe('33.33%')
        expect(formatCoverage(0.25)).toBe('25%')
    })

    it('returns null when there is no coverage value', () => {
        expect(formatCoverage(null)).toBeNull()
        expect(formatCoverage(undefined)).toBeNull()
    })
})
