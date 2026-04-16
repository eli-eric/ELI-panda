import { act, renderHook } from '@testing-library/react'
import type { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import type { OrderDetailFormType, OrderLineFormType } from '../../types/form'
import { OrderLineProvider, useOrderLineContext } from '../OrderLineContext'

const buildWrapper = (initialOrderLines: OrderLineFormType[] = []): FC<PropsWithChildren> => {
    const Wrapper: FC<PropsWithChildren> = ({ children }) => {
        const methods = useForm<OrderDetailFormType>({
            defaultValues: { orderLines: initialOrderLines } as OrderDetailFormType,
        })
        return (
            <FormProvider {...methods}>
                <OrderLineProvider>{children}</OrderLineProvider>
            </FormProvider>
        )
    }
    Wrapper.displayName = 'TestWrapper'
    return Wrapper
}

describe('OrderLineContext', () => {
    it('throws when used outside provider', () => {
        const err = jest.spyOn(console, 'error').mockImplementation(() => {})
        expect(() => renderHook(() => useOrderLineContext())).toThrow(/OrderLineProvider/)
        err.mockRestore()
    })

    it('inserts new order line when no uid (new entry)', () => {
        const { result } = renderHook(() => useOrderLineContext(), {
            wrapper: buildWrapper([]),
        })
        act(() => {
            result.current.setOrderLine({
                name: 'New Line',
                catalogueNumber: 'CAT-1',
            } as OrderLineFormType)
        })
        expect(result.current.fields).toHaveLength(1)
        expect(result.current.fields[0].name).toBe('New Line')
    })

    it('updates existing line when uid matches', () => {
        const existing = { uid: 'ol-1', name: 'Old', catalogueNumber: 'C-1' } as OrderLineFormType
        const { result } = renderHook(() => useOrderLineContext(), {
            wrapper: buildWrapper([existing]),
        })
        act(() => {
            result.current.setOrderLine({
                uid: 'ol-1',
                name: 'Updated',
                catalogueNumber: 'C-1',
            } as OrderLineFormType)
        })
        expect(result.current.fields).toHaveLength(1)
        expect(result.current.fields[0].name).toBe('Updated')
    })

    it('does nothing when setOrderLine called with uid not found', () => {
        const existing = { uid: 'ol-1', name: 'A', catalogueNumber: 'X' } as OrderLineFormType
        const { result } = renderHook(() => useOrderLineContext(), {
            wrapper: buildWrapper([existing]),
        })
        const originalLength = result.current.fields.length
        act(() => {
            result.current.setOrderLine({
                uid: 'nonexistent',
                name: 'Will-not-match',
                catalogueNumber: 'Y',
            } as OrderLineFormType)
        })
        expect(result.current.fields).toHaveLength(originalLength)
    })

    it('deletes order line by RHF id', () => {
        const { result } = renderHook(() => useOrderLineContext(), {
            wrapper: buildWrapper([{ name: 'A', catalogueNumber: 'X' } as OrderLineFormType]),
        })
        const id = result.current.fields[0].id
        act(() => {
            result.current.deleteOrderLine({
                ...result.current.fields[0],
                id,
            } as OrderLineFormType & { id: string })
        })
        expect(result.current.fields).toHaveLength(0)
    })
})
