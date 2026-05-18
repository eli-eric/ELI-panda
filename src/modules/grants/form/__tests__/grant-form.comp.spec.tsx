import { render, screen } from '@testing-library/react'

import { GrantFormFields } from '../grant-form.comp'

jest.mock('@/components/form/inputs', () => ({
    Input: (p: any) => (
        <input
            data-testid="input"
            data-name={p.name}
            data-label={p.label}
            data-required={p.required ? 'true' : 'false'}
            data-disabled={p.disabled ? 'true' : 'false'}
        />
    ),
}))

jest.mock('@/components/form/Combobox', () => ({
    __esModule: true,
    default: (p: any) => (
        <div
            data-testid="combobox"
            data-name={p.name}
            data-label={p.label}
            data-codebook={p.codebook}
            data-disabled={p.disabled ? 'true' : 'false'}
        />
    ),
}))

describe('GrantFormFields', () => {
    it('renders code + name Inputs and grantGroup Combobox', () => {
        render(<GrantFormFields />)
        const inputs = screen.getAllByTestId('input')
        expect(inputs.map(i => i.dataset.name)).toEqual(['code', 'name'])
        expect(screen.getByTestId('combobox').dataset.name).toBe('grantGroup')
    })

    it('code and name are required', () => {
        render(<GrantFormFields />)
        const inputs = screen.getAllByTestId('input')
        for (const inp of inputs) {
            expect(inp.dataset.required).toBe('true')
        }
    })

    it('disabled=false by default → inputs/combobox not disabled', () => {
        render(<GrantFormFields />)
        for (const inp of screen.getAllByTestId('input')) {
            expect(inp.dataset.disabled).toBe('false')
        }
        expect(screen.getByTestId('combobox').dataset.disabled).toBe('false')
    })

    it('disabled prop propagates to all fields', () => {
        render(<GrantFormFields disabled />)
        for (const inp of screen.getAllByTestId('input')) {
            expect(inp.dataset.disabled).toBe('true')
        }
        expect(screen.getByTestId('combobox').dataset.disabled).toBe('true')
    })
})
