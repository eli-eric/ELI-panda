import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { UserProfileLayout } from '../UserProfile.layout'

jest.mock('../UserProfile.nav', () => ({
    UserProfileNav: () => <nav data-testid="profile-nav" />,
}))

describe('UserProfileLayout', () => {
    it('renders nav + heading + subtitle + children', () => {
        renderWithProviders(
            <UserProfileLayout title="common.buttons.edit" subTitle="common.buttons.save">
                <div data-testid="child" />
            </UserProfileLayout>,
        )
        expect(screen.getByTestId('profile-nav')).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Edit' })).toBeInTheDocument()
        expect(screen.getByText('Save')).toBeInTheDocument()
        expect(screen.getByTestId('child')).toBeInTheDocument()
    })
})
