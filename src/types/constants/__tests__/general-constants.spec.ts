import { ORDER_LINE_DEFAULTS, SERVICE_LINE_DEFAULTS } from '../formDefaults'
import { ITEM_USAGE_FILTERS } from '../itemUsageFilters'
import { PATH, SUPPORT } from '../paths'

describe('ORDER_LINE_DEFAULTS', () => {
    it('defaults currency to EUR + itemUsage to STOCK_ITEM uid', () => {
        expect(ORDER_LINE_DEFAULTS.currency).toBe('EUR')
        expect(ORDER_LINE_DEFAULTS.itemUsage.uid).toBe('0c7a063d-2bb6-41ef-b808-a137e1deaaa0')
        expect(ORDER_LINE_DEFAULTS.itemUsage.name).toBe('Stock Item')
    })
})

describe('SERVICE_LINE_DEFAULTS', () => {
    it('defaults currency to EUR', () => {
        expect(SERVICE_LINE_DEFAULTS.currency).toBe('EUR')
    })
})

describe('ITEM_USAGE_FILTERS', () => {
    it('SERVICE_LINE_DEFAULT contains 6 unique uids', () => {
        const uids = ITEM_USAGE_FILTERS.SERVICE_LINE_DEFAULT
        expect(uids.length).toBe(6)
        expect(new Set(uids).size).toBe(uids.length)
        uids.forEach(uid => expect(uid).toMatch(/^[0-9a-f-]{36}$/))
    })
})

describe('PATH enum', () => {
    it('has stable web paths', () => {
        expect(PATH.ROOT).toBe('/')
        expect(PATH.DASHBOARD).toBe('/dashboard')
        expect(PATH.CATALOGUE).toBe('/catalogue')
        expect(PATH.SYSTEMS).toBe('/systems/overview')
        expect(PATH.NOT_FOUND).toBe('/404')
    })

    it('all paths are unique strings starting with /', () => {
        const values = Object.values(PATH)
        expect(new Set(values).size).toBe(values.length)
        values.forEach(p => expect(p.startsWith('/')).toBe(true))
    })
})

describe('SUPPORT', () => {
    it('is a mailto link to panda@eli-laser.eu with subject', () => {
        expect(SUPPORT.startsWith('mailto:')).toBe(true)
        expect(SUPPORT).toContain('panda@eli-laser.eu')
        expect(SUPPORT).toContain('subject=')
    })
})
