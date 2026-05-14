import {
    isArray,
    isBoolean,
    isDefined,
    isNonEmptyArray,
    isNonEmptyString,
    isNull,
    isNumber,
    isObject,
    isString,
    isUndefined,
} from '../type-guards'

describe('isDefined', () => {
    it.each([
        [null, false],
        [undefined, false],
        [0, true],
        ['', true],
        [false, true],
        [{}, true],
    ])('isDefined(%p) -> %s', (input, expected) => {
        expect(isDefined(input)).toBe(expected)
    })
})

describe('isUndefined / isNull', () => {
    it('distinguishes undefined and null', () => {
        expect(isUndefined(undefined)).toBe(true)
        expect(isUndefined(null)).toBe(false)
        expect(isNull(null)).toBe(true)
        expect(isNull(undefined)).toBe(false)
    })
})

describe('isString', () => {
    it.each([
        ['hello', true],
        ['', true],
        [123, false],
        [null, false],
    ])('isString(%p) -> %s', (input, expected) => {
        expect(isString(input)).toBe(expected)
    })
})

describe('isNumber', () => {
    it.each([
        [0, true],
        [1.5, true],
        [-2, true],
        [NaN, false],
        ['1', false],
    ])('isNumber(%p) -> %s', (input, expected) => {
        expect(isNumber(input)).toBe(expected)
    })
})

describe('isBoolean', () => {
    it.each([
        [true, true],
        [false, true],
        [1, false],
        ['true', false],
    ])('isBoolean(%p) -> %s', (input, expected) => {
        expect(isBoolean(input)).toBe(expected)
    })
})

describe('isArray', () => {
    it('matches arrays not objects', () => {
        expect(isArray([])).toBe(true)
        expect(isArray([1, 2])).toBe(true)
        expect(isArray({})).toBe(false)
        expect(isArray('not')).toBe(false)
    })
})

describe('isObject', () => {
    it('matches plain objects, rejects arrays and null', () => {
        expect(isObject({})).toBe(true)
        expect(isObject({ a: 1 })).toBe(true)
        expect(isObject([])).toBe(false)
        expect(isObject(null)).toBe(false)
        expect(isObject('x')).toBe(false)
    })
})

describe('isNonEmptyString', () => {
    it('false for empty string and non-strings', () => {
        expect(isNonEmptyString('x')).toBe(true)
        expect(isNonEmptyString('')).toBe(false)
        expect(isNonEmptyString(123)).toBe(false)
    })
})

describe('isNonEmptyArray', () => {
    it('false for empty arrays and non-arrays', () => {
        expect(isNonEmptyArray([1])).toBe(true)
        expect(isNonEmptyArray([])).toBe(false)
        expect(isNonEmptyArray({})).toBe(false)
    })
})
