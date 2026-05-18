import { BATCH_LIMIT, ONLY_ROOT_ZONES } from '../constants'

describe('control-systems constants', () => {
    it('BATCH_LIMIT is a positive integer', () => {
        expect(typeof BATCH_LIMIT).toBe('number')
        expect(BATCH_LIMIT).toBeGreaterThan(0)
        expect(Number.isInteger(BATCH_LIMIT)).toBe(true)
    })

    it('ONLY_ROOT_ZONES applies the onlyRootElements filter', () => {
        expect(ONLY_ROOT_ZONES).toEqual([{ key: 'onlyRootElements', value: true }])
    })
})
