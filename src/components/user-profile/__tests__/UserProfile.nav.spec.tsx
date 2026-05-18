import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import { UserProfileNav } from '../UserProfile.nav'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

const mockUseRouter = useRouter as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('UserProfileNav', () => {
    it('renders 3 nav links to profile sections', () => {
        mockUseRouter.mockReturnValue({ pathname: '/profile/general' })
        render(<UserProfileNav />)
        expect(screen.getByRole('link', { name: /General/ })).toHaveAttribute(
            'href',
            '/profile/general',
        )
        expect(screen.getByRole('link', { name: /Security/ })).toHaveAttribute(
            'href',
            '/profile/security',
        )
        expect(screen.getByRole('link', { name: /Team members/ })).toHaveAttribute(
            'href',
            '/profile/team',
        )
    })

    it('highlights the current pathname link with text-orange-600', () => {
        mockUseRouter.mockReturnValue({ pathname: '/profile/security' })
        render(<UserProfileNav />)
        const security = screen.getByRole('link', { name: /Security/ })
        // active link has bg-gray-50 ... text-orange-600 (without hover: prefix)
        expect(security.className).toMatch(/(^|\s)text-orange-600(\s|$)/)
        const general = screen.getByRole('link', { name: /General/ })
        expect(general.className).not.toMatch(/(^|\s)text-orange-600(\s|$)/)
    })
})
