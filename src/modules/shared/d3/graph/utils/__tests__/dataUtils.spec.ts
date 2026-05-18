import type { GraphNode, SystemGraphResponse } from '../../types'
import { prepareGraphData } from '../dataUtils'

describe('prepareGraphData', () => {
    const node = (uid: string): GraphNode => ({ uid, name: `n-${uid}` }) as any

    it('resolves source/target uids into node references', () => {
        const data: SystemGraphResponse = {
            nodes: [node('a'), node('b'), node('c')],
            links: [
                { source: 'a', target: 'b' } as any,
                { source: 'b', target: 'c' } as any,
            ],
        }
        const out = prepareGraphData(data)
        expect(out.nodes).toEqual(data.nodes)
        expect(out.links).toHaveLength(2)
        expect((out.links[0].source as GraphNode).uid).toBe('a')
        expect((out.links[0].target as GraphNode).uid).toBe('b')
        expect((out.links[1].source as GraphNode).uid).toBe('b')
        expect((out.links[1].target as GraphNode).uid).toBe('c')
    })

    it('returns undefined references for missing node uids', () => {
        const data: SystemGraphResponse = {
            nodes: [node('a')],
            links: [{ source: 'a', target: 'missing' } as any],
        }
        const out = prepareGraphData(data)
        expect((out.links[0].source as GraphNode).uid).toBe('a')
        expect(out.links[0].target).toBeUndefined()
    })

    it('handles empty inputs', () => {
        const out = prepareGraphData({ nodes: [], links: [] })
        expect(out).toEqual({ nodes: [], links: [] })
    })

    it('preserves extra link fields (besides source/target)', () => {
        const data: SystemGraphResponse = {
            nodes: [node('a'), node('b')],
            links: [{ source: 'a', target: 'b', type: 'belongs' } as any],
        }
        const out = prepareGraphData(data)
        expect((out.links[0] as any).type).toBe('belongs')
    })
})
