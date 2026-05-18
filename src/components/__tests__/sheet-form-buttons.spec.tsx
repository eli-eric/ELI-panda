import { fireEvent, screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'
import { ROLE } from '@/types/constants/roles'

import { SheetFormButtons } from '../sheet-form-buttons'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(() => true),
}))

const mockUsePermission = usePermission as unknown as jest.Mock

beforeEach(() => jest.clearAllMocks())

describe('SheetFormButtons', () => {
    it('renders Save + Exit buttons when permission granted', () => {
        mockUsePermission.mockReturnValue(true)
        renderWithProviders(<SheetFormButtons editRole={ROLE.ADMIN} />)
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Exit' })).toBeInTheDocument()
    })

    it('hides buttons when permission denied', () => {
        mockUsePermission.mockReturnValue(false)
        renderWithProviders(<SheetFormButtons editRole={ROLE.ADMIN} />)
        expect(screen.queryByRole('button', { name: 'Save' })).toBeNull()
    })

    it('shows loading text + disables Save/Exit when loading', () => {
        mockUsePermission.mockReturnValue(true)
        renderWithProviders(
            <SheetFormButtons editRole={ROLE.ADMIN} loading loadingText="Saving..." />,
        )
        expect(screen.getByText('Saving...')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Save/ })).toBeDisabled()
        expect(screen.getByRole('button', { name: /Exit/ })).toBeDisabled()
    })

    it('shows unsaved changes message when isFormDirty + !loading', () => {
        mockUsePermission.mockReturnValue(true)
        const { container } = renderWithProviders(
            <SheetFormButtons editRole={ROLE.ADMIN} isFormDirty />,
        )
        expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument()
    })

    it('clicking Save calls onSubmit', () => {
        mockUsePermission.mockReturnValue(true)
        const onSubmit = jest.fn()
        renderWithProviders(<SheetFormButtons editRole={ROLE.ADMIN} onSubmit={onSubmit} />)
        fireEvent.click(screen.getByRole('button', { name: 'Save' }))
        expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('Save click is debounced (second click within 1.5s ignored)', () => {
        mockUsePermission.mockReturnValue(true)
        const onSubmit = jest.fn()
        renderWithProviders(<SheetFormButtons editRole={ROLE.ADMIN} onSubmit={onSubmit} />)
        const save = screen.getByRole('button', { name: 'Save' })
        fireEvent.click(save)
        fireEvent.click(save)
        expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('clicking Exit calls onExit', () => {
        mockUsePermission.mockReturnValue(true)
        const onExit = jest.fn()
        renderWithProviders(<SheetFormButtons editRole={ROLE.ADMIN} onExit={onExit} />)
        fireEvent.click(screen.getByRole('button', { name: 'Exit' }))
        expect(onExit).toHaveBeenCalled()
    })

    it('custom saveLabel/exitLabel override defaults', () => {
        mockUsePermission.mockReturnValue(true)
        renderWithProviders(
            <SheetFormButtons editRole={ROLE.ADMIN} saveLabel="Apply" exitLabel="Cancel" />,
        )
        expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })
})
