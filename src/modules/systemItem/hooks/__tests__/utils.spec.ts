import { makeSystemInputBody, pruneSystemDetail } from '../utils'

describe('makeSystemInputBody (create)', () => {
    it('uses connect-only for create with minimal payload', () => {
        const result = makeSystemInputBody({
            systemForm: { name: 'S', description: 'D', systemCode: 'C01' } as any,
            isCreate: true,
        })
        expect(result.name).toBe('S')
        expect(result.systemCode).toBe('C01')
        // No connect for null codebooks
        expect(result.attribute).toBeUndefined()
        expect(result.systemType).toBeUndefined()
        // physicalItem omitted when not provided
        expect(result.physicalItem).toBeUndefined()
    })

    it('coerces empty systemCode to null', () => {
        const result = makeSystemInputBody({
            systemForm: { systemCode: '' } as any,
            isCreate: true,
        })
        expect(result.systemCode).toBeNull()
    })

    it('coerces empty minimalSpareParstCount to null, parses non-empty as Number', () => {
        const empty = makeSystemInputBody({
            systemForm: { minimalSpareParstCount: 0 } as any,
            isCreate: true,
        })
        expect(empty.minimalSpareParstCount).toBeNull()
        const real = makeSystemInputBody({
            systemForm: { minimalSpareParstCount: '7' } as any,
            isCreate: true,
        })
        expect(real.minimalSpareParstCount).toBe(7)
    })

    it('connects attribute / systemType / location when uid provided', () => {
        const result = makeSystemInputBody({
            systemForm: {
                attribute: { uid: 'a' },
                systemType: { uid: 'st' },
                location: { uid: 'l' },
            } as any,
            isCreate: true,
        })
        expect(result.attribute).toEqual({
            connect: { where: { node: { uid: 'a' } } },
        })
        expect(result.systemType).toEqual({
            connect: { where: { node: { uid: 'st' } } },
        })
        expect(result.location).toEqual({
            connect: { where: { node: { uid: 'l' } } },
        })
    })

    it('wraps physicalItem in update node with nested connects', () => {
        const result = makeSystemInputBody({
            systemForm: {
                physicalItem: {
                    notes: 'n',
                    serialNumber: 'sn',
                    itemUsage: { uid: 'iu' },
                    conditionStatus: { uid: 'cs' },
                },
            } as any,
            isCreate: true,
        })
        const pi = result.physicalItem as any
        expect(pi.update.node.notes).toBe('n')
        expect(pi.update.node.itemUsage).toEqual({
            connect: { where: { node: { uid: 'iu' } } },
        })
        expect(pi.update.node.conditionStatus).toEqual({
            connect: { where: { node: { uid: 'cs' } } },
        })
    })
})

describe('makeSystemInputBody (update)', () => {
    it('uses connectAndDisconnect for codebooks (update path)', () => {
        const result = makeSystemInputBody({
            systemForm: {
                name: 'S',
                attribute: { uid: 'new-a' },
            } as any,
            systemDetail: { attribute: { uid: 'old-a' } } as any,
            isCreate: false,
        })
        // connectAndDisconnectNode produces { connect: { where: { node: { uid: 'new-a' } } }, disconnect: { where: { node: { uid: 'old-a' } } } }
        const attr = result.attribute as any
        expect(attr.connect.where.node.uid).toBe('new-a')
        expect(attr.disconnect.where.node.uid).toBe('old-a')
    })

    it('always emits physicalItem.update wrapper on update (even when undefined)', () => {
        const result = makeSystemInputBody({
            systemForm: { name: 'X' } as any,
            systemDetail: {} as any,
            isCreate: false,
        })
        expect(result.physicalItem).toEqual({ update: undefined })
    })
})

describe('pruneSystemDetail', () => {
    it('returns flat { uid, children: undefined } for leaf', () => {
        expect(pruneSystemDetail({ uid: 'a' } as any)).toEqual({
            uid: 'a',
            children: undefined,
        })
    })

    it('prunes recursively keeping only uid + children', () => {
        const tree = {
            uid: 'a',
            name: 'A',
            subSystems: [
                { uid: 'b', name: 'B', subSystems: [{ uid: 'c', name: 'C' }] },
                { uid: 'd', name: 'D' },
            ],
        } as any
        expect(pruneSystemDetail(tree)).toEqual({
            uid: 'a',
            children: [
                { uid: 'b', children: [{ uid: 'c', children: undefined }] },
                { uid: 'd', children: undefined },
            ],
        })
    })
})
