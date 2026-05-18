import { renderHook } from '@testing-library/react'

import { useServiceTypeList } from '@/modules/services/hooks/useServiceTypeList'

import { useServiceLineFields } from '../useServiceLineFields'

jest.mock('@/modules/services/hooks/useServiceTypeList', () => ({
    useServiceTypeList: jest.fn(),
}))

jest.mock('@/hooks/form/useMakeFormFields', () => ({
    useMakeFormFields: (fields: Record<string, unknown>) => fields,
}))

const mockUseServiceTypeList = useServiceTypeList as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useServiceLineFields', () => {
    it('returns name/notes/serviceType/items/price/currency keys', () => {
        mockUseServiceTypeList.mockReturnValue({ data: undefined })
        const { result } = renderHook(() => useServiceLineFields())
        expect(Object.keys(result.current as Record<string, unknown>)).toEqual(
            expect.arrayContaining([
                'name',
                'notes',
                'serviceType',
                'items',
                'price',
                'currency',
            ]),
        )
    })

    it('serviceType.codebookResponse is undefined when data missing', () => {
        mockUseServiceTypeList.mockReturnValue({ data: undefined })
        const { result } = renderHook(() => useServiceLineFields())
        const st = (result.current as any).serviceType
        expect(st.codebookResponse).toBeUndefined()
    })

    it('serviceType.codebookResponse maps {uid,name} from useServiceTypeList data', () => {
        mockUseServiceTypeList.mockReturnValue({
            data: [
                { uid: 't1', name: 'TypeA', extra: 'dropped' },
                { uid: 't2', name: 'TypeB' },
            ],
        })
        const { result } = renderHook(() => useServiceLineFields())
        const st = (result.current as any).serviceType
        expect(st.codebookResponse).toEqual([
            { uid: 't1', name: 'TypeA' },
            { uid: 't2', name: 'TypeB' },
        ])
    })

    it('price field has numeric input attributes', () => {
        mockUseServiceTypeList.mockReturnValue({ data: undefined })
        const { result } = renderHook(() => useServiceLineFields())
        const price = (result.current as any).price
        expect(price.type).toBe('number')
        expect(price.inputMode).toBe('numeric')
        expect(price.required).toBe(true)
    })

    it('required flags set on name/serviceType/price/currency only', () => {
        mockUseServiceTypeList.mockReturnValue({ data: undefined })
        const { result } = renderHook(() => useServiceLineFields())
        const f = result.current as any
        expect(f.name.required).toBe(true)
        expect(f.serviceType.required).toBe(true)
        expect(f.price.required).toBe(true)
        expect(f.currency.required).toBe(true)
        expect(f.notes.required).toBeUndefined()
        expect(f.items.required).toBeUndefined()
    })
})
