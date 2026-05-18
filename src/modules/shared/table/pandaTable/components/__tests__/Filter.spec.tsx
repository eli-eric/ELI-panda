import { fireEvent, render, screen } from '@testing-library/react'

import { Filter } from '../Filter'

jest.mock('../defferedComponents/DefferedCombobox', () => ({
    DefferedCombobox: ({ onChange }: { onChange: (v: string) => void }) => (
        <button data-testid="combo" onClick={() => onChange('c-val')} />
    ),
}))

jest.mock('../defferedComponents/DefferedInput', () => ({
    DefferedInput: ({
        onChange,
        placeholder,
        type,
    }: {
        onChange: (v: string | number) => void
        placeholder?: string
        type?: string
    }) => (
        <input
            data-testid={`input-${placeholder ?? 'plain'}`}
            data-type={type ?? ''}
            onChange={e => onChange(e.target.value)}
        />
    ),
}))

jest.mock('../defferedComponents/DefferedListbox', () => ({
    DefferedListbox: ({ onChange }: { onChange: (v: string) => void }) => (
        <button data-testid="listbox" onClick={() => onChange('lov-val')} />
    ),
}))

const makeColumn = (filterType?: string, value?: unknown) => ({
    id: 'col-1',
    columnDef: { meta: { filter: { type: filterType, codebookCode: 'CB' } } },
    getFilterValue: () => value,
    setFilterValue: jest.fn(),
    getFacetedUniqueValues: () => new Map([['a', 1]]),
})

describe('pandaTable/Filter', () => {
    it('manualFiltering false → plain text DefferedInput', () => {
        const col = makeColumn(undefined, 'abc')
        render(<Filter column={col as any} table={{} as any} manualFiltering={false} />)
        expect(screen.getByTestId(/input-Search/)).toBeInTheDocument()
    })

    it('manualFiltering true + listOfValues → DefferedListbox forwards setFilterValue', () => {
        const col = makeColumn('listOfValues', null)
        render(<Filter column={col as any} table={{} as any} manualFiltering={true} />)
        fireEvent.click(screen.getByTestId('listbox'))
        expect(col.setFilterValue).toHaveBeenCalledWith('lov-val')
    })

    it('manualFiltering true + autoComplete → DefferedCombobox forwards setFilterValue', () => {
        const col = makeColumn('autoComplete', null)
        render(<Filter column={col as any} table={{} as any} manualFiltering={true} />)
        fireEvent.click(screen.getByTestId('combo'))
        expect(col.setFilterValue).toHaveBeenCalledWith('c-val')
    })

    it('manualFiltering true + string → DefferedInput type=text', () => {
        const col = makeColumn('string', 'foo')
        render(<Filter column={col as any} table={{} as any} manualFiltering={true} />)
        const input = screen.getByTestId('input-plain')
        expect(input.dataset.type).toBe('text')
    })

    it('manualFiltering true + number → two from/to DefferedInputs that update tuple', () => {
        const col = makeColumn('number', undefined)
        render(<Filter column={col as any} table={{} as any} manualFiltering={true} />)
        fireEvent.change(screen.getByTestId('input-from'), { target: { value: '1' } })
        expect(col.setFilterValue).toHaveBeenCalled()
    })

    it('returns null when manualFiltering true + unknown filter type', () => {
        const col = makeColumn('unknown', null)
        const { container } = render(
            <Filter column={col as any} table={{} as any} manualFiltering={true} />,
        )
        expect(container.firstChild).toBeNull()
    })
})
