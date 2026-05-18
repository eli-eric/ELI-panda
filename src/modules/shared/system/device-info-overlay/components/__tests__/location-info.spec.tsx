import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { LocationInfo } from '../location-info.comp'

describe('LocationInfo', () => {
    it('renders the locationCode value', () => {
        renderWithProviders(<LocationInfo locationCode="LAB-42" />)
        expect(screen.getByText(/LAB-42/)).toBeInTheDocument()
    })
})
