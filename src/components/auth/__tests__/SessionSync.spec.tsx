import { render } from '@testing-library/react'
import { useSession } from 'next-auth/react'

import { clearAuthToken, setAuthToken } from '@/core/http/fetchClient'

import { SessionSync } from '../SessionSync'

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}))

jest.mock('@/core/http/fetchClient', () => ({
    setAuthToken: jest.fn(),
    clearAuthToken: jest.fn(),
}))

const mockUseSession = useSession as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('SessionSync', () => {
    it('writes the token to the cache when authenticated', () => {
        mockUseSession.mockReturnValue({
            status: 'authenticated',
            data: { user: { apiAccessToken: 'TOK' } },
        })
        render(<SessionSync />)
        expect(setAuthToken).toHaveBeenCalledWith('TOK')
        expect(clearAuthToken).not.toHaveBeenCalled()
    })

    it('clears the cache when unauthenticated (logout)', () => {
        mockUseSession.mockReturnValue({ status: 'unauthenticated', data: null })
        render(<SessionSync />)
        expect(clearAuthToken).toHaveBeenCalledTimes(1)
        expect(setAuthToken).not.toHaveBeenCalled()
    })

    it('replaces the token on user-switch (token change)', () => {
        mockUseSession.mockReturnValue({
            status: 'authenticated',
            data: { user: { apiAccessToken: 'TOK_A' } },
        })
        const { rerender } = render(<SessionSync />)
        expect(setAuthToken).toHaveBeenLastCalledWith('TOK_A')

        mockUseSession.mockReturnValue({
            status: 'authenticated',
            data: { user: { apiAccessToken: 'TOK_B' } },
        })
        rerender(<SessionSync />)
        expect(setAuthToken).toHaveBeenLastCalledWith('TOK_B')
    })

    it('does nothing while the session is loading', () => {
        mockUseSession.mockReturnValue({ status: 'loading', data: null })
        render(<SessionSync />)
        expect(setAuthToken).not.toHaveBeenCalled()
        expect(clearAuthToken).not.toHaveBeenCalled()
    })
})
