import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ResearcherFormFields } from '../researcher-form.comp'

jest.mock('@/components/form/inputs', () => ({
    Input: (p: any) => (
        <input
            data-testid="input"
            data-name={p.name}
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
            data-codebook={p.codebook}
            data-disabled={p.disabled ? 'true' : 'false'}
        />
    ),
}))

describe('ResearcherFormFields', () => {
    it('renders 6 inputs: firstName, lastName, identificationNumber, orcid, scopusId, researcherId', () => {
        renderWithProviders(<ResearcherFormFields />)
        const names = screen.getAllByTestId('input').map(i => i.dataset.name)
        expect(names).toEqual([
            'firstName',
            'lastName',
            'identificationNumber',
            'orcid',
            'scopusId',
            'researcherId',
        ])
    })

    it('citizenship combobox is present', () => {
        renderWithProviders(<ResearcherFormFields />)
        expect(screen.getByTestId('combobox').dataset.name).toBe('citizenship')
    })

    it('firstName + lastName are required', () => {
        renderWithProviders(<ResearcherFormFields />)
        const [firstName, lastName, ...rest] = screen.getAllByTestId('input')
        expect(firstName.dataset.required).toBe('true')
        expect(lastName.dataset.required).toBe('true')
        for (const r of rest) expect(r.dataset.required).toBe('false')
    })

    it('disabled prop propagates to all inputs + combobox', () => {
        renderWithProviders(<ResearcherFormFields disabled />)
        for (const inp of screen.getAllByTestId('input')) {
            expect(inp.dataset.disabled).toBe('true')
        }
        expect(screen.getByTestId('combobox').dataset.disabled).toBe('true')
    })
})
