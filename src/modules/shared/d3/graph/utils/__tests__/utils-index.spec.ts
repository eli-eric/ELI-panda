import { getLinkMetrics, getNodeColor } from '../index'

describe('getNodeColor', () => {
    it.each([
        ['CatalogueItem', '#FFC300'],
        ['System', '#d97706'],
        ['User', '#16a34a'],
        ['Zone', '#ED9121'],
    ])('returns specific color for known label %s', (label, expected) => {
        expect(getNodeColor(label)).toBe(expected)
    })

    it('returns the default gray for unknown / empty labels', () => {
        expect(getNodeColor('NotALabel')).toBe('#6b7280')
        expect(getNodeColor('')).toBe('#6b7280')
    })
})

describe('getLinkMetrics', () => {
    const link = (source: string, target: string) => ({ source, target })

    it('reports total/index/offset 0 for a single unique link', () => {
        const links = [link('a', 'b')]
        const m = getLinkMetrics(links[0], links)
        expect(m).toEqual({ totalLinks: 1, linkIndex: 0, labelOffset: 0 })
    })

    it('counts parallel links (same source/target) and applies offset', () => {
        const a = link('a', 'b')
        const b = link('a', 'b')
        const links = [a, b]
        expect(getLinkMetrics(a, links).totalLinks).toBe(2)
        expect(getLinkMetrics(b, links).totalLinks).toBe(2)
        expect(getLinkMetrics(a, links).labelOffset).toBe((0 - 0.5) * 20)
        expect(getLinkMetrics(b, links).labelOffset).toBe((1 - 0.5) * 20)
    })

    it('counts mirror links (reversed direction) too', () => {
        const a = link('a', 'b')
        const b = link('b', 'a')
        const links = [a, b]
        expect(getLinkMetrics(a, links).totalLinks).toBe(2)
    })
})
