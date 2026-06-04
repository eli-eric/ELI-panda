import { screen } from '@testing-library/react'

import type { PropertyGroup } from '@/hooks/useItemPropertiesData'
import { useItemPropertiesData } from '@/hooks/useItemPropertiesData'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useSystemDetail } from '../../../hooks/queries/useSystemDetail'
import { OverriddenPropertiesSummary } from '../OverriddenPropertiesSummary.comp'

jest.mock('../../../hooks/queries/useSystemDetail', () => ({
    useSystemDetail: jest.fn(),
}))
jest.mock('@/hooks/useItemPropertiesData', () => ({
    useItemPropertiesData: jest.fn(),
}))
jest.mock('@/components/ui/separator', () => ({ Separator: () => <hr /> }))

const mockUseSystemDetail = useSystemDetail as jest.Mock
const mockUseItemPropertiesData = useItemPropertiesData as jest.Mock

const setGroups = (groups: PropertyGroup[]) => {
    mockUseItemPropertiesData.mockReturnValue({
        groupedProperties: groups,
        hasOverriddenProperties: groups.some(g => g.properties.some(p => p.isOverridden)),
        hasProperties: groups.length > 0,
    })
}

beforeEach(() => {
    jest.clearAllMocks()
    mockUseSystemDetail.mockReturnValue({ physicalItem: { catalogueItem: {} } })
})

describe('OverriddenPropertiesSummary', () => {
    it('lists true overrides and service-only additions, excludes unchanged/catalogue-only', () => {
        setGroups([
            {
                key: 'g',
                name: 'General',
                properties: [
                    // true override -> shown with "was"
                    {
                        uid: 'voltage',
                        name: 'Voltage',
                        value: '220',
                        serviceValue: '240',
                        isOverridden: true,
                        type: 'Number',
                    },
                    // service-only addition -> shown without "was"
                    {
                        uid: 'flow',
                        name: 'FlowRate',
                        value: null,
                        serviceValue: '5L/s',
                        isOverridden: false,
                        type: 'Text',
                    },
                    // service re-affirmed same value -> excluded
                    {
                        uid: 'current',
                        name: 'Current',
                        value: '5',
                        serviceValue: '5',
                        isOverridden: false,
                        type: 'Number',
                    },
                    // catalogue-only -> excluded
                    { uid: 'power', name: 'Power', value: '1.2kW', type: 'Text' },
                ],
            },
        ])

        renderWithProviders(<OverriddenPropertiesSummary systemUid="sys-1" />)

        expect(screen.getByText('Voltage')).toBeInTheDocument()
        expect(screen.getByText(/was 220/)).toBeInTheDocument()
        expect(screen.getByText('FlowRate')).toBeInTheDocument()
        expect(screen.queryByText('Current')).not.toBeInTheDocument()
        expect(screen.queryByText('Power')).not.toBeInTheDocument()
    })

    it('renders nothing when no property was modified by a service', () => {
        setGroups([
            {
                key: 'g',
                name: 'General',
                properties: [{ uid: 'power', name: 'Power', value: '1.2kW', type: 'Text' }],
            },
        ])

        renderWithProviders(<OverriddenPropertiesSummary systemUid="sys-1" />)
        expect(screen.queryByTestId('overridden-properties-summary')).not.toBeInTheDocument()
    })
})
