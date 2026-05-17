import { fireEvent, render, screen } from '@testing-library/react'

import { TableSettings } from '../TableSettings'

jest.mock('@/components/ui', () => ({
    Disclosure: ({ children }: { children: React.ReactNode }) => (
        <section data-testid="disclosure">{children}</section>
    ),
}))

jest.mock('@/components/ui/checkbox', () => ({
    CheckboxWithLabel: ({
        id,
        checked,
        onChange,
        label,
    }: {
        id: string
        checked: boolean
        onChange: (c: boolean) => void
        label: string
    }) => (
        <label data-testid={id}>
            <input
                type="checkbox"
                checked={checked}
                onChange={e => onChange((e.target as HTMLInputElement).checked)}
            />
            {label}
        </label>
    ),
}))

const makeColumn = (
    id: string,
    visible: boolean,
    header: string | unknown = id,
    toggle = jest.fn(),
) => ({
    id,
    getIsVisible: () => visible,
    getToggleVisibilityHandler: () => toggle,
    columnDef: { header },
})

describe('TableSettings', () => {
    it('renders toggle-all checkbox reflecting getIsAllColumnsVisible', () => {
        render(
            <TableSettings
                getAllLeafColumns={() => []}
                getIsAllColumnsVisible={() => true}
                getToggleAllColumnsVisibilityHandler={() => jest.fn()}
            />,
        )
        const toggleAll = screen
            .getByTestId('toggle-all')
            .querySelector('input') as HTMLInputElement
        expect(toggleAll.checked).toBe(true)
    })

    it('renders one checkbox per leaf column with string header label', () => {
        render(
            <TableSettings
                getAllLeafColumns={() => [
                    makeColumn('a', true, 'Col A') as any,
                    makeColumn('b', false, 'Col B') as any,
                ]}
                getIsAllColumnsVisible={() => false}
                getToggleAllColumnsVisibilityHandler={() => jest.fn()}
            />,
        )
        expect(screen.getByTestId('checkbox-a').textContent).toContain('Col A')
        expect(screen.getByTestId('checkbox-b').textContent).toContain('Col B')
    })

    it('falls back to column.id when header is not a string', () => {
        render(
            <TableSettings
                getAllLeafColumns={() => [makeColumn('only-id', true, () => 'Node') as any]}
                getIsAllColumnsVisible={() => false}
                getToggleAllColumnsVisibilityHandler={() => jest.fn()}
            />,
        )
        expect(screen.getByTestId('checkbox-only-id').textContent).toContain('only-id')
    })

    it('toggle-all change forwards { target: { checked } }', () => {
        const toggleAll = jest.fn()
        render(
            <TableSettings
                getAllLeafColumns={() => []}
                getIsAllColumnsVisible={() => false}
                getToggleAllColumnsVisibilityHandler={() => toggleAll}
            />,
        )
        fireEvent.click(
            screen.getByTestId('toggle-all').querySelector('input') as HTMLInputElement,
        )
        expect(toggleAll).toHaveBeenCalledWith({ target: { checked: true } })
    })

    it('per-column change forwards to column.getToggleVisibilityHandler()', () => {
        const toggle = jest.fn()
        render(
            <TableSettings
                getAllLeafColumns={() => [makeColumn('a', false, 'Col A', toggle) as any]}
                getIsAllColumnsVisible={() => false}
                getToggleAllColumnsVisibilityHandler={() => jest.fn()}
            />,
        )
        fireEvent.click(
            screen.getByTestId('checkbox-a').querySelector('input') as HTMLInputElement,
        )
        expect(toggle).toHaveBeenCalledWith({ target: { checked: true } })
    })
})
