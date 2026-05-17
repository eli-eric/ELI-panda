import { screen } from '@testing-library/react'

import { useIsLargeScreen } from '@/hooks/use-large-screen'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { HierarchyDetailSidebar } from '../HierarchyDetailSidebar.comp'

jest.mock('@/hooks/use-large-screen', () => ({
    useIsLargeScreen: jest.fn(),
}))

jest.mock('../QuickInfoSidebar.comp', () => ({
    QuickInfoSidebar: () => <div data-testid="quick-info" />,
}))

jest.mock('../../tabs/RelationshipsTab.cont', () => ({
    RelationshipsTabContainer: ({ compact }: { compact?: boolean }) => (
        <div data-testid="relationships" data-compact={String(!!compact)} />
    ),
}))

const mockUseIsLargeScreen = useIsLargeScreen as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('HierarchyDetailSidebar', () => {
    it('always renders QuickInfoSidebar', () => {
        mockUseIsLargeScreen.mockReturnValue(false)
        renderWithProviders(<HierarchyDetailSidebar system={null} />)
        expect(screen.getByTestId('quick-info')).toBeInTheDocument()
    })

    it('omits relationships section when no system selected', () => {
        mockUseIsLargeScreen.mockReturnValue(true)
        renderWithProviders(<HierarchyDetailSidebar system={null} />)
        expect(screen.queryByTestId('relationships')).toBeNull()
    })

    it('omits relationships section on small screens', () => {
        mockUseIsLargeScreen.mockReturnValue(false)
        renderWithProviders(<HierarchyDetailSidebar system={{ uid: 's-1' } as any} />)
        expect(screen.queryByTestId('relationships')).toBeNull()
    })

    it('shows compact relationships section when system selected + large screen', () => {
        mockUseIsLargeScreen.mockReturnValue(true)
        renderWithProviders(<HierarchyDetailSidebar system={{ uid: 's-1' } as any} />)
        const rel = screen.getByTestId('relationships')
        expect(rel).toBeInTheDocument()
        expect(rel.dataset.compact).toBe('true')
    })
})
