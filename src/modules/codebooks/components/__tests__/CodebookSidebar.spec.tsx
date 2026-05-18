import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { CodebookSidebar } from '../CodebookSidebar'

jest.mock('../CodebookSidebarItem', () => ({
    CodebookSidebarItem: ({
        code,
        isSelected,
        onClick,
    }: {
        code: string
        isSelected: boolean
        onClick: () => void
    }) => (
        <button data-testid={`cb-${code}`} data-selected={String(isSelected)} onClick={onClick}>
            {code}
        </button>
    ),
}))

jest.mock('@/components/ui/scroll-area', () => ({
    ScrollArea: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('CodebookSidebar', () => {
    it('renders one item per codebook when loaded', () => {
        renderWithProviders(
            <CodebookSidebar
                codebooks={[{ code: 'A' }, { code: 'B' }, { code: 'C' }]}
                selectedCodebook={null}
                onSelect={jest.fn()}
                isLoading={false}
            />,
        )
        expect(screen.getByTestId('cb-A')).toBeInTheDocument()
        expect(screen.getByTestId('cb-B')).toBeInTheDocument()
        expect(screen.getByTestId('cb-C')).toBeInTheDocument()
    })

    it('shows 5 loading skeletons when isLoading=true', () => {
        const { container } = renderWithProviders(
            <CodebookSidebar
                codebooks={[]}
                selectedCodebook={null}
                onSelect={jest.fn()}
                isLoading={true}
            />,
        )
        expect(container.querySelectorAll('.animate-pulse').length).toBe(5)
    })

    it('marks selected codebook as isSelected=true', () => {
        renderWithProviders(
            <CodebookSidebar
                codebooks={[{ code: 'A' }, { code: 'B' }]}
                selectedCodebook="B"
                onSelect={jest.fn()}
                isLoading={false}
            />,
        )
        expect(screen.getByTestId('cb-A').dataset.selected).toBe('false')
        expect(screen.getByTestId('cb-B').dataset.selected).toBe('true')
    })

    it('item click invokes onSelect with code', () => {
        const onSelect = jest.fn()
        renderWithProviders(
            <CodebookSidebar
                codebooks={[{ code: 'A' }]}
                selectedCodebook={null}
                onSelect={onSelect}
                isLoading={false}
            />,
        )
        fireEvent.click(screen.getByTestId('cb-A'))
        expect(onSelect).toHaveBeenCalledWith('A')
    })

    it('search filters codebooks (case-insensitive)', () => {
        renderWithProviders(
            <CodebookSidebar
                codebooks={[{ code: 'ALPHA' }, { code: 'BETA' }, { code: 'ALBA' }]}
                selectedCodebook={null}
                onSelect={jest.fn()}
                isLoading={false}
            />,
        )
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'al' } })
        expect(screen.getByTestId('cb-ALPHA')).toBeInTheDocument()
        expect(screen.getByTestId('cb-ALBA')).toBeInTheDocument()
        expect(screen.queryByTestId('cb-BETA')).toBeNull()
    })
})
