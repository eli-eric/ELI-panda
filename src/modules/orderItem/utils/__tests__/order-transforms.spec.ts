import { makeOrder, makeOrderLine, makeServiceLine } from '@/testutils'

import {
    addUuidsToOrderData,
    hasEmptyLines,
    prepareOrderForSubmit,
} from '../order-transforms'

describe('addUuidsToOrderData', () => {
    it('preserves orderLines and serviceLines', () => {
        const order = makeOrder({
            orderLines: [makeOrderLine()],
            serviceLines: [makeServiceLine()],
        })
        const result = addUuidsToOrderData(order)
        expect(result.orderLines).toHaveLength(1)
        expect(result.serviceLines).toHaveLength(1)
    })

    it('defaults orderStatus to Requested when missing', () => {
        const order = { ...makeOrder(), orderStatus: undefined as never }
        const result = addUuidsToOrderData(order)
        expect(result.orderStatus?.name).toBe('Requested')
    })

    it('keeps existing orderStatus', () => {
        const status = { uid: 'st-x', name: 'Approved' }
        const order = makeOrder({ orderStatus: status })
        const result = addUuidsToOrderData(order)
        expect(result.orderStatus).toEqual(status)
    })
})

describe('prepareOrderForSubmit', () => {
    it('strips RHF id field from order lines and service lines', () => {
        const lineWithId = { ...makeOrderLine(), id: 'rhf-1' } as never
        const svcWithId = { ...makeServiceLine(), id: 'rhf-2' } as never
        const order = makeOrder({
            orderLines: [lineWithId],
            serviceLines: [svcWithId],
        })
        const result = prepareOrderForSubmit(order)
        expect(result.orderLines?.[0]).not.toHaveProperty('id')
        expect(result.serviceLines?.[0]).not.toHaveProperty('id')
    })

    it('preserves other line fields after stripping id', () => {
        const order = makeOrder({
            orderLines: [{ ...makeOrderLine({ name: 'Line A' }), id: 'x' } as never],
        })
        const result = prepareOrderForSubmit(order)
        expect(result.orderLines?.[0].name).toBe('Line A')
    })

    it('handles undefined orderLines/serviceLines gracefully', () => {
        const order = {
            ...makeOrder(),
            orderLines: undefined as never,
            serviceLines: undefined as never,
        }
        const result = prepareOrderForSubmit(order)
        expect(result.orderLines).toBeUndefined()
        expect(result.serviceLines).toBeUndefined()
    })
})

describe('hasEmptyLines', () => {
    it('returns true when both order and service lines empty', () => {
        expect(hasEmptyLines(makeOrder({ orderLines: [], serviceLines: [] }))).toBe(true)
    })

    it('returns false when order lines has entries', () => {
        expect(
            hasEmptyLines(
                makeOrder({ orderLines: [makeOrderLine()], serviceLines: [] }),
            ),
        ).toBe(false)
    })

    it('returns false when service lines has entries', () => {
        expect(
            hasEmptyLines(
                makeOrder({ orderLines: [], serviceLines: [makeServiceLine()] }),
            ),
        ).toBe(false)
    })

    it('returns true when both undefined', () => {
        const order = {
            ...makeOrder(),
            orderLines: undefined as never,
            serviceLines: undefined as never,
        }
        expect(hasEmptyLines(order)).toBe(true)
    })
})
