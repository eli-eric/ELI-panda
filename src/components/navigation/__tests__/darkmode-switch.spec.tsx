import { act, fireEvent, render, screen } from '@testing-library/react'

import { useDarkModeStore } from '@/store/useDarkModeStore'

import { DarkModeSwitch } from '../darkmode-switch'

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenuItem: ({
        onClick,
        children,
    }: {
        onClick?: () => void
        children: React.ReactNode
    }) => (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    ),
}))

jest.mock('@/store/useDarkModeStore', () => ({
    useDarkModeStore: jest.fn(),
}))

const mockUseDarkModeStore = useDarkModeStore as unknown as jest.Mock

let toggleDarkMode: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    toggleDarkMode = jest.fn()
})

describe('DarkModeSwitch', () => {
    it('renders "Dark Mode" label when isDark=false', () => {
        mockUseDarkModeStore.mockReturnValue({ isDark: false, toggleDarkMode })
        act(() => {
            render(<DarkModeSwitch />)
        })
        expect(screen.getByText('Dark Mode')).toBeInTheDocument()
    })

    it('renders "Light Mode" label when isDark=true', () => {
        mockUseDarkModeStore.mockReturnValue({ isDark: true, toggleDarkMode })
        act(() => {
            render(<DarkModeSwitch />)
        })
        expect(screen.getByText('Light Mode')).toBeInTheDocument()
    })

    it('click invokes toggleDarkMode', () => {
        mockUseDarkModeStore.mockReturnValue({ isDark: false, toggleDarkMode })
        act(() => {
            render(<DarkModeSwitch />)
        })
        fireEvent.click(screen.getByRole('button'))
        expect(toggleDarkMode).toHaveBeenCalled()
    })
})
