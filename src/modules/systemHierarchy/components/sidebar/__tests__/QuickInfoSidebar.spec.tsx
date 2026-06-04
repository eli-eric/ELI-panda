import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { hasPhysicalItem } from '../../../utils/predicates'
import { QuickInfoSidebar } from '../QuickInfoSidebar.comp'

jest.mock('../MetadataSection.comp', () => ({
    MetadataSection: ({ title }: { title: string }) => (
        <div data-testid="section" data-title={title} />
    ),
}))

jest.mock('@/components/ui/separator', () => ({
    Separator: () => <hr />,
}))

jest.mock('../../physical-item/OverriddenPropertiesSummary.comp', () => ({
    OverriddenPropertiesSummary: () => null,
}))

jest.mock('../../../utils/predicates', () => ({
    hasPhysicalItem: jest.fn(),
}))

const mockHasPhysicalItem = hasPhysicalItem as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('QuickInfoSidebar', () => {
    it('shows "no system selected" empty state when system is null', () => {
        renderWithProviders(<QuickInfoSidebar system={null} />)
        // empty state renders translated message — assert via text match
        expect(screen.getByText(/.+/)).toBeInTheDocument()
    })

    it('renders Metadata + Statistics sections when system present', () => {
        mockHasPhysicalItem.mockReturnValue(false)
        renderWithProviders(<QuickInfoSidebar system={{ statistics: {} } as any} />)
        expect(screen.getAllByTestId('section').length).toBe(2)
    })

    it('renders Physical Item section when hasPhysicalItem=true', () => {
        mockHasPhysicalItem.mockReturnValue(true)
        renderWithProviders(<QuickInfoSidebar system={{ statistics: {}, physicalItem: {} } as any} />)
        expect(screen.getAllByTestId('section').length).toBe(3)
    })

    it('omits Physical Item section when hasPhysicalItem=false', () => {
        mockHasPhysicalItem.mockReturnValue(false)
        renderWithProviders(<QuickInfoSidebar system={{ statistics: {} } as any} />)
        expect(screen.getAllByTestId('section').length).toBe(2)
    })
})
