import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SelectSystemComboBox } from '../SelectSystem.combo'
import { useSystemSelectionModal } from '../hooks/useSystemSelectionModal'

jest.mock('../hooks/useSystemSelectionModal', () => ({
    useSystemSelectionModal: jest.fn(),
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

const mockUseSystemSelectionModal = useSystemSelectionModal as jest.Mock

let openSystemModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openSystemModal = jest.fn()
    mockUseSystemSelectionModal.mockReturnValue({ openSystemModal })
    lastModalSelectProps = null
})

describe('SelectSystemComboBox', () => {
    it('renders ModalSelect with field props', () => {
        renderWithProviders(
            <SelectSystemComboBox
                selectSystemField={{ name: 'sys', label: 'System' } as any}
            />,
            { withForm: true },
        )
        expect(lastModalSelectProps.name).toBe('sys')
        expect(lastModalSelectProps.label).toBe('System')
    })

    it('click opens system modal', () => {
        renderWithProviders(
            <SelectSystemComboBox
                selectSystemField={{ name: 'sys', label: 'System' } as any}
            />,
            { withForm: true },
        )
        fireEvent.click(screen.getByTestId('modal-select'))
        expect(openSystemModal).toHaveBeenCalled()
    })

    it('selecting via modal forwards to onSelect + onChange', () => {
        const onChange = jest.fn()
        const onSelect = jest.fn()
        renderWithProviders(
            <SelectSystemComboBox
                selectSystemField={{ name: 'sys' } as any}
                onChange={onChange}
                onSelect={onSelect}
            />,
            { withForm: true },
        )
        fireEvent.click(screen.getByTestId('modal-select'))
        const handler = openSystemModal.mock.calls[0][0]
        const codebook = { uid: 'u-1', name: 'X' }
        handler(codebook)
        expect(onChange).toHaveBeenCalledWith(codebook)
        expect(onSelect).toHaveBeenCalledWith(codebook)
    })

    it('disabled prop is forwarded', () => {
        renderWithProviders(
            <SelectSystemComboBox
                selectSystemField={{ name: 'sys' } as any}
                disabled
            />,
            { withForm: true },
        )
        expect(screen.getByTestId('modal-select')).toBeDisabled()
    })
})
