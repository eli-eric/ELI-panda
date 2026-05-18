import { fireEvent, render, screen } from '@testing-library/react'

import { useCodebook } from '@/hooks/fetch/useCodebook'

import { DefferedCombobox } from '../DefferedCombobox'

jest.mock('@/hooks/fetch/useCodebook', () => ({
    useCodebook: jest.fn(),
}))

jest.mock('@headlessui/react', () => {
    const Combobox = ({ children }: { children: React.ReactNode }) => (
        <div data-testid="combobox">{children}</div>
    )
    Combobox.Input = ({
        value,
        onChange,
        placeholder,
    }: {
        value: string
        onChange: (e: any) => void
        placeholder?: string
    }) => (
        <input
            data-testid="combobox-input"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
    Combobox.Button = ({ children }: { children: React.ReactNode }) => (
        <button data-testid="combobox-button">{children}</button>
    )
    Combobox.Options = ({ children }: { children: React.ReactNode }) => (
        <ul data-testid="combobox-options">{children}</ul>
    )
    Combobox.Option = ({
        children,
        value,
    }: {
        children: any
        value: any
    }) => (
        <li data-testid={`option-${value.uid}`}>
            {typeof children === 'function' ? children({ active: false }) : children}
        </li>
    )
    return { Combobox }
})

const mockUseCodebook = useCodebook as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('DefferedCombobox', () => {
    it('renders placeholder and input', () => {
        mockUseCodebook.mockReturnValue({ data: { data: [] } })
        render(<DefferedCombobox onChange={jest.fn()} placeholder="Search..." />)
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    })

    it('renders options from useCodebook', () => {
        mockUseCodebook.mockReturnValue({
            data: { data: [{ uid: '1', name: 'A' }] },
        })
        render(<DefferedCombobox onChange={jest.fn()} />)
        expect(screen.getByTestId('option-1')).toBeInTheDocument()
    })

    it('typing updates the search text passed to useCodebook', () => {
        mockUseCodebook.mockReturnValue({ data: { data: [] } })
        render(<DefferedCombobox onChange={jest.fn()} />)
        fireEvent.change(screen.getByTestId('combobox-input'), {
            target: { value: 'foo' },
        })
        // useCodebook may have been called multiple times; the last call should have searchText='foo'
        const lastCall = mockUseCodebook.mock.calls[mockUseCodebook.mock.calls.length - 1]
        expect(lastCall[1].searchText).toBe('foo')
    })

    it('initial value populates the input', () => {
        mockUseCodebook.mockReturnValue({ data: { data: [] } })
        render(
            <DefferedCombobox
                value={{ uid: '1', name: 'Selected' } as any}
                onChange={jest.fn()}
            />,
        )
        expect((screen.getByTestId('combobox-input') as HTMLInputElement).value).toBe(
            'Selected',
        )
    })
})
