import { act, renderHook } from '@testing-library/react'
import type { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import type { OrderDetailFormType, ServiceLine } from '../../types/form'
import { ServiceLineProvider, useServiceLineContext } from '../ServiceLineContext'

const buildWrapper = (initialServiceLines: ServiceLine[] = []): FC<PropsWithChildren> => {
    const Wrapper: FC<PropsWithChildren> = ({ children }) => {
        const methods = useForm<OrderDetailFormType>({
            defaultValues: { serviceLines: initialServiceLines } as OrderDetailFormType,
        })
        return (
            <FormProvider {...methods}>
                <ServiceLineProvider>{children}</ServiceLineProvider>
            </FormProvider>
        )
    }
    Wrapper.displayName = 'TestWrapper'
    return Wrapper
}

describe('ServiceLineContext', () => {
    it('throws when used outside provider', () => {
        const err = jest.spyOn(console, 'error').mockImplementation(() => {})
        expect(() => renderHook(() => useServiceLineContext())).toThrow(
            /ServiceLineProvider/,
        )
        err.mockRestore()
    })

    it('inserts new service line when uid not matched (new entry)', () => {
        const { result } = renderHook(() => useServiceLineContext(), {
            wrapper: buildWrapper([]),
        })
        act(() => {
            result.current.setServiceLine({
                name: 'NewSvc',
            } as ServiceLine & { id?: string })
        })
        expect(result.current.fields).toHaveLength(1)
        expect(result.current.fields[0].name).toBe('NewSvc')
    })

    it('generates uuid for new inserted service line when none provided', () => {
        const { result } = renderHook(() => useServiceLineContext(), {
            wrapper: buildWrapper([]),
        })
        act(() => {
            result.current.setServiceLine({
                name: 'S1',
            } as ServiceLine & { id?: string })
        })
        expect(result.current.fields[0].uuid).toBeTruthy()
    })

    it('updates existing by RHF id', () => {
        const existing = { uuid: 'u-1', name: 'Old' } as ServiceLine
        const { result } = renderHook(() => useServiceLineContext(), {
            wrapper: buildWrapper([existing]),
        })
        const rhfId = result.current.fields[0].id
        act(() => {
            result.current.setServiceLine({
                id: rhfId,
                uuid: 'u-1',
                name: 'Updated',
            } as ServiceLine & { id?: string })
        })
        expect(result.current.fields[0].name).toBe('Updated')
    })

    it('updates existing by API uid when no RHF id match', () => {
        const existing = { uid: 'api-uid-1', name: 'Old' } as ServiceLine
        const { result } = renderHook(() => useServiceLineContext(), {
            wrapper: buildWrapper([existing]),
        })
        act(() => {
            result.current.setServiceLine({
                uid: 'api-uid-1',
                name: 'UpdatedByUid',
            } as ServiceLine & { id?: string })
        })
        expect(result.current.fields).toHaveLength(1)
        expect(result.current.fields[0].name).toBe('UpdatedByUid')
    })

    it('deletes by RHF id', () => {
        const { result } = renderHook(() => useServiceLineContext(), {
            wrapper: buildWrapper([{ name: 'A' } as ServiceLine]),
        })
        const id = result.current.fields[0].id
        act(() => {
            result.current.deleteServiceLine(id)
        })
        expect(result.current.fields).toHaveLength(0)
    })
})
