import { render, screen } from '@testing-library/react'

// Mock StepField + Grid to avoid pulling form/Combobox/SelectSystemComboBox transitive deps
jest.mock('@/components/grid/Grid', () => ({
    Grid: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="grid">{children}</div>
    ),
}))

jest.mock('../step-field', () => ({
    StepField: ({ field }: { field: any }) => (
        <span data-testid={`stepfield-${field.field.name}`}>
            {field.componentType}-{field.field.name}
        </span>
    ),
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const FormStep = require('../form-step').default

describe('wizardV2 FormStep', () => {
    it('renders the override component when component prop set (ignores fields)', () => {
        render(
            <FormStep
                fields={[{ field: { name: 'x' }, componentType: 'input' } as any]}
                component={<div data-testid="override">OVERRIDE</div>}
            />,
        )
        expect(screen.getByTestId('override')).toBeInTheDocument()
        expect(screen.queryByTestId('grid')).toBeNull()
    })

    it('renders fields inside Grid via StepField', () => {
        render(
            <FormStep
                fields={[
                    { field: { name: 'a' }, componentType: 'input' } as any,
                    { field: { name: 'b' }, componentType: 'select' } as any,
                ]}
            />,
        )
        expect(screen.getByTestId('grid')).toBeInTheDocument()
        expect(screen.getByTestId('stepfield-a')).toHaveTextContent('input-a')
        expect(screen.getByTestId('stepfield-b')).toHaveTextContent('select-b')
    })

    it('renders empty Grid when fields undefined', () => {
        render(<FormStep />)
        expect(screen.getByTestId('grid')).toBeInTheDocument()
    })
})
