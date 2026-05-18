import { render, renderHook, screen } from '@testing-library/react'

import { useSystemTypeSelectColumns } from '../system-type-select.columns'

jest.mock('@/components/form/shared/ExpandableNameCell', () => ({
    ExpandableNameCell: ({ getValue, filterName }: { getValue: () => any; filterName: string }) => (
        <div data-testid="name-cell" data-filter={filterName}>
            {getValue()}
        </div>
    ),
}))

jest.mock('@/utils', () => ({
    highlightText: (text: string, search: string) => (
        <span data-testid="highlight" data-search={search}>
            {text}
        </span>
    ),
}))

describe('useSystemTypeSelectColumns', () => {
    it('returns name + code columns', () => {
        const { result } = renderHook(() => useSystemTypeSelectColumns(''))
        expect(result.current.map(c => c.id)).toEqual(['name', 'code'])
    })

    it('name cell uses ExpandableNameCell with current search', () => {
        const { result } = renderHook(() => useSystemTypeSelectColumns('foo'))
        const cell = (result.current[0] as any).cell({
            row: {},
            getValue: () => 'My Type',
        }) as JSX.Element
        render(cell)
        const nameCell = screen.getByTestId('name-cell')
        expect(nameCell.textContent).toBe('My Type')
        expect(nameCell.dataset.filter).toBe('foo')
    })

    it('code cell highlights matching search', () => {
        const { result } = renderHook(() => useSystemTypeSelectColumns('bar'))
        const cell = (result.current[1] as any).cell({
            getValue: () => 'XCODE',
        }) as JSX.Element
        render(cell)
        const hl = screen.getByTestId('highlight')
        expect(hl.dataset.search).toBe('bar')
        expect(hl.textContent).toBe('XCODE')
    })

    it('code cell handles undefined value with empty string', () => {
        const { result } = renderHook(() => useSystemTypeSelectColumns(''))
        const cell = (result.current[1] as any).cell({
            getValue: () => undefined,
        }) as JSX.Element
        render(cell)
        expect(screen.getByTestId('highlight').textContent).toBe('')
    })
})
