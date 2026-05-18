import type { Researcher } from '@/modules/researchers/types/researcher.types'

import { isResearcherSelected, toSelectedResearcher } from '../researcher-select.types'

describe('toSelectedResearcher', () => {
    it('picks only uid/firstName/lastName from full Researcher', () => {
        const r = {
            uid: 'r-1',
            firstName: 'A',
            lastName: 'B',
            orcid: '0000-0000-0000-0000',
            extra: 'dropped',
        } as unknown as Researcher
        expect(toSelectedResearcher(r)).toEqual({ uid: 'r-1', firstName: 'A', lastName: 'B' })
    })
})

describe('isResearcherSelected', () => {
    it('true when uid matches', () => {
        expect(
            isResearcherSelected('r-1', [
                { uid: 'r-1', firstName: 'A', lastName: 'B' },
                { uid: 'r-2', firstName: 'C', lastName: 'D' },
            ]),
        ).toBe(true)
    })

    it('false when uid not in list', () => {
        expect(
            isResearcherSelected('r-3', [{ uid: 'r-1', firstName: 'A', lastName: 'B' }]),
        ).toBe(false)
    })

    it('false on empty list', () => {
        expect(isResearcherSelected('r-1', [])).toBe(false)
    })
})
