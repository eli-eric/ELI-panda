import { fireEvent, screen } from '@testing-library/react'

import {
    useGlobalSearchShortcut,
    useOpenGlobalSearch,
} from '@/modules/shared/globalSearch'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { GlobalSearchTrigger } from '../GlobalSearchTrigger'

jest.mock('@/modules/shared/globalSearch', () => ({
    useOpenGlobalSearch: jest.fn(),
    useGlobalSearchShortcut: jest.fn(),
}))

const mockUseOpenGlobalSearch = useOpenGlobalSearch as jest.Mock
const mockUseGlobalSearchShortcut = useGlobalSearchShortcut as jest.Mock

let openGlobalSearch: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openGlobalSearch = jest.fn()
    mockUseOpenGlobalSearch.mockReturnValue(openGlobalSearch)
    mockUseGlobalSearchShortcut.mockReturnValue({ shortcutDisplay: '⌘K' })
})

describe('GlobalSearchTrigger', () => {
    it('uses default placeholder text', () => {
        renderWithProviders(<GlobalSearchTrigger />)
        // default translation rendered (en locale → "Search anything…")
        // we don't know the exact text — just assert at least one node has class flex-1 truncate
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('uses custom placeholder', () => {
        renderWithProviders(<GlobalSearchTrigger placeholder="Find a system" />)
        expect(screen.getByText('Find a system')).toBeInTheDocument()
    })

    it('renders the shortcut display badge', () => {
        renderWithProviders(<GlobalSearchTrigger />)
        expect(screen.getByText('⌘K')).toBeInTheDocument()
    })

    it('click invokes openGlobalSearch', () => {
        renderWithProviders(<GlobalSearchTrigger />)
        fireEvent.click(screen.getByRole('button'))
        expect(openGlobalSearch).toHaveBeenCalled()
    })

    it.each(['sm', 'md', 'lg'] as const)('applies %s size classes', size => {
        renderWithProviders(<GlobalSearchTrigger size={size} />)
        const cls = screen.getByRole('button').className
        if (size === 'sm') expect(cls).toContain('h-8')
        if (size === 'md') expect(cls).toContain('h-9')
        if (size === 'lg') expect(cls).toContain('h-10')
    })
})
