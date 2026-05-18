import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useSystemTypeSelectionModal } from '../hooks/useSystemTypeSelectionModal'
import { SystemTypeComboBox } from '../SelectSystemType.combo'

jest.mock('../hooks/useSystemTypeSelectionModal', () => ({
    useSystemTypeSelectionModal: jest.fn(),
}))

let lastModalSelectProps: any = null
jest.mock('@/components/form/ModalSelect', () => ({
    ModalSelect: (props: any) => {
        lastModalSelectProps = props
        return (
            <button data-testid="modal-select" onClick={props.onClick}>
                {props.name}
            </button>
        )
    },
}))

const mockUseSystemTypeSelectionModal = useSystemTypeSelectionModal as jest.Mock

let openSystemTypeModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openSystemTypeModal = jest.fn()
    mockUseSystemTypeSelectionModal.mockReturnValue({ openSystemTypeModal })
    lastModalSelectProps = null
})

describe('SystemTypeComboBox', () => {
    it('click opens system type modal', () => {
        renderWithProviders(
            <SystemTypeComboBox
                systemTypeField={{ name: 'sysType', label: 'System Type' } as any}
            />,
            { withForm: true },
        )
        fireEvent.click(screen.getByTestId('modal-select'))
        expect(openSystemTypeModal).toHaveBeenCalled()
    })

    it('selection forwards to onChange', () => {
        const onChange = jest.fn()
        renderWithProviders(
            <SystemTypeComboBox
                systemTypeField={{ name: 'sysType' } as any}
                onChange={onChange}
            />,
            { withForm: true },
        )
        fireEvent.click(screen.getByTestId('modal-select'))
        const handler = openSystemTypeModal.mock.calls[0][0]
        handler({ uid: 'st-1', name: 'X' })
        expect(onChange).toHaveBeenCalledWith({ uid: 'st-1', name: 'X' })
    })

    it('isFilter prop is forwarded to ModalSelect', () => {
        renderWithProviders(
            <SystemTypeComboBox systemTypeField={{ name: 'sysType' } as any} isFilter />,
            { withForm: true },
        )
        expect(lastModalSelectProps.isFilter).toBe(true)
    })
})
