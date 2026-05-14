import { fireEvent, screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { useServiceLineContext } from '@/modules/orderItem/context'
import { useServiceLineDeliver } from '@/modules/orderItem/hooks/useServiceDelivery'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useServiceLineEditSheet } from '../../../components/serviceLines/hooks/useServiceLineEditSheet'
import {
    ServiceDeliveryAction,
    ServiceLineActionButtons,
} from '../serviceLine.actions'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/modules/orderItem/context', () => ({
    useServiceLineContext: jest.fn(),
}))

jest.mock('@/modules/orderItem/hooks/useServiceDelivery', () => ({
    useServiceLineDeliver: jest.fn(),
}))

jest.mock('@/modules/orderItem/hooks/useServiceDeliveryAll', () => ({
    useServiceDeliveryAll: jest.fn(() => ({ mutate: jest.fn(), isPending: false })),
}))

jest.mock('../../../components/serviceLines/hooks/useServiceLineEditSheet', () => ({
    useServiceLineEditSheet: jest.fn(),
}))

const mockUsePermission = usePermission as unknown as jest.Mock
const mockUseWarningModal = useWarningModal as unknown as jest.Mock
const mockUseServiceLineContext = useServiceLineContext as unknown as jest.Mock
const mockUseServiceLineDeliver = useServiceLineDeliver as jest.Mock
const mockUseServiceLineEditSheet = useServiceLineEditSheet as jest.Mock

let deleteServiceLine: jest.Mock
let setServiceLine: jest.Mock
let openEditSheet: jest.Mock
let mutate: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    deleteServiceLine = jest.fn()
    setServiceLine = jest.fn()
    openEditSheet = jest.fn()
    mutate = jest.fn()
    mockUseServiceLineContext.mockReturnValue({ deleteServiceLine, setServiceLine })
    mockUseServiceLineEditSheet.mockReturnValue({ openEditSheet })
    mockUseServiceLineDeliver.mockReturnValue({ mutate })
    mockUseWarningModal.mockReturnValue((cb: (id: string) => void) => (id: string) => cb(id))
    mockUsePermission.mockReturnValue(true)
})

const line = { id: 'sl-1', uid: 'sl-uid', name: 'Calibration' } as any

describe('ServiceLineActionButtons', () => {
    it('Edit click invokes openEditSheet with the serviceLine + setter', () => {
        renderWithProviders(<ServiceLineActionButtons serviceLine={line} />)
        const [editBtn] = screen.getAllByRole('button')
        fireEvent.click(editBtn)
        expect(openEditSheet).toHaveBeenCalledWith(line, expect.any(Function))
    })

    it('Delete click invokes deleteServiceLine with serviceLine.id', () => {
        renderWithProviders(<ServiceLineActionButtons serviceLine={line} />)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[buttons.length - 1])
        expect(deleteServiceLine).toHaveBeenCalledWith('sl-1')
    })
})

describe('ServiceDeliveryAction', () => {
    it('toggle invokes mutate with inverted checked state', () => {
        renderWithProviders(
            <ServiceDeliveryAction serviceLine={line} checked={false} />,
        )
        // Toggle renders a single switch/button; click it
        const switches = screen.getAllByRole('switch')
        fireEvent.click(switches[0])
        expect(mutate).toHaveBeenCalledWith({ isDelivered: true })
    })

    it('toggle inverts true → false', () => {
        renderWithProviders(<ServiceDeliveryAction serviceLine={line} checked={true} />)
        fireEvent.click(screen.getAllByRole('switch')[0])
        expect(mutate).toHaveBeenCalledWith({ isDelivered: false })
    })
})
