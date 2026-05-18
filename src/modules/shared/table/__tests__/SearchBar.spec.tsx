import { render, screen } from '@testing-library/react'

import { useDebouncedSearchInput } from '../hooks/useDebouncedSearchInput'
import { SearchBar } from '../SearchBar'

jest.mock('../hooks/useDebouncedSearchInput', () => ({
    useDebouncedSearchInput: jest.fn(),
}))

jest.mock('@/components/ui/sidebar', () => ({
    SidebarTrigger: () => <button data-testid="sidebar-trigger" />,
}))

jest.mock('@/components/search/GlobalSearchTrigger', () => ({
    GlobalSearchTrigger: () => <div data-testid="global-search" />,
}))

jest.mock('../SearchBarWrapper', () => ({
    SearchBarWrapper: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="wrapper">{children}</div>
    ),
}))

const mockUseDebouncedSearchInput = useDebouncedSearchInput as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseDebouncedSearchInput.mockReturnValue({
        inputRef: { current: null },
        defaultValue: '',
        handleChange: jest.fn(),
    })
})

describe('SearchBar', () => {
    it('renders SidebarTrigger + search input by default', () => {
        render(<SearchBar tableId="t" />)
        expect(screen.getByTestId('sidebar-trigger')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
        expect(screen.queryByTestId('global-search')).toBeNull()
    })

    it('isGlobalSearch=true swaps native input for GlobalSearchTrigger', () => {
        render(<SearchBar tableId="t" isGlobalSearch />)
        expect(screen.queryByPlaceholderText('Search...')).toBeNull()
        expect(screen.getByTestId('global-search')).toBeInTheDocument()
    })

    it('passes useQuery flag into useDebouncedSearchInput', () => {
        render(<SearchBar tableId="t" useQuery={false} />)
        expect(mockUseDebouncedSearchInput).toHaveBeenCalledWith({
            tableId: 't',
            enableQueryURL: false,
            onChange: undefined,
        })
    })

    it('renders left + right + secondRow slots', () => {
        render(
            <SearchBar
                tableId="t"
                left={<span data-testid="lf" />}
                right={<span data-testid="rt" />}
                secondRow={<span data-testid="sr" />}
            />,
        )
        expect(screen.getByTestId('lf')).toBeInTheDocument()
        expect(screen.getByTestId('rt')).toBeInTheDocument()
        expect(screen.getByTestId('sr')).toBeInTheDocument()
    })
})
