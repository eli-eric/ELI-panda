import { renderHook } from '@testing-library/react'

import useOrderLineFormFields from '../OrderLineForm.fields'

jest.mock('@/hooks/form/useMakeFormFields', () => ({
    useMakeFormFields: (fields: Record<string, unknown>) => fields,
}))

describe('useOrderLineFormFields', () => {
    it('returns 12 keys covering all order-line fields', () => {
        const { result } = renderHook(() => useOrderLineFormFields(true))
        expect(Object.keys(result.current as Record<string, unknown>)).toEqual(
            expect.arrayContaining([
                'name',
                'catalogueNumber',
                'system',
                'parentSystem',
                'price',
                'quantity',
                'location',
                'notes',
                'currency',
                'itemUsage',
                'serialNumber',
                'serialNumbers',
            ]),
        )
    })

    it('enabled=true → name/catalogueNumber not disabled', () => {
        const { result } = renderHook(() => useOrderLineFormFields(true))
        const f = result.current as any
        expect(f.name.disabled).toBe(false)
        expect(f.catalogueNumber.disabled).toBe(false)
    })

    it('enabled=false → name/catalogueNumber disabled', () => {
        const { result } = renderHook(() => useOrderLineFormFields(false))
        const f = result.current as any
        expect(f.name.disabled).toBe(true)
        expect(f.catalogueNumber.disabled).toBe(true)
    })

    it('parentSystem is required', () => {
        const { result } = renderHook(() => useOrderLineFormFields(true))
        expect((result.current as any).parentSystem.required).toBe(true)
    })

    it('price field is numeric-typed', () => {
        const { result } = renderHook(() => useOrderLineFormFields(true))
        const price = (result.current as any).price
        expect(price.type).toBe('number')
        expect(price.inputMode).toBe('numeric')
    })

    it('quantity field is numeric-typed', () => {
        const { result } = renderHook(() => useOrderLineFormFields(true))
        expect((result.current as any).quantity.type).toBe('number')
    })
})
