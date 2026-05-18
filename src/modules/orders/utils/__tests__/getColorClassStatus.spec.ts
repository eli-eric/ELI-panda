import { DELIVERY_STATUS, ORDER_STATUS } from '../../types'
import { getBadgeVariantByOrderStatus, getColorClassStatus } from '../getColorClassStatus'

const codebook = (uid: string) => ({ uid, name: uid })

describe('getColorClassStatus', () => {
    it('falls back to white when orderStatus missing', () => {
        expect(getColorClassStatus(undefined as any, DELIVERY_STATUS.COMPLETE)).toBe(
            'bg-white dark:bg-gray-800',
        )
    })

    it('lime for ORDER_COMPLETED + COMPLETE', () => {
        expect(
            getColorClassStatus(codebook(ORDER_STATUS.ORDER_COMPLETED), DELIVERY_STATUS.COMPLETE),
        ).toBe('bg-lime-400 dark:bg-green-800')
    })

    it('amber for ORDERED + PARTIAL', () => {
        expect(getColorClassStatus(codebook(ORDER_STATUS.ORDERED), DELIVERY_STATUS.PARTIAL)).toBe(
            'bg-amber-400 dark:bg-amber-700',
        )
    })

    it('falls back to white when deliveryStatus is NONE (current implementation: !0 is true)', () => {
        // Documented existing behavior: the truthiness check at the top of
        // getColorClassStatus short-circuits because DELIVERY_STATUS.NONE === 0.
        // ORDERED + NONE / PLANNED + NONE mappings are unreachable in practice.
        expect(getColorClassStatus(codebook(ORDER_STATUS.ORDERED), DELIVERY_STATUS.NONE)).toBe(
            'bg-white dark:bg-gray-800',
        )
        expect(getColorClassStatus(codebook(ORDER_STATUS.PLANNED), DELIVERY_STATUS.NONE)).toBe(
            'bg-white dark:bg-gray-800',
        )
    })
})

describe('getBadgeVariantByOrderStatus', () => {
    it('falls back to gray when orderStatus missing', () => {
        const fallback = getBadgeVariantByOrderStatus(undefined as any, DELIVERY_STATUS.COMPLETE)
        expect(fallback).toContain('border-gray-200')
    })

    it('returns green badge for ORDER_COMPLETED + COMPLETE', () => {
        const badge = getBadgeVariantByOrderStatus(
            codebook(ORDER_STATUS.ORDER_COMPLETED),
            DELIVERY_STATUS.COMPLETE,
        )
        expect(badge).toContain('border-green-600')
    })

    it('returns lime badge for ORDERED + COMPLETE', () => {
        const badge = getBadgeVariantByOrderStatus(
            codebook(ORDER_STATUS.ORDERED),
            DELIVERY_STATUS.COMPLETE,
        )
        expect(badge).toContain('border-lime-600')
    })

    it('returns amber badge for PARTIAL on any non-completed order', () => {
        const badge = getBadgeVariantByOrderStatus(
            codebook(ORDER_STATUS.ORDERED),
            DELIVERY_STATUS.PARTIAL,
        )
        expect(badge).toContain('border-amber-600')
    })

    it('falls back to gray for any DELIVERY_STATUS.NONE (same falsy-zero short-circuit)', () => {
        const badge = getBadgeVariantByOrderStatus(
            codebook(ORDER_STATUS.ORDERED),
            DELIVERY_STATUS.NONE,
        )
        expect(badge).toContain('border-gray-200')
    })
})
