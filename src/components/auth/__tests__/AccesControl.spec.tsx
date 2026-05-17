import { render, screen } from '@testing-library/react'

import { useAccessControl } from '@/hooks/useAccessControl'
import { ROLE } from '@/types/constants/roles'

import { AccessControl } from '../AccesControl'

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: jest.fn(),
}))

const mockUseAccessControl = useAccessControl as jest.Mock

beforeEach(() => jest.clearAllMocks())

describe('AccessControl', () => {
    it('renders nothing when no roles prop', () => {
        mockUseAccessControl.mockReturnValue(() => true)
        const { container } = render(
            <AccessControl>
                <span>child</span>
            </AccessControl>,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('renders children when access permitted', () => {
        mockUseAccessControl.mockReturnValue(() => true)
        render(
            <AccessControl roles={ROLE.ADMIN}>
                <span>child</span>
            </AccessControl>,
        )
        expect(screen.getByText('child')).toBeInTheDocument()
    })

    it('renders nothing when access denied', () => {
        mockUseAccessControl.mockReturnValue(() => false)
        const { container } = render(
            <AccessControl roles={ROLE.ADMIN}>
                <span>child</span>
            </AccessControl>,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('accepts an array of roles', () => {
        mockUseAccessControl.mockReturnValue(() => true)
        render(
            <AccessControl roles={[ROLE.ADMIN, ROLE.BASICS]}>
                <span>child</span>
            </AccessControl>,
        )
        expect(screen.getByText('child')).toBeInTheDocument()
        expect(mockUseAccessControl).toHaveBeenCalledWith([ROLE.ADMIN, ROLE.BASICS])
    })
})
