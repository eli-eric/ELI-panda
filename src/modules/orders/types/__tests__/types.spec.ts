import { DELIVERY_STATUS, DeliveryStatusMapping, ORDER_STATUS } from '../types'

describe('ORDER_STATUS', () => {
    it('exposes six unique uuid-shaped statuses', () => {
        const values = Object.values(ORDER_STATUS)
        expect(values.length).toBe(6)
        expect(new Set(values).size).toBe(values.length)
        values.forEach(v => expect(v).toMatch(/^[0-9a-f-]{36}$/))
    })
})

describe('DELIVERY_STATUS enum', () => {
    it('has NONE/PARTIAL/COMPLETE = 0/1/2', () => {
        expect(DELIVERY_STATUS.NONE).toBe(0)
        expect(DELIVERY_STATUS.PARTIAL).toBe(1)
        expect(DELIVERY_STATUS.COMPLETE).toBe(2)
    })
})

describe('DeliveryStatusMapping', () => {
    it('maps each status enum to a human label', () => {
        expect(DeliveryStatusMapping[DELIVERY_STATUS.NONE]).toBe('None')
        expect(DeliveryStatusMapping[DELIVERY_STATUS.PARTIAL]).toBe('Partially Delivered')
        expect(DeliveryStatusMapping[DELIVERY_STATUS.COMPLETE]).toBe('Delivered')
    })
})
