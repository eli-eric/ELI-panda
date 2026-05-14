import { fireEvent, render, screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import { useOrderLineContext } from '@/modules/orderItem/context'
import { useDeliverAll } from '@/modules/orderItem/hooks/useDeliverAll'

import { DeliveredAllButton } from '../deliver-all.button'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/modules/orderItem/context', () => ({
    useOrderLineContext: jest.fn(),
}))

jest.mock('@/modules/orderItem/hooks/useDeliverAll', () => ({
    useDeliverAll: jest.fn(),
}))

const mockUsePermission = usePermission as unknown as jest.Mock
const mockUseOrderLineContext = useOrderLineContext as unknown as jest.Mock
const mockUseDeliverAll = useDeliverAll as jest.Mock

let setOrderLine: jest.Mock
let handleDelivery: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setOrderLine = jest.fn()
    handleDelivery = jest.fn()
    mockUseOrderLineContext.mockReturnValue({ setOrderLine })
    mockUseDeliverAll.mockReturnValue({ handleDelivery, isPending: false })
    mockUsePermission.mockReturnValue(true)
})

describe('DeliveredAllButton', () => {
    it('passes setOrderLine into useDeliverAll', () => {
        render(<DeliveredAllButton />)
        expect(mockUseDeliverAll).toHaveBeenCalledWith(setOrderLine)
    })

    it('click triggers handleDelivery', () => {
        render(<DeliveredAllButton />)
        fireEvent.click(screen.getByRole('button'))
        expect(handleDelivery).toHaveBeenCalled()
    })

    it('button disabled when isPending', () => {
        mockUseDeliverAll.mockReturnValue({ handleDelivery, isPending: true })
        render(<DeliveredAllButton />)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('button disabled when user lacks role', () => {
        mockUsePermission.mockReturnValue(false)
        render(<DeliveredAllButton />)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('button enabled when not pending + has role', () => {
        render(<DeliveredAllButton />)
        expect(screen.getByRole('button')).toBeEnabled()
    })
})
