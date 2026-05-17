import { fireEvent, screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { LogoutButton } from '../logout-button'

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

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

jest.mock('next-auth/react', () => ({
    signOut: jest.fn(),
}))

const mockUseRouter = useRouter as jest.Mock
const mockSignOut = signOut as jest.Mock

let push: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    push = jest.fn()
    mockUseRouter.mockReturnValue({ push })
    mockSignOut.mockReturnValue(Promise.resolve())
})

describe('LogoutButton', () => {
    it('renders a clickable menu item', () => {
        renderWithProviders(<LogoutButton />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('click signs out with redirect=false then pushes to /', async () => {
        renderWithProviders(<LogoutButton />)
        fireEvent.click(screen.getByRole('button'))
        expect(mockSignOut).toHaveBeenCalledWith({ redirect: false })
        await waitFor(() => expect(push).toHaveBeenCalledWith('/'))
    })

})
