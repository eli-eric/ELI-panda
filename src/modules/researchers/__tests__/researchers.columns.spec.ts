import { renderHook } from '@testing-library/react'

import { useResearcherColumns } from '../researchers.columns'

jest.mock('../components/researcher-actions.comp', () => ({
    ResearcherActionsCell: () => null,
}))

describe('useResearcherColumns', () => {
    it('returns 8 columns covering core researcher fields', () => {
        const { result } = renderHook(() => useResearcherColumns())
        const ids = result.current.map(c => c.id)
        expect(ids).toEqual([
            'lastName',
            'firstName',
            'orcid',
            'scopusId',
            'researcherId',
            'identificationNumber',
            'citizenship',
            'updatedAt',
        ])
    })

    it('accessorFn pulls correct field per column', () => {
        const { result } = renderHook(() => useResearcherColumns())
        const sample = {
            lastName: 'Doe',
            firstName: 'Jane',
            orcid: 'O1',
            scopusId: 'SC',
            researcherId: 'RID',
            identificationNumber: 'IN',
            citizenship: { name: 'Cz' },
            updatedAt: '2024-01-01',
        }
        for (const col of result.current) {
            const fn = (col as any).accessorFn as (r: typeof sample) => unknown
            if (col.id === 'citizenship') {
                expect(fn(sample)).toBe('Cz')
            } else {
                expect(fn(sample)).toBeDefined()
            }
        }
    })

    it('lastName column is sticky in meta', () => {
        const { result } = renderHook(() => useResearcherColumns())
        const lastName = result.current.find(c => c.id === 'lastName')!
        expect((lastName.meta as any).sticky).toBe(true)
    })
})
