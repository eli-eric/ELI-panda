import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useLocationSelectionModal } from '../hooks/useLocationSelectionModal'
import { SelectLocationCombo } from '../SelectLocation.combo'

jest.mock('../hooks/useLocationSelectionModal', () => ({
    useLocationSelectionModal: jest.fn(),
}))

let lastModalSelectProps: any = null
jest.mock('@/components/form/ModalSelect', () => ({
    ModalSelect: (props: any) => {
        lastModalSelectProps = props
        return (
            <button data-testid="modal-select" disabled={props.disabled} onClick={props.onClick}>
                {props.name}
            </button>
        )
    },
}))

const mockUseLocationSelectionModal = useLocationSelectionModal as jest.Mock

let openLocationModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openLocationModal = jest.fn()
    mockUseLocationSelectionModal.mockReturnValue({ openLocationModal })
    lastModalSelectProps = null
})

describe('SelectLocationCombo', () => {
    it('renders ModalSelect + click opens location modal', () => {
        renderWithProviders(
            <SelectLocationCombo locationField={{ name: 'loc' }} />,
            { withForm: true },
        )
        expect(lastModalSelectProps.name).toBe('loc')
        fireEvent.click(screen.getByTestId('modal-select'))
        expect(openLocationModal).toHaveBeenCalled()
    })

    it('modal selection forwards to onSelect', () => {
        const onSelect = jest.fn()
        renderWithProviders(
            <SelectLocationCombo
                locationField={{ name: 'loc' }}
                onSelect={onSelect}
            />,
            { withForm: true },
        )
        fireEvent.click(screen.getByTestId('modal-select'))
        const handler = openLocationModal.mock.calls[0][0]
        handler({ uid: 'u-1', name: 'Room A' })
        expect(onSelect).toHaveBeenCalledWith({ uid: 'u-1', name: 'Room A' })
    })

    it('disabled prop is forwarded', () => {
        renderWithProviders(
            <SelectLocationCombo locationField={{ name: 'loc' }} disabled />,
            { withForm: true },
        )
        expect(screen.getByTestId('modal-select')).toBeDisabled()
    })

    it('isFilter prop forwarded to ModalSelect', () => {
        renderWithProviders(
            <SelectLocationCombo locationField={{ name: 'loc' }} isFilter />,
            { withForm: true },
        )
        expect(lastModalSelectProps.isFilter).toBe(true)
    })
})
