import { render, screen } from '@testing-library/react'

import { StepField } from '../step-field'

jest.mock('@/components/form/Combobox', () => ({
    __esModule: true,
    default: (p: any) => <div data-testid="combo" data-name={p.name} />,
}))

jest.mock('@/components/form/inputs', () => ({
    Input: (p: any) => <div data-testid="input" data-name={p.name} />,
    TextArea: (p: any) => <div data-testid="textarea" data-name={p.name} />,
}))

jest.mock('@/components/form/Listbox', () => ({
    __esModule: true,
    default: (p: any) => <div data-testid="listbox" data-name={p.name} />,
}))

jest.mock('@/components/grid/Grid', () => ({
    Col: ({ children, md }: { children: React.ReactNode; md: number }) => (
        <div data-testid="col" data-md={md}>
            {children}
        </div>
    ),
}))

jest.mock('../../../systemSelect/SelectSystem.combo', () => ({
    SelectSystemComboBox: (p: any) => <div data-testid="combo-system" data-name={p.selectSystemField.name} />,
}))

describe('StepField', () => {
    it.each([
        ['input', 'input'],
        ['textarea', 'textarea'],
        ['select', 'listbox'],
        ['combo', 'combo'],
        ['combo-system', 'combo-system'],
    ])('renders %s field type', (componentType, testid) => {
        render(
            <StepField
                field={{
                    componentType,
                    field: { name: 'x' },
                    colSpan: 4,
                } as any}
            />,
        )
        expect(screen.getByTestId(testid)).toBeInTheDocument()
        expect(screen.getByTestId('col').dataset.md).toBe('4')
    })

    it('component type renders the bare component', () => {
        render(
            <StepField
                field={{
                    componentType: 'component',
                    component: <span>inline</span>,
                } as any}
            />,
        )
        expect(screen.getByText('inline')).toBeInTheDocument()
    })

    it('default colSpan=12 when not provided', () => {
        render(
            <StepField
                field={{ componentType: 'input', field: { name: 'x' } } as any}
            />,
        )
        expect(screen.getByTestId('col').dataset.md).toBe('12')
    })

    it('returns null for unknown componentType', () => {
        const { container } = render(
            <StepField field={{ componentType: 'unknown', field: {} } as any} />,
        )
        expect(container).toBeEmptyDOMElement()
    })
})
