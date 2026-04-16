import {
    convertDate,
    createMessageValues,
    formatDate,
    formatPhoneNumber,
    makeQuery,
} from '../formatters'

describe('formatPhoneNumber', () => {
    it('removes country code and formats with spaces', () => {
        expect(formatPhoneNumber('420123456789')).toBe('123 456 789')
    })

    it('handles number without proper country code (still slices first 3 chars)', () => {
        expect(formatPhoneNumber('000111222333')).toBe('111 222 333')
    })
})

describe('formatDate', () => {
    it('formats a valid date string', () => {
        const result = formatDate('2024-01-15T10:30:00Z')
        expect(result).toBeTruthy()
        expect(typeof result).toBe('string')
        // Intl.DateTimeFormat with 'en-US' locale, dateStyle: 'full', timeStyle: 'short'
        expect(result).toContain('2024')
        expect(result).toContain('January')
    })
})

describe('convertDate', () => {
    it('returns a formatted date string', () => {
        const result = convertDate('2024-06-15')
        expect(result).toBeTruthy()
        expect(typeof result).toBe('string')
        // moment format returns ISO-like string
        expect(result).toContain('2024')
    })

    it('handles Date object', () => {
        const result = convertDate(new Date('2024-06-15'))
        expect(result).toContain('2024')
    })
})

describe('makeQuery', () => {
    it('creates query string from object', () => {
        expect(makeQuery({ foo: 'bar', baz: '1' })).toBe('?foo=bar&baz=1')
    })

    it('handles empty object', () => {
        expect(makeQuery({})).toBe('?')
    })

    it('encodes special characters', () => {
        const result = makeQuery({ q: 'hello world' })
        expect(result).toBe('?q=hello+world')
    })
})

describe('createMessageValues', () => {
    it('includes messageFormatters in result', () => {
        const result = createMessageValues()
        expect(result).toHaveProperty('medium')
        expect(result).toHaveProperty('strong')
        expect(result).toHaveProperty('small')
        expect(result).toHaveProperty('underline')
        expect(result).toHaveProperty('label')
        expect(result).toHaveProperty('p')
    })

    it('passes through string values', () => {
        const result = createMessageValues({ name: 'test' })
        expect(result.name).toBe('test')
    })

    it('passes through number values', () => {
        const result = createMessageValues({ count: 42 })
        expect(result.count).toBe(42)
    })

    it('stringifies object values', () => {
        const result = createMessageValues({ data: { a: 1 } })
        expect(result.data).toBe('{"a":1}')
    })

    it('overrides formatters with custom values of same key', () => {
        const result = createMessageValues({ medium: 'custom' })
        expect(result.medium).toBe('custom')
    })
})
