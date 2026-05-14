import { fireEvent, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { UserProfileCard } from '../UserProfile.card'

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}))

jest.mock('@/lib/environment/utils', () => ({
    getSwaggerApiDocsUrl: () => 'https://docs.example/swagger',
}))

jest.mock('sonner', () => ({ toast: { success: jest.fn() } }))
const sonner = jest.requireMock('sonner')

const mockUseSession = useSession as jest.Mock

const user = {
    fullName: 'Jane Doe',
    email: 'jane@x.com',
    facility: 'F-1',
    roles: ['admin', 'editor'],
    apiAccessToken: 'TOK',
} as any

beforeEach(() => {
    jest.clearAllMocks()
    mockUseSession.mockReturnValue({ data: { user } })
    // jsdom clipboard
    Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: jest.fn() },
        configurable: true,
    })
})

describe('UserProfileCard', () => {
    it('renders user fullName + email + facility', () => {
        renderWithProviders(<UserProfileCard />)
        expect(screen.getByText('Jane Doe')).toBeInTheDocument()
        expect(screen.getByText('jane@x.com')).toBeInTheDocument()
        expect(screen.getByText('F-1')).toBeInTheDocument()
    })

    it('renders one role badge per role', () => {
        renderWithProviders(<UserProfileCard />)
        expect(screen.getByText('admin')).toBeInTheDocument()
        expect(screen.getByText('editor')).toBeInTheDocument()
    })

    it('Swagger link points to getSwaggerApiDocsUrl', () => {
        renderWithProviders(<UserProfileCard />)
        const link = screen.getByRole('link', { name: /swagger/i })
        expect(link).toHaveAttribute('href', 'https://docs.example/swagger')
    })

    it('Copy button copies apiAccessToken to clipboard + toasts success', () => {
        renderWithProviders(<UserProfileCard />)
        fireEvent.click(screen.getByRole('button'))
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('TOK')
        expect(sonner.toast.success).toHaveBeenCalledWith('Token copied to clipboard')
    })

    it('Copy button copies empty string when no token', () => {
        mockUseSession.mockReturnValue({ data: { user: { ...user, apiAccessToken: undefined } } })
        renderWithProviders(<UserProfileCard />)
        fireEvent.click(screen.getByRole('button'))
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('')
    })
})
