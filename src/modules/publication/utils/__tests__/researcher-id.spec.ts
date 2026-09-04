import { isNewerResearcherId, researcherIdYear } from '../doi'

describe('researcherIdYear', () => {
    // Vintages taken from real ELI researcher records.
    it.each([
        ['E-9444-2015', 2015],
        ['GZZ-7943-2022', 2022],
        ['HKH-1227-2023', 2023],
        ['aaa-1673-2020', 2020],
        ['  I-6474-2015 ', 2015],
    ])('reads the issue year from %s', (id, expected) => {
        expect(researcherIdYear(id)).toBe(expected)
    })

    it.each(['0000-0002-1825-0097', 'ABCD-1234-2020', 'not-an-id', ''])(
        'returns undefined for %s',
        id => {
            expect(researcherIdYear(id)).toBeUndefined()
        },
    )
})

describe('isNewerResearcherId', () => {
    it('accepts a strictly later vintage', () => {
        expect(isNewerResearcherId('HKH-1227-2023', 'E-9444-2015')).toBe(true)
    })

    it('rejects an earlier vintage', () => {
        expect(isNewerResearcherId('E-9444-2015', 'HKH-1227-2023')).toBe(false)
    })

    it('rejects the same vintage, which has no defensible winner', () => {
        expect(isNewerResearcherId('GZZ-7943-2022', 'E-1111-2022')).toBe(false)
    })

    it('rejects when there is no current ID to compare against', () => {
        expect(isNewerResearcherId('HKH-1227-2023', undefined)).toBe(false)
        expect(isNewerResearcherId('HKH-1227-2023', '')).toBe(false)
    })

    it('rejects when either side is unreadable', () => {
        expect(isNewerResearcherId('garbage', 'E-9444-2015')).toBe(false)
        expect(isNewerResearcherId('HKH-1227-2023', 'garbage')).toBe(false)
    })
})
