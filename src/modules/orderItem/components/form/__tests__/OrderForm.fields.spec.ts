import { renderHook } from '@testing-library/react'

import useOrderDetail from '../../../hooks/useOrderDetail'
import useOrderFormFields from '../OrderForm.fields'

jest.mock('../../../hooks/useOrderDetail', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/hooks/form/useMakeFormFields', () => ({
    useMakeFormFields: (fields: Record<string, unknown>) => fields,
}))

const mockUseOrderDetail = useOrderDetail as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useOrderFormFields', () => {
    it('returns all 13 fields keyed by name', () => {
        mockUseOrderDetail.mockReturnValue({ disabledEdit: false })
        const { result } = renderHook(() => useOrderFormFields())
        const keys = Object.keys(result.current as Record<string, unknown>)
        // Expect all the field names from the original module
        expect(keys).toEqual(
            expect.arrayContaining([
                'name',
                'eun',
                'partNumber',
                'orderNumber',
                'requestNumber',
                'contractNumber',
                'supplier',
                'procurementResponsible',
                'requestor',
                'orderStatus',
                'deliveryStatus',
                'notes',
                'orderDate',
            ]),
        )
    })

    it('propagates disabledEdit to all field configs', () => {
        mockUseOrderDetail.mockReturnValue({ disabledEdit: true })
        const { result } = renderHook(() => useOrderFormFields())
        const fields = result.current as Record<string, { disabled: boolean }>
        for (const f of Object.values(fields)) {
            expect(f.disabled).toBe(true)
        }
    })

    it('disabledEdit=false means none of the field configs are disabled', () => {
        mockUseOrderDetail.mockReturnValue({ disabledEdit: false })
        const { result } = renderHook(() => useOrderFormFields())
        const fields = result.current as Record<string, { disabled: boolean }>
        for (const f of Object.values(fields)) {
            expect(f.disabled).toBe(false)
        }
    })
})
