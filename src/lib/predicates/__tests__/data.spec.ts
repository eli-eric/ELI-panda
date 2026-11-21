import {
    hasItems,
    hasProperties,
    hasValue,
    isBlank,
    isEmpty,
    isEmptyArray,
    isEmptyObject,
    isNotEmpty,
    isNullOrUndefined,
} from '../data'

describe('isEmpty / isNotEmpty', () => {
    it.each([
        [null, true],
        [undefined, true],
        ['', true],
        [0, false],
        ['foo', false],
        [false, false],
        [[], false],
        [{}, false],
    ])('isEmpty(%p) -> %s', (input, expected) => {
        expect(isEmpty(input)).toBe(expected)
        expect(isNotEmpty(input)).toBe(!expected)
    })
})

describe('isBlank', () => {
    it.each([
        [null, true],
        [undefined, true],
        ['', true],
        [' \t\n', true],
        [' value ', false],
        [0, false],
        [false, false],
        [[], false],
        [{}, false],
    ])('isBlank(%p) -> %s', (input, expected) => {
        expect(isBlank(input)).toBe(expected)
    })
})

describe('hasValue', () => {
    it.each([
        [null, false],
        [undefined, false],
        [0, true],
        ['', true],
        [false, true],
        [{}, true],
    ])('hasValue(%p) -> %s', (input, expected) => {
        expect(hasValue(input)).toBe(expected)
    })
})

describe('isNullOrUndefined', () => {
    it.each([
        [null, true],
        [undefined, true],
        [0, false],
        ['', false],
        [false, false],
    ])('isNullOrUndefined(%p) -> %s', (input, expected) => {
        expect(isNullOrUndefined(input)).toBe(expected)
    })
})

describe('isEmptyArray / hasItems', () => {
    it('classify empty vs populated arrays', () => {
        expect(isEmptyArray([])).toBe(true)
        expect(isEmptyArray([1])).toBe(false)
        expect(hasItems([])).toBe(false)
        expect(hasItems([1])).toBe(true)
    })
})

describe('isEmptyObject / hasProperties', () => {
    it('classify object key counts', () => {
        expect(isEmptyObject({})).toBe(true)
        expect(isEmptyObject({ a: 1 })).toBe(false)
        expect(hasProperties({})).toBe(false)
        expect(hasProperties({ a: 1 })).toBe(true)
    })
})
