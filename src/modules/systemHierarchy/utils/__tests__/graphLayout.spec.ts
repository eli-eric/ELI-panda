import { applyHorizontalLayout, applyVerticalLayout } from '../graphLayout'

const node = (id: string) =>
    ({ id, position: { x: 0, y: 0 }, data: {} }) as any

const edge = (id: string, source: string, target: string) =>
    ({ id, source, target, data: { relationship: 'HAS_SUBSYSTEM' } }) as any

describe('graphLayout', () => {
    describe('applyVerticalLayout', () => {
        it('returns empty array for empty input', () => {
            expect(applyVerticalLayout([], [])).toEqual([])
        })

        it('roots have y=0; children at y=150', () => {
            const nodes = [node('a'), node('b')]
            const edges = [edge('e1', 'a', 'b')]
            const result = applyVerticalLayout(nodes, edges)
            const a = result.find(n => n.id === 'a')!
            const b = result.find(n => n.id === 'b')!
            expect(a.position.y).toBe(0)
            expect(b.position.y).toBe(150)
        })

        it('places sibling nodes at staggered x values', () => {
            const nodes = [node('a'), node('b1'), node('b2')]
            const edges = [edge('e1', 'a', 'b1'), edge('e2', 'a', 'b2')]
            const result = applyVerticalLayout(nodes, edges)
            const b1 = result.find(n => n.id === 'b1')!
            const b2 = result.find(n => n.id === 'b2')!
            expect(b1.position.x).not.toBe(b2.position.x)
        })

        it('all nodes get a position even without edges', () => {
            const nodes = [node('a'), node('b'), node('c')]
            const result = applyVerticalLayout(nodes, [])
            result.forEach(n => {
                expect(typeof n.position.x).toBe('number')
                expect(typeof n.position.y).toBe('number')
            })
        })
    })

    describe('applyHorizontalLayout', () => {
        it('returns empty array for empty input', () => {
            expect(applyHorizontalLayout([], [])).toEqual([])
        })

        it('levels increase along x axis', () => {
            const nodes = [node('a'), node('b')]
            const edges = [edge('e1', 'a', 'b')]
            const result = applyHorizontalLayout(nodes, edges)
            const a = result.find(n => n.id === 'a')!
            const b = result.find(n => n.id === 'b')!
            expect(a.position.x).toBe(0)
            expect(b.position.x).toBe(280)
        })

        it('siblings get distinct y values', () => {
            const nodes = [node('a'), node('b1'), node('b2')]
            const edges = [edge('e1', 'a', 'b1'), edge('e2', 'a', 'b2')]
            const result = applyHorizontalLayout(nodes, edges)
            const b1 = result.find(n => n.id === 'b1')!
            const b2 = result.find(n => n.id === 'b2')!
            // both children are at same BFS level, so their y differs
            expect(b1.position.y).not.toBe(b2.position.y)
        })
    })
})
