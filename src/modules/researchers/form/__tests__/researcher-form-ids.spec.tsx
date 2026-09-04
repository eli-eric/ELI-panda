import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ResearcherFormFields } from '../researcher-form.comp'

jest.mock('@/components/form/inputs', () => ({
    Input: (p: any) => <input data-testid="input" data-name={p.name} />,
}))

jest.mock('@/components/form/Combobox', () => ({
    __esModule: true,
    default: () => <div data-testid="combobox" />,
}))

describe('ResearcherFormFields ResearcherID history', () => {
    it('lists the other IDs on file', () => {
        renderWithProviders(<ResearcherFormFields otherResearcherIds={['HKH-1227-2023']} />)

        expect(screen.getByTestId('other-researcher-ids')).toHaveTextContent('HKH-1227-2023')
    })

    it('promotes an ID to current on request', () => {
        const onMakeCurrent = jest.fn()
        renderWithProviders(
            <ResearcherFormFields
                otherResearcherIds={['HKH-1227-2023']}
                onMakeCurrent={onMakeCurrent}
            />,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Make current' }))

        expect(onMakeCurrent).toHaveBeenCalledWith('HKH-1227-2023')
    })

    it('offers no promotion action to a viewer', () => {
        renderWithProviders(
            <ResearcherFormFields
                otherResearcherIds={['HKH-1227-2023']}
                onMakeCurrent={jest.fn()}
                disabled
            />,
        )

        expect(screen.getByTestId('other-researcher-ids')).toHaveTextContent('HKH-1227-2023')
        expect(screen.queryByRole('button', { name: 'Make current' })).not.toBeInTheDocument()
    })

    it('renders nothing when there is no history to show', () => {
        renderWithProviders(<ResearcherFormFields />)

        expect(screen.queryByTestId('other-researcher-ids')).not.toBeInTheDocument()
    })
})
