import { encodeURIWithStringify, generatePassword, truncateString } from '../index'

describe('generatePassword', () => {
  it('returns a 10-character string', () => {
    expect(generatePassword()).toHaveLength(10)
  })

  it('contains at least one uppercase letter', () => {
    // Run multiple times to account for shuffle randomness
    for (let i = 0; i < 10; i++) {
      expect(generatePassword()).toMatch(/[A-Z]/)
    }
  })

  it('contains at least one digit', () => {
    for (let i = 0; i < 10; i++) {
      expect(generatePassword()).toMatch(/[0-9]/)
    }
  })

  it('contains at least one special character', () => {
    for (let i = 0; i < 10; i++) {
      expect(generatePassword()).toMatch(/[._\-@!]/)
    }
  })
})

describe('truncateString', () => {
  it('returns empty string for undefined', () => {
    expect(truncateString(undefined)).toBe('')
  })

  it('returns empty string for empty string', () => {
    expect(truncateString('')).toBe('')
  })

  it('returns original string if shorter than default length', () => {
    expect(truncateString('short')).toBe('short')
  })

  it('truncates at default length (30) with ellipsis', () => {
    const longStr = 'a'.repeat(50)
    const result = truncateString(longStr)
    expect(result).toBe('a'.repeat(30) + '...')
  })

  it('truncates at custom length', () => {
    expect(truncateString('hello world', 5)).toBe('hello...')
  })

  it('returns original if exactly at length', () => {
    expect(truncateString('hello', 5)).toBe('hello')
  })
})

describe('encodeURIWithStringify', () => {
  it('encodes an object', () => {
    const result = encodeURIWithStringify({ a: 1 })
    expect(decodeURIComponent(result)).toBe('{"a":1}')
  })

  it('encodes an array', () => {
    const result = encodeURIWithStringify([1, 2])
    expect(decodeURIComponent(result)).toBe('[1,2]')
  })

  it('encodes a string', () => {
    const result = encodeURIWithStringify('hello')
    expect(decodeURIComponent(result)).toBe('"hello"')
  })
})
