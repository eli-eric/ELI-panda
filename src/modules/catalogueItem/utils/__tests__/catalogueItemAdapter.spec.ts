import { mapAPIItemToUIItem, mapUIItemToAPIItem } from '../catalogueItemAdapter'

const apiItem = {
    uid: 'u1',
    name: 'Widget',
    catalogueNumber: 'PN-1',
    description: 'desc',
    category: { uid: 'c', name: 'Cat' },
    supplier: { uid: 's', name: 'Sup' },
    manufacturerUrl: 'https://x',
    lastUpdateTime: '2026-01-01',
    details: [],
} as any

describe('mapAPIItemToUIItem', () => {
    it('maps fields and copies passthroughs', () => {
        const ui = mapAPIItemToUIItem(apiItem)
        expect(ui.uid).toBe('u1')
        expect(ui.name).toBe('Widget')
        expect(ui.catalogueNumber).toBe('PN-1')
        expect(ui.description).toBe('desc')
        expect(ui.category).toEqual({ uid: 'c', name: 'Cat' })
        expect(ui.supplier).toEqual({ uid: 's', name: 'Sup' })
        expect(ui.manufacturerUrl).toBe('https://x')
        expect(ui.lastUpdateBy).toBe('system')
        expect(ui.miniImageUrl).toBeUndefined()
    })

    it('defaults description to empty string, category to empty codebook, manufacturerUrl to empty', () => {
        const ui = mapAPIItemToUIItem({
            uid: 'u',
            name: 'X',
            catalogueNumber: 'p',
        } as any)
        expect(ui.description).toBe('')
        expect(ui.category).toEqual({ uid: '', name: '' })
        expect(ui.manufacturerUrl).toBe('')
        expect(ui.supplier).toBeUndefined()
    })
})

describe('mapUIItemToAPIItem', () => {
    it('maps required fields and copies passthroughs', () => {
        const ui = {
            uid: 'u1',
            name: 'Widget',
            catalogueNumber: 'PN-1',
            description: 'desc',
            category: { uid: 'c', name: 'Cat' },
            supplier: { uid: 's', name: 'Sup' },
            manufacturerUrl: 'https://x',
            lastUpdateTime: '2026-01-01',
            details: [],
        } as any
        const api = mapUIItemToAPIItem(ui)
        expect(api.uid).toBe('u1')
        expect(api.name).toBe('Widget')
        expect(api.catalogueNumber).toBe('PN-1')
        expect(api.description).toBe('desc')
        expect(api.manufacturerUrl).toBe('https://x')
    })

    it('omits empty description / manufacturerUrl as undefined', () => {
        const api = mapUIItemToAPIItem({
            uid: 'u',
            name: 'X',
            catalogueNumber: 'p',
            description: '',
            category: { uid: 'c', name: 'Cat' },
            manufacturerUrl: '',
        } as any)
        expect(api.description).toBeUndefined()
        expect(api.manufacturerUrl).toBeUndefined()
    })
})
