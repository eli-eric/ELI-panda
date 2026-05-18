import { orderLineWizardSchema } from '../schema'

const validBase = {
    name: 'Widget',
    catalogueNumber: 'PN-1',
    quantity: 5,
}

describe('orderLineWizardSchema', () => {
    it('accepts the minimum valid payload (quantity only)', () => {
        const r = orderLineWizardSchema.safeParse(validBase)
        expect(r.success).toBe(true)
    })

    it('accepts serialNumbers instead of quantity', () => {
        const r = orderLineWizardSchema.safeParse({
            name: 'W',
            catalogueNumber: 'PN-1',
            serialNumbers: 'SN1, SN2',
        })
        expect(r.success).toBe(true)
    })

    it('rejects when neither quantity nor serialNumbers is provided', () => {
        const r = orderLineWizardSchema.safeParse({
            name: 'W',
            catalogueNumber: 'PN-1',
        })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(
                r.error.issues.some(i =>
                    i.message?.toString().includes('Either Quantity or Serial Numbers'),
                ),
            ).toBe(true)
        }
    })

    it('rejects when both quantity AND serialNumbers are provided', () => {
        const r = orderLineWizardSchema.safeParse({
            name: 'W',
            catalogueNumber: 'PN-1',
            quantity: 2,
            serialNumbers: 'SN1, SN2',
        })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(r.error.issues.some(i => i.message?.toString().includes('not both'))).toBe(true)
        }
    })

    it('rejects duplicate serialNumbers', () => {
        const r = orderLineWizardSchema.safeParse({
            name: 'W',
            catalogueNumber: 'PN-1',
            serialNumbers: 'SN1, SN1, SN2',
        })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(r.error.issues.some(i => i.message?.toString().includes('unique'))).toBe(true)
        }
    })

    it('rejects more than 100 serialNumbers', () => {
        const many = Array.from({ length: 101 }, (_, i) => `SN${i}`).join(', ')
        const r = orderLineWizardSchema.safeParse({
            name: 'W',
            catalogueNumber: 'PN-1',
            serialNumbers: many,
        })
        expect(r.success).toBe(false)
    })

    it('coerces empty string price/quantity to undefined and treats as missing', () => {
        const r = orderLineWizardSchema.safeParse({
            name: 'W',
            catalogueNumber: 'PN-1',
            price: '',
            quantity: '',
            serialNumbers: 'A',
        })
        expect(r.success).toBe(true)
    })

    it('rejects quantity above 100', () => {
        const r = orderLineWizardSchema.safeParse({ ...validBase, quantity: 101 })
        expect(r.success).toBe(false)
    })

    it('defaults currency to EUR', () => {
        const r = orderLineWizardSchema.safeParse(validBase)
        if (r.success) {
            expect(r.data.currency).toBe('EUR')
        }
    })

    it('passes through unknown wizard-only fields', () => {
        const r = orderLineWizardSchema.safeParse({
            ...validBase,
            _selectedCatalogueItem: { uid: 'x', name: 'X' },
            globalParentSystem: { uid: 'p', name: 'Parent' },
            systemConfigs: [
                {
                    index: 0,
                    itemName: 'first',
                    parentSystem: null,
                    systemType: 'new',
                    systemName: 'NewSys',
                },
            ],
        })
        expect(r.success).toBe(true)
    })

    it('rejects invalid systemConfig (unknown systemType)', () => {
        const r = orderLineWizardSchema.safeParse({
            ...validBase,
            systemConfigs: [
                {
                    index: 0,
                    itemName: 'x',
                    parentSystem: null,
                    systemType: 'unknown',
                    systemName: 'a',
                },
            ],
        })
        expect(r.success).toBe(false)
    })
})
