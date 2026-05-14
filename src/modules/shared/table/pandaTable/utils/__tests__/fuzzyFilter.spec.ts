import { fuzzyFilter } from '../index'

const makeRow = (value: string, subRows: { value: string }[] = []) =>
    ({
        getValue: () => value,
        subRows: subRows.map(sub => ({
            getValue: () => sub.value,
        })),
    }) as any

describe('fuzzyFilter', () => {
    let addMeta: jest.Mock
    beforeEach(() => {
        addMeta = jest.fn()
    })

    it('passes a row that matches the search', () => {
        const result = fuzzyFilter(makeRow('Hello World'), 'name', 'hello', addMeta)
        expect(result).toBe(true)
        expect(addMeta).toHaveBeenCalledTimes(1)
    })

    it('rejects a row that does not match', () => {
        const result = fuzzyFilter(makeRow('Hello World'), 'name', 'zzz', addMeta)
        expect(result).toBe(false)
    })

    it('keeps parent row when a child row matches', () => {
        const row = makeRow('Parent', [{ value: 'Hello Child' }, { value: 'Another' }])
        expect(fuzzyFilter(row, 'name', 'hello', addMeta)).toBe(true)
        // addMeta is NOT called for parent because we short-circuit on subrow match
        expect(addMeta).not.toHaveBeenCalled()
    })

    it('still evaluates parent when no child matches', () => {
        const row = makeRow('Parent', [{ value: 'foo' }, { value: 'bar' }])
        const result = fuzzyFilter(row, 'name', 'parent', addMeta)
        expect(result).toBe(true)
        expect(addMeta).toHaveBeenCalledTimes(1)
    })

    it('handles rows without subRows safely', () => {
        const row = {
            getValue: () => 'standalone',
            subRows: undefined,
        } as any
        expect(fuzzyFilter(row, 'name', 'stand', addMeta)).toBe(true)
    })
})
