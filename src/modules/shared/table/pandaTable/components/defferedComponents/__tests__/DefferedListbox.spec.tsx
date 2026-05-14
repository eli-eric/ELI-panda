import { render, screen } from '@testing-library/react'

import { useCodebook } from '@/hooks/fetch/useCodebook'

import { DefferedListbox } from '../DefferedListbox'

jest.mock('@/hooks/fetch/useCodebook', () => ({
    useCodebook: jest.fn(),
}))

jest.mock('@headlessui/react', () => {
    const Listbox = ({ children }: { children: React.ReactNode }) => (
        <div data-testid="listbox">{children}</div>
    )
    Listbox.Button = ({ children }: { children: React.ReactNode }) => (
        <button data-testid="listbox-button">{children}</button>
    )
    Listbox.Options = ({ children }: { children: React.ReactNode }) => (
        <ul data-testid="listbox-options">{children}</ul>
    )
    Listbox.Option = ({
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
    return { Listbox }
})

const mockUseCodebook = useCodebook as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('DefferedListbox', () => {
    it('renders empty when no codebook data', () => {
        mockUseCodebook.mockReturnValue({ data: { data: [] } })
        render(<DefferedListbox onChange={jest.fn()} />)
        expect(screen.queryByTestId('listbox-options')).toBeNull()
    })

    it('renders options from codebook data', () => {
        mockUseCodebook.mockReturnValue({
            data: { data: [{ uid: '1', name: 'A' }, { uid: '2', name: 'B' }] },
        })
        render(<DefferedListbox onChange={jest.fn()} />)
        expect(screen.getByTestId('option-1')).toBeInTheDocument()
        expect(screen.getByTestId('option-2')).toBeInTheDocument()
    })

    it('shows current value name in button', () => {
        mockUseCodebook.mockReturnValue({ data: { data: [] } })
        render(
            <DefferedListbox
                value={{ uid: '1', name: 'Current' } as any}
                onChange={jest.fn()}
            />,
        )
        expect(screen.getByTestId('listbox-button').textContent).toContain('Current')
    })

    it('renders unit text in button when provided', () => {
        mockUseCodebook.mockReturnValue({ data: { data: [] } })
        render(<DefferedListbox onChange={jest.fn()} unit="kg" />)
        expect(screen.getByTestId('listbox-button').textContent).toContain('kg')
    })
})
