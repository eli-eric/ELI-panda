import { HISTORY_TYPE } from '@/modules/systemItem/types/constants'

import { getHistoryTypeVisual } from '../historyFeed.visuals'

describe('getHistoryTypeVisual', () => {
    it.each([HISTORY_TYPE.GENERAL, HISTORY_TYPE.ITEM, HISTORY_TYPE.MOVE, HISTORY_TYPE.ITEM_MOVE])(
        'returns a populated visual for %s',
        type => {
            const v = getHistoryTypeVisual(type)
            expect(v).toBeDefined()
            expect(typeof v.badgeClassName).toBe('string')
            expect(v.badgeClassName.length).toBeGreaterThan(0)
            expect(v.icon).toBeDefined()
            expect(typeof v.iconClassName).toBe('string')
        },
    )

    it('returns the default visual for an unknown type', () => {
        const v = getHistoryTypeVisual('NOT_A_REAL_TYPE' as any)
        expect(v.badgeClassName).toContain('bg-muted')
        expect(v.iconClassName).toContain('text-muted-foreground')
    })

    it('distinguishes ITEM and MOVE visuals', () => {
        const item = getHistoryTypeVisual(HISTORY_TYPE.ITEM)
        const move = getHistoryTypeVisual(HISTORY_TYPE.MOVE)
        expect(item.badgeClassName).not.toBe(move.badgeClassName)
    })
})
