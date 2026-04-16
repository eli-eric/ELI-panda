import { schema } from '../OrderForm.schema'

const validOrder = {
    name: 'Order X',
    orderNumber: 'ORD-1',
    requestNumber: '',
    contractNumber: '',
}

describe('OrderForm schema', () => {
    it('accepts a valid order with orderNumber', async () => {
        await expect(schema.validate(validOrder)).resolves.toBeTruthy()
    })

    it('rejects missing name', async () => {
        await expect(schema.validate({ ...validOrder, name: '' })).rejects.toThrow(
            /name/i,
        )
    })

    it('accepts order with only requestNumber', async () => {
        const order = { name: 'X', requestNumber: 'REQ-1' }
        await expect(schema.validate(order)).resolves.toBeTruthy()
    })

    it('accepts order with only contractNumber', async () => {
        const order = { name: 'X', contractNumber: 'CON-1' }
        await expect(schema.validate(order)).resolves.toBeTruthy()
    })

    it('rejects when orderNumber/requestNumber/contractNumber all empty', async () => {
        const order = {
            name: 'X',
            orderNumber: '',
            requestNumber: '',
            contractNumber: '',
        }
        await expect(schema.validate(order)).rejects.toThrow(/At least one/i)
    })

    it('rejects when those three fields all omitted', async () => {
        const order = { name: 'X' }
        await expect(schema.validate(order)).rejects.toThrow(/At least one/i)
    })

    it('allows nullable supplier and orderStatus', async () => {
        const order = {
            ...validOrder,
            supplier: null,
            orderStatus: null,
        }
        await expect(schema.validate(order)).resolves.toBeTruthy()
    })
})
