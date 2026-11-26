import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import type { CataloguePropertyGroup } from '../../types'
import { CataloguePropertiesList } from '../CataloguePropertiesList.comp'

const groups: CataloguePropertyGroup[] = [
    {
        key: 'electrical',
        name: 'Electrical',
        properties: [
            {
                uid: 'voltage',
                name: 'Voltage',
                value: '220',
                serviceValue: '240',
                isOverridden: true,
                unit: 'V',
                type: 'Number',
            },
            {
                uid: 'current',
                name: 'Current',
                value: '5',
                serviceValue: null,
                isOverridden: false,
                unit: 'A',
                type: 'Number',
            },
            {
                uid: 'rating',
                name: 'Rating',
                value: 'N/A',
                serviceValue: null,
                isOverridden: false,
                unit: null,
                type: 'Text',
            },
        ],
    },
    {
        key: 'no-group',
        name: 'General',
        properties: [
            {
                uid: 'flow',
                name: 'FlowRate',
                value: null,
                serviceValue: '5L/s',
                isOverridden: false,
                unit: null,
                type: 'Text',
            },
        ],
    },
]

describe('CataloguePropertiesList', () => {
    it('renders group headings (and skips the General bucket)', () => {
        renderWithProviders(<CataloguePropertiesList groups={groups} hasOverriddenProperties />)
        expect(screen.getByText('Electrical')).toBeInTheDocument()
        expect(screen.queryByText('General')).not.toBeInTheDocument()
    })

    it('shows the catalogue original on overridden rows', () => {
        renderWithProviders(<CataloguePropertiesList groups={groups} hasOverriddenProperties />)
        expect(screen.getByText('Voltage')).toBeInTheDocument()
        expect(screen.getByText(/was 220/)).toBeInTheDocument()
    })

    it('renders N/A rows and service-only additions without a "was" marker', () => {
        renderWithProviders(<CataloguePropertiesList groups={groups} hasOverriddenProperties />)
        expect(screen.getByText('Rating')).toBeInTheDocument()
        expect(screen.getByText('N/A')).toBeInTheDocument()
        expect(screen.getByText('FlowRate')).toBeInTheDocument()
        // only one "was" marker overall (the Voltage override)
        expect(screen.getAllByText(/was /).length).toBe(1)
    })

    it('shows the Modified badge only when overrides exist', () => {
        const { rerender } = renderWithProviders(
            <CataloguePropertiesList groups={groups} hasOverriddenProperties />,
        )
        expect(screen.getByText('Modified')).toBeInTheDocument()

        rerender(<CataloguePropertiesList groups={groups} hasOverriddenProperties={false} />)
        expect(screen.queryByText('Modified')).not.toBeInTheDocument()
    })
})
