import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { GlobalSearchCommand } from '../components/GlobalSearchCommand.comp'
import type { GlobalSearchItem } from '../types'

// Mock getNodeTypeConfig
jest.mock('../utils/getNodeTypeConfig', () => ({
  getNodeTypeConfig: (nodeType: string) => ({
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    badgeVariant: 'default',
    icon: () => <div>Icon</div>,
    label: nodeType
  })
}))

describe('GlobalSearchCommand', () => {
  const mockResults: GlobalSearchItem[] = [
    {
      uid: 'sys-1',
      name: 'Test System',
      description: 'A test system description',
      nodeType: 'System'
    },
    {
      uid: 'ord-1',
      name: 'Test Order',
      description: 'A test order description',
      nodeType: 'Order'
    },
    {
      uid: 'cat-1',
      name: 'Test Catalogue Item',
      description: 'A test catalogue item',
      nodeType: 'CatalogueItem'
    }
  ]

  const mockMessages = {
    'common.globalSearch.title': 'Global Search',
    'common.globalSearch.description':
      'Search for systems, orders, and catalogue items',
    'common.globalSearch.placeholder': 'Type to search...',
    'common.globalSearch.minChars': 'Type at least 2 characters to search',
    'common.globalSearch.noResults': 'No results found',
    'common.globalSearch.error': 'Error loading results',
    'common.globalSearch.updating': 'Updating...'
  }

  const renderWithIntl = (ui: React.ReactElement) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <IntlProvider locale="en" messages={mockMessages}>
        {children}
      </IntlProvider>
    )
    Wrapper.displayName = 'IntlWrapper'
    return render(ui, { wrapper: Wrapper })
  }

  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
    searchValue: '',
    onSearchChange: jest.fn(),
    results: [],
    isLoading: false,
    isFetching: false,
    onSelect: jest.fn(),
    error: null
  }

  it('renders command dialog when open', () => {
    renderWithIntl(<GlobalSearchCommand {...defaultProps} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('displays placeholder text', () => {
    renderWithIntl(<GlobalSearchCommand {...defaultProps} />)

    expect(
      screen.getByPlaceholderText('Type to search...')
    ).toBeInTheDocument()
  })

  it('shows minimum characters message when search is less than 2 chars', () => {
    renderWithIntl(
      <GlobalSearchCommand {...defaultProps} searchValue="a" />
    )

    expect(
      screen.getByText('Type at least 2 characters to search')
    ).toBeInTheDocument()
  })

  it('displays loading skeletons when isLoading is true', () => {
    renderWithIntl(
      <GlobalSearchCommand
        {...defaultProps}
        searchValue="test"
        isLoading={true}
      />
    )

    // Should show 3 skeleton loaders
    const skeletons = screen.getAllByRole('status', { hidden: true })
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('displays error message when error prop is provided', () => {
    renderWithIntl(
      <GlobalSearchCommand
        {...defaultProps}
        searchValue="test"
        error={new Error('Test error')}
      />
    )

    expect(screen.getByText('Error loading results')).toBeInTheDocument()
  })

  it('displays no results message when no results and not loading', () => {
    renderWithIntl(
      <GlobalSearchCommand
        {...defaultProps}
        searchValue="test"
        results={[]}
        isLoading={false}
      />
    )

    expect(screen.getByText('No results found')).toBeInTheDocument()
  })

  it('renders search results grouped by nodeType', () => {
    renderWithIntl(
      <GlobalSearchCommand
        {...defaultProps}
        searchValue="test"
        results={mockResults}
      />
    )

    expect(screen.getByText('Test System')).toBeInTheDocument()
    expect(screen.getByText('Test Order')).toBeInTheDocument()
    expect(screen.getByText('Test Catalogue Item')).toBeInTheDocument()
  })

  it('displays result descriptions', () => {
    renderWithIntl(
      <GlobalSearchCommand
        {...defaultProps}
        searchValue="test"
        results={mockResults}
      />
    )

    expect(screen.getByText('A test system description')).toBeInTheDocument()
    expect(screen.getByText('A test order description')).toBeInTheDocument()
  })

  it('calls onSelect when result item is clicked', () => {
    const onSelect = jest.fn()
    renderWithIntl(
      <GlobalSearchCommand
        {...defaultProps}
        searchValue="test"
        results={mockResults}
        onSelect={onSelect}
      />
    )

    const firstResult = screen.getByText('Test System')
    fireEvent.click(firstResult.closest('[data-slot="command-item"]')!)

    expect(onSelect).toHaveBeenCalledWith(mockResults[0])
  })

  it('calls onSearchChange when input value changes', () => {
    const onSearchChange = jest.fn()
    renderWithIntl(
      <GlobalSearchCommand
        {...defaultProps}
        onSearchChange={onSearchChange}
      />
    )

    const input = screen.getByPlaceholderText('Type to search...')
    fireEvent.change(input, { target: { value: 'new search' } })

    expect(onSearchChange).toHaveBeenCalled()
  })

  it('shows updating indicator when isFetching but not isLoading', () => {
    renderWithIntl(
      <GlobalSearchCommand
        {...defaultProps}
        searchValue="test"
        results={mockResults}
        isLoading={false}
        isFetching={true}
      />
    )

    expect(screen.getByText('Updating...')).toBeInTheDocument()
  })

  it('does not show updating indicator when isLoading is true', () => {
    renderWithIntl(
      <GlobalSearchCommand
        {...defaultProps}
        searchValue="test"
        results={mockResults}
        isLoading={true}
        isFetching={true}
      />
    )

    expect(screen.queryByText('Updating...')).not.toBeInTheDocument()
  })

  it('groups results by nodeType correctly', () => {
    renderWithIntl(
      <GlobalSearchCommand
        {...defaultProps}
        searchValue="test"
        results={mockResults}
      />
    )

    // Check that group headings are rendered
    expect(screen.getByText('System')).toBeInTheDocument()
    expect(screen.getByText('Order')).toBeInTheDocument()
    expect(screen.getByText('CatalogueItem')).toBeInTheDocument()
  })

  it('renders badges for each result', () => {
    renderWithIntl(
      <GlobalSearchCommand
        {...defaultProps}
        searchValue="test"
        results={[mockResults[0]]}
      />
    )

    const badges = screen.getAllByRole('status', { hidden: true })
    expect(badges.length).toBeGreaterThan(0)
  })
})
