import { renderHook } from '@testing-library/react'
import type { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useDeliveryHandler } from '../useDeliveryHandler'

interface TestLine {
    uid?: string
    name: string
    isDelivered?: boolean
    lastUpdateTime?: string
    serialNumber?: string
    eun?: string
    system?: { uid: string; name: string }
    parentSystem?: { uid: string; name: string }
    location?: { uid: string; name: string }
    price?: number
    notes?: string
}

const buildWrapper = (): FC<PropsWithChildren> => {
    const Wrapper: FC<PropsWithChildren> = ({ children }) => {
        const methods = useForm<{ lastUpdateTime?: string }>({
            defaultValues: { lastUpdateTime: '' },
        })
        return <FormProvider {...methods}>{children}</FormProvider>
    }
    Wrapper.displayName = 'TestWrapper'
    return Wrapper
}

describe('useDeliveryHandler.handleSuccessfulDelivery', () => {
    const SYSTEM = { uid: 'sys-1', name: 'COMPONENTS' }
    const PARENT_SYSTEM = { uid: 'parent-1', name: 'E3_Betatron' }

    const buildExistingLine = (overrides: Partial<TestLine> = {}): TestLine => ({
        uid: 'line-1',
        name: 'Item',
        isDelivered: false,
        system: SYSTEM,
        parentSystem: PARENT_SYSTEM,
        location: { uid: 'loc-1', name: 'Loc' },
        price: 99,
        notes: 'keep me',
        serialNumber: 'SN-original',
        eun: 'EUN-original',
        ...overrides,
    })

    it('preserves system, parentSystem, and other non-delivery fields when applying delivery response', () => {
        const wrapper = buildWrapper()
        const { result } = renderHook(() => useDeliveryHandler(), { wrapper })

        const existing = buildExistingLine()
        const setOrderLine = jest.fn<void, [TestLine]>()
        const refetch = jest.fn()
        const getExistingLine = jest.fn((uid: string) =>
            uid === existing.uid ? existing : undefined,
        )

        // Backend response simulating broken shape: system holds parent uid, parentSystem missing.
        const responseLine: TestLine = {
            uid: 'line-1',
            name: 'Item',
            lastUpdateTime: '2026-04-27T13:21:04.309+02:00',
            serialNumber: 'SN-new',
            eun: 'EUN-new',
            system: { uid: 'parent-1', name: 'E3_Betatron' },
        }

        result.current.handleSuccessfulDelivery([responseLine], {
            setOrderLine,
            refetch,
            getExistingLine,
        })

        expect(setOrderLine).toHaveBeenCalledTimes(1)
        const applied = setOrderLine.mock.calls[0][0]

        expect(applied.system).toEqual(SYSTEM)
        expect(applied.parentSystem).toEqual(PARENT_SYSTEM)
        expect(applied.location).toEqual(existing.location)
        expect(applied.price).toBe(existing.price)
        expect(applied.notes).toBe(existing.notes)

        expect(applied.isDelivered).toBe(true)
        expect(applied.lastUpdateTime).toBe(responseLine.lastUpdateTime)
        expect(applied.serialNumber).toBe('SN-new')
        expect(applied.eun).toBe('EUN-new')

        expect(refetch).toHaveBeenCalled()
    })

    it('skips lines that cannot be found in the form state', () => {
        const wrapper = buildWrapper()
        const { result } = renderHook(() => useDeliveryHandler(), { wrapper })

        const setOrderLine = jest.fn<void, [TestLine]>()
        const refetch = jest.fn()
        const getExistingLine = jest.fn(() => undefined)

        result.current.handleSuccessfulDelivery(
            [{ uid: 'missing', name: 'X', lastUpdateTime: 't' }],
            { setOrderLine, refetch, getExistingLine },
        )

        expect(setOrderLine).not.toHaveBeenCalled()
        expect(refetch).toHaveBeenCalled()
    })

    it('skips lines without uid', () => {
        const wrapper = buildWrapper()
        const { result } = renderHook(() => useDeliveryHandler(), { wrapper })

        const setOrderLine = jest.fn<void, [TestLine]>()
        const refetch = jest.fn()
        const getExistingLine = jest.fn()

        result.current.handleSuccessfulDelivery([{ name: 'no-uid' } as TestLine], {
            setOrderLine,
            refetch,
            getExistingLine,
        })

        expect(getExistingLine).not.toHaveBeenCalled()
        expect(setOrderLine).not.toHaveBeenCalled()
    })
})
