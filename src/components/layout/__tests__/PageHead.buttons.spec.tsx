import { fireEvent, screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { PageHeaderButtons } from '../PageHead.buttons'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockUsePermission = usePermission as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUsePermission.mockReturnValue(true)
})

describe('PageHeaderButtons', () => {
    it('hides save buttons when permission denied; still shows back link', () => {
        mockUsePermission.mockReturnValue(false)
        renderWithProviders(
            <PageHeaderButtons
                onSubmit={jest.fn()}
                role={'ROLE' as any}
                exitTo="/back"
            />,
        )
        // No save buttons
        expect(screen.getAllByRole('button').length).toBe(1) // just BackButton
        expect(screen.getByRole('link')).toHaveAttribute('href', '/back')
    })

    it('shows Save button when permission granted; click invokes onSubmit', () => {
        const onSubmit = jest.fn()
        renderWithProviders(
            <PageHeaderButtons
                onSubmit={onSubmit}
                role={'ROLE' as any}
                exitTo="/back"
            />,
        )
        const saveButton = screen.getByText('Save')
        fireEvent.click(saveButton)
        expect(onSubmit).toHaveBeenCalled()
    })

    it('Save and Exit button rendered only when onSubmitAndExit provided; invokes it', () => {
        const onSubmitAndExit = jest.fn()
        renderWithProviders(
            <PageHeaderButtons
                onSubmit={jest.fn()}
                onSubmitAndExit={onSubmitAndExit}
                role={'ROLE' as any}
                exitTo="/back"
            />,
        )
        fireEvent.click(screen.getByText('Save and Exit'))
        expect(onSubmitAndExit).toHaveBeenCalled()
    })

    it('omits Save and Exit when onSubmitAndExit not provided', () => {
        renderWithProviders(
            <PageHeaderButtons
                onSubmit={jest.fn()}
                role={'ROLE' as any}
                exitTo="/back"
            />,
        )
        expect(screen.queryByText('Save and Exit')).toBeNull()
    })
})
