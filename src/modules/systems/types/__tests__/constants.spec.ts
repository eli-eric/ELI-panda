import { ITEM_USAGE, ITEM_USAGE_NAME, ITEM_USAGE_OPTION } from '../constants'

describe('ITEM_USAGE constants', () => {
    it('every ITEM_USAGE_OPTION pairs uid with the matching name', () => {
        for (const key of Object.keys(ITEM_USAGE_OPTION) as Array<
            keyof typeof ITEM_USAGE_OPTION
        >) {
            const option = ITEM_USAGE_OPTION[key]
            expect(option.uid).toBe(ITEM_USAGE[key])
            expect(option.name).toBe(ITEM_USAGE_NAME[key])
        }
    })

    it('all ITEM_USAGE uids are unique', () => {
        const uids = Object.values(ITEM_USAGE)
        expect(new Set(uids).size).toBe(uids.length)
    })

    it('all ITEM_USAGE_NAMEs are unique', () => {
        const names = Object.values(ITEM_USAGE_NAME)
        expect(new Set(names).size).toBe(names.length)
    })
})
