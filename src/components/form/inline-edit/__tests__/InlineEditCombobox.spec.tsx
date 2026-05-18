import { fireEvent, screen } from '@testing-library/react'

import { useCodebook } from '@/hooks/fetch/useCodebook'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { InlineEditCombobox } from '../InlineEditCombobox'

jest.mock('@/hooks/fetch/useCodebook', () => ({
    useCodebook: jest.fn(),
}))

jest.mock('@/components/ui/popover', () => ({
    Popover: ({
        children,
        open,
        onOpenChange,
    }: {
        children: React.ReactNode
        open: boolean
        onOpenChange: (v: boolean) => void
    }) => (
        <div
            data-testid="popover"
            data-open={String(open)}
            onClick={() => onOpenChange(!open)}
        >
            {children}
        </div>
    ),
    PopoverTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    PopoverContent: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="popover-content">{children}</div>
    ),
}))

jest.mock('@/components/ui/command', () => ({
    Command: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CommandInput: ({
        value,
        onValueChange,
    }: {
        value: string
        onValueChange: (v: string) => void
    }) => (
        <input
            data-testid="command-input"
            value={value}
            onChange={e => onValueChange(e.target.value)}
        />
    ),
    CommandList: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CommandEmpty: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="empty">{children}</div>
    ),
    CommandGroup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    CommandItem: ({
        children,
        onSelect,
        value,
    }: {
        children: React.ReactNode
        onSelect: () => void
        value: string
    }) => (
        <button data-testid={`item-${value}`} onClick={onSelect}>
            {children}
        </button>
    ),
}))

const mockUseCodebook = useCodebook as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseCodebook.mockReturnValue({ data: { data: [{ uid: 'u-1', name: 'Item 1' }] } })
})

describe('InlineEditCombobox', () => {
    it('renders disabled view with field.value.name when disabled', () => {
        renderWithProviders(
            <InlineEditCombobox name="x" label="My Label" disabled />,
            {
                withForm: true,
                formProps: { defaultValues: { x: { uid: 'u-9', name: 'Val' } } },
            },
        )
        expect(screen.getByText('Val')).toBeInTheDocument()
        expect(screen.queryByTestId('command-input')).toBeNull()
    })

    it('renders editable popover when not disabled', () => {
        renderWithProviders(<InlineEditCombobox name="x" label="My Label" />, {
            withForm: true,
        })
        expect(screen.getByTestId('popover')).toBeInTheDocument()
    })

    it('selecting an item via CommandItem updates field via onChange', () => {
        const onSelect = jest.fn()
        renderWithProviders(
            <InlineEditCombobox name="x" label="My Label" onSelect={onSelect} />,
            { withForm: true },
        )
        fireEvent.click(screen.getByTestId('item-Item 1'))
        expect(onSelect).toHaveBeenCalledWith({ uid: 'u-1', name: 'Item 1' })
    })

    it('client-side filter narrows results when hasClientFilter=true', () => {
        mockUseCodebook.mockReturnValue({
            data: {
                data: [
                    { uid: 'a', name: 'Apple' },
                    { uid: 'b', name: 'Banana' },
                ],
            },
        })
        renderWithProviders(
            <InlineEditCombobox name="x" label="X" hasClientFilter />,
            { withForm: true },
        )
        fireEvent.change(screen.getByTestId('command-input'), {
            target: { value: 'ban' },
        })
        // Banana should be in dom, Apple should not (after filter)
        expect(screen.queryByTestId('item-Banana')).toBeInTheDocument()
        expect(screen.queryByTestId('item-Apple')).toBeNull()
    })

    it('codebookResponse override bypasses useCodebook data', () => {
        mockUseCodebook.mockReturnValue({
            data: { data: [{ uid: 'should-not-use', name: 'Should not use' }] },
        })
        renderWithProviders(
            <InlineEditCombobox
                name="x"
                label="X"
                codebookResponse={[{ uid: 'ovr', name: 'Override' } as any]}
            />,
            { withForm: true },
        )
        expect(screen.getByTestId('item-Override')).toBeInTheDocument()
        expect(screen.queryByTestId('item-Should not use')).toBeNull()
    })
})
