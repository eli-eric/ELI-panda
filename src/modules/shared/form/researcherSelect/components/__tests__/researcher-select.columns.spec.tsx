import { fireEvent, render, renderHook, screen } from '@testing-library/react'

import { useResearcherSelectColumns } from '../researcher-select.columns'

describe('useResearcherSelectColumns', () => {
    it('returns 5 columns (select, lastName, firstName, orcid, scopusId)', () => {
        const { result } = renderHook(() =>
            useResearcherSelectColumns({ selectedResearchers: [], onToggle: jest.fn() }),
        )
        expect(result.current.map(c => c.id)).toEqual([
            'select',
            'lastName',
            'firstName',
            'orcid',
            'scopusId',
        ])
    })

    it('select cell renders unchecked Checkbox by default', () => {
        const { result } = renderHook(() =>
            useResearcherSelectColumns({ selectedResearchers: [], onToggle: jest.fn() }),
        )
        const selectColumn = result.current[0]
        const cell = (selectColumn as any).cell({
            row: { original: { uid: 'r-1', firstName: 'A', lastName: 'B' } },
        }) as JSX.Element
        render(cell)
        expect(screen.getByRole('checkbox').getAttribute('data-state')).toBe('unchecked')
    })

    it('select cell marks checked when researcher uid is in selectedResearchers', () => {
        const { result } = renderHook(() =>
            useResearcherSelectColumns({
                selectedResearchers: [{ uid: 'r-1' } as any],
                onToggle: jest.fn(),
            }),
        )
        const cell = (result.current[0] as any).cell({
            row: { original: { uid: 'r-1', firstName: 'A', lastName: 'B' } },
        }) as JSX.Element
        render(cell)
        expect(screen.getByRole('checkbox').getAttribute('data-state')).toBe('checked')
    })

    it('checkbox click invokes onToggle with the row researcher', () => {
        const onToggle = jest.fn()
        const { result } = renderHook(() =>
            useResearcherSelectColumns({ selectedResearchers: [], onToggle }),
        )
        const researcher = { uid: 'r-1', firstName: 'A', lastName: 'B' }
        const cell = (result.current[0] as any).cell({
            row: { original: researcher },
        }) as JSX.Element
        render(cell)
        fireEvent.click(screen.getByRole('checkbox'))
        expect(onToggle).toHaveBeenCalledWith(researcher)
    })
})
