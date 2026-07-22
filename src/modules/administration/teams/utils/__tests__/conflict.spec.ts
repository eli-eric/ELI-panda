import { formatRelatedNodes } from '../conflict'

describe('formatRelatedNodes', () => {
    it('formats related nodes as "Label (count)" joined by comma', () => {
        expect(
            formatRelatedNodes({
                errorMessage: 'blocked',
                relatedNodes: [
                    { label: 'System', count: 3 },
                    { label: 'RoomCard', count: 1 },
                ],
            }),
        ).toBe('System (3), RoomCard (1)')
    })

    it('returns empty string for a non-conforming body', () => {
        expect(formatRelatedNodes(undefined)).toBe('')
        expect(formatRelatedNodes({})).toBe('')
        expect(formatRelatedNodes({ relatedNodes: 'nope' })).toBe('')
    })

    it('skips nodes missing a numeric count', () => {
        expect(
            formatRelatedNodes({
                relatedNodes: [{ label: 'System' }, { label: 'RoomCard', count: 2 }],
            } as any),
        ).toBe('RoomCard (2)')
    })
})
