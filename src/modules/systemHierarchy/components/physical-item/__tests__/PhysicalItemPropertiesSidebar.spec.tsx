import { screen } from '@testing-library/react'

import type { PropertyGroup } from '@/hooks/useItemPropertiesData'
import { useItemPropertiesData } from '@/hooks/useItemPropertiesData'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useSystemDetail } from '../../../hooks/queries/useSystemDetail'
import { PhysicalItemPropertiesSidebar } from '../PhysicalItemPropertiesSidebar.comp'

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
        hasProperties: groups.some(g => g.properties.length > 0),
    })
}

beforeEach(() => {
    jest.clearAllMocks()
    mockUseSystemDetail.mockReturnValue({ physicalItem: { catalogueItem: {} } })
})

describe('PhysicalItemPropertiesSidebar', () => {
    it('lists ALL properties (overridden, service-only, unchanged, catalogue-only)', () => {
        setGroups([
            {
                key: 'g',
                name: 'General',
                properties: [
                    {
                        uid: 'voltage',
                        name: 'Voltage',
                        value: '220',
                        serviceValue: '240',
                        isOverridden: true,
                        type: 'Number',
                    },
                    {
                        uid: 'flow',
                        name: 'FlowRate',
                        value: null,
                        serviceValue: '5L/s',
                        isOverridden: false,
                        type: 'Text',
                    },
                    { uid: 'power', name: 'Power', value: '1.2kW', type: 'Text' },
                ],
            },
        ])

        renderWithProviders(<PhysicalItemPropertiesSidebar systemUid="sys-1" />)

        // every property is present, not just the modified ones
        expect(screen.getByText('Voltage')).toBeInTheDocument()
        expect(screen.getByText('FlowRate')).toBeInTheDocument()
        expect(screen.getByText('Power')).toBeInTheDocument()
        // override marker still shown for the changed one
        expect(screen.getByText(/was 220/)).toBeInTheDocument()
    })

    it('renders group headings (skips the General bucket)', () => {
        setGroups([
            {
                key: 'flanges',
                name: 'Flanges',
                properties: [{ uid: 'outlet', name: 'Outlet flange size', value: 'DN 40', type: 'Text' }],
            },
            {
                key: 'no-group',
                name: 'General',
                properties: [{ uid: 'power', name: 'Power', value: '1.2kW', type: 'Text' }],
            },
        ])

        renderWithProviders(<PhysicalItemPropertiesSidebar systemUid="sys-1" />)
        expect(screen.getByText('Flanges')).toBeInTheDocument()
        expect(screen.queryByText('General')).not.toBeInTheDocument()
    })

    it('renders nothing when the item has no catalogue properties', () => {
        setGroups([])
        renderWithProviders(<PhysicalItemPropertiesSidebar systemUid="sys-1" />)
        expect(screen.queryByTestId('physical-item-properties')).not.toBeInTheDocument()
    })
})
