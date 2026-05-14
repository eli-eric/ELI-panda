import { renderHook } from '@testing-library/react'

import useOrderDetail from '@/modules/orderItem/hooks/useOrderDetail'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useServiceLinesColumns } from '../service-lines.columns'

jest.mock('@/modules/orderItem/hooks/useOrderDetail', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('../../../actions', () => ({
    DeliveredAllButton: () => null,
    ServiceDeliveryAction: () => null,
    ServiceLineActionButtons: () => null,
    ServiceLinePriceFooter: () => null,
}))

const mockUseOrderDetail = useOrderDetail as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseOrderDetail.mockReturnValue({ disabledEdit: false })
})

const renderColumnsHook = () =>
    renderHook(() => useServiceLinesColumns(), { wrapper: AllProvidersWrapper })

describe('useServiceLinesColumns', () => {
    it('returns at least 5 columns (status/name/eun/notes/price + actions when canEdit)', () => {
        const { result } = renderColumnsHook()
        const ids = result.current.map(c => (c.id as string) ?? (c as any).accessorKey)
        expect(ids).toEqual(
            expect.arrayContaining(['isDelivered', 'name', 'eun', 'notes', 'price']),
        )
    })

    it('actions column is always present', () => {
        const { result } = renderColumnsHook()
        const ids = result.current.map(c => (c.id as string) ?? (c as any).accessorKey)
        expect(ids).toContain('actions')
    })

    it('actions cell renders nothing when disabledEdit=true', () => {
        mockUseOrderDetail.mockReturnValue({ disabledEdit: true })
        const { result } = renderColumnsHook()
        const actions = result.current.find(c => c.id === 'actions')!
        const cell = (actions as any).cell({ row: { original: { uid: 'x' } } })
        // cell returns null when disabledEdit
        expect(cell).toBeNull()
    })

    it('isDelivered column meta has sticky left', () => {
        const { result } = renderColumnsHook()
        const status = result.current.find(
            c => (c as any).accessorKey === 'isDelivered',
        )!
        expect((status.meta as any).sticky).toBe('left')
    })
})
