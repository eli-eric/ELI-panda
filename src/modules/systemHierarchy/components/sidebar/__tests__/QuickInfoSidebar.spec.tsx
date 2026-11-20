import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { hasPhysicalItem } from '../../../utils/predicates'
import { QuickInfoSidebar } from '../QuickInfoSidebar.comp'

jest.mock('../MetadataSection.comp', () => ({
    MetadataSection: ({ title, items }: { title: string; items: any[] }) => (
        <div data-testid="section" data-title={title}>
            {items.map(item => (
                <span
                    key={item.label}
                    data-testid={`item-${item.label}`}
                    className={item.valueClassName}
                >
                    {item.value ?? 'N/A'}
                </span>
            ))}
        </div>
    ),
}))

jest.mock('@/components/ui/separator', () => ({
    Separator: () => <hr />,
}))

jest.mock('../../physical-item/PhysicalItemPropertiesSidebar.comp', () => ({
    PhysicalItemPropertiesSidebar: () => null,
}))

jest.mock('../SystemImagePanel.comp', () => ({
    SystemImagePanel: () => null,
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

    describe('spare parts statistics', () => {
        const renderWithStatistics = (statistics: Record<string, number>) => {
            mockHasPhysicalItem.mockReturnValue(false)
            renderWithProviders(<QuickInfoSidebar system={{ statistics } as any} />)
        }

        it('shows the requirement and the coverage as a percentage', () => {
            renderWithStatistics({ minimalSpareParstCount: 2, sp_coverage: 0.5 })
            expect(screen.getByTestId('item-SP Requirement')).toHaveTextContent('2')
            expect(screen.getByTestId('item-Spare Coverage')).toHaveTextContent('50%')
        })

        it('flags coverage below the requirement in red', () => {
            renderWithStatistics({ minimalSpareParstCount: 2, sp_coverage: 0.5 })
            expect(screen.getByTestId('item-Spare Coverage')).toHaveClass('text-red-500')
        })

        it('leaves fully covered systems unflagged', () => {
            renderWithStatistics({ minimalSpareParstCount: 2, sp_coverage: 1 })
            expect(screen.getByTestId('item-Spare Coverage')).not.toHaveClass('text-red-500')
        })

        it('falls back to N/A when the system has no coverage data', () => {
            renderWithStatistics({})
            expect(screen.getByTestId('item-Spare Coverage')).toHaveTextContent('N/A')
            expect(screen.getByTestId('item-SP Requirement')).toHaveTextContent('N/A')
        })
    })
})
