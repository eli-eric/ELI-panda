import {
    makeCatalogueDetail,
    makeCatalogueItem,
    makeCategoryProperty,
    makeCodebook,
} from '../catalogue'
import { makeOrder, makeOrderLine, makeServiceLine } from '../orderItem'

describe('catalogue factories', () => {
    it('makeCodebook generates unique sequential ids', () => {
        const a = makeCodebook()
        const b = makeCodebook()
        expect(a.uid).not.toBe(b.uid)
        expect(typeof a.uid).toBe('string')
    })

    it('makeCodebook accepts overrides', () => {
        const cb = makeCodebook({ uid: 'fixed', name: 'Custom' })
        expect(cb.uid).toBe('fixed')
        expect(cb.name).toBe('Custom')
    })

    it('makeCategoryProperty produces a text-type property by default', () => {
        const prop = makeCategoryProperty()
        expect(prop.uid).toMatch(/^prop-\d+$/)
        expect(prop.type.name).toBe('text')
    })

    it('makeCatalogueDetail nests a default property', () => {
        const detail = makeCatalogueDetail()
        expect(detail.propertyGroup).toBe('General')
        expect(detail.property.uid).toMatch(/^prop-\d+$/)
    })

    it('makeCatalogueItem defaults to CAT-001 with current ISO timestamp', () => {
        const item = makeCatalogueItem()
        expect(item.catalogueNumber).toBe('CAT-001')
        expect(typeof item.lastUpdateTime).toBe('string')
        // ISO 8601 contains a T separator
        expect(item.lastUpdateTime).toContain('T')
    })
})

describe('orderItem factories', () => {
    it('makeOrderLine sets default currency EUR + quantity 1', () => {
        const ol = makeOrderLine()
        expect(ol.currency).toBe('EUR')
        expect(ol.quantity).toBe(1)
        expect(ol.isDelivered).toBe(false)
    })

    it('makeOrderLine override wins over defaults', () => {
        const ol = makeOrderLine({ quantity: 5, currency: 'USD' })
        expect(ol.quantity).toBe(5)
        expect(ol.currency).toBe('USD')
    })

    it('makeServiceLine generates uuid + uid + default serviceType', () => {
        const sl = makeServiceLine()
        expect(typeof sl.uuid).toBe('string')
        expect(typeof sl.uid).toBe('string')
        expect(sl.serviceType.name).toBe('Repair')
    })

    it('makeOrder defaults orderLines + serviceLines to empty arrays', () => {
        const order = makeOrder()
        expect(order.orderLines).toEqual([])
        expect(order.serviceLines).toEqual([])
        expect(order.orderStatus.name).toBe('Open')
    })
})
