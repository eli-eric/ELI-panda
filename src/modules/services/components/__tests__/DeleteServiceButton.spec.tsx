import { fireEvent, screen } from '@testing-library/react'

import useWarningModal from '@/hooks/useWarningModal'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useServiceTypeDelete } from '../../hooks/useServiceTypeDelete'
import { DeleteServiceButton } from '../serviceTypes/DeleteService.btn'

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('../../hooks/useServiceTypeDelete', () => ({
    useServiceTypeDelete: jest.fn(),
}))

const mockUseWarningModal = useWarningModal as unknown as jest.Mock
const mockUseServiceTypeDelete = useServiceTypeDelete as jest.Mock

let mutate: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mutate = jest.fn()
    mockUseServiceTypeDelete.mockReturnValue({ mutate })
    mockUseWarningModal.mockReturnValue((cb: () => void) => () => cb())
})

describe('DeleteServiceButton', () => {
    it('warning message contains the service name', () => {
        renderWithProviders(<DeleteServiceButton uid="s-1" name="Calibration" />)
        expect(mockUseWarningModal).toHaveBeenCalledWith(
            'Are you sure you want to delete Calibration service?',
        )
    })

    it('passes uid into useServiceTypeDelete', () => {
        renderWithProviders(<DeleteServiceButton uid="s-99" name="X" />)
        expect(mockUseServiceTypeDelete).toHaveBeenCalledWith({ uid: 's-99' })
    })

    it('click → warning callback → mutate(undefined)', () => {
        renderWithProviders(<DeleteServiceButton uid="s-1" name="X" />)
        fireEvent.click(screen.getByRole('button'))
        expect(mutate).toHaveBeenCalledWith(undefined)
    })
})
