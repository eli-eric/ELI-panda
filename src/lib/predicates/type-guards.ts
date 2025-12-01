/**
 * Type Guard Predicates
 * Use these predicates for TypeScript type narrowing
 */

// Basic type guards
export const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined

export const isUndefined = (value: unknown): value is undefined =>
  value === undefined

export const isNull = (value: unknown): value is null => value === null

export const isString = (value: unknown): value is string =>
  typeof value === 'string'

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number' && !isNaN(value)

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean'

export const isArray = <T>(value: unknown): value is T[] =>
  Array.isArray(value)

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

// Advanced type guards
export const isNonEmptyString = (value: unknown): value is string =>
  isString(value) && value.length > 0

export const isNonEmptyArray = <T>(value: unknown): value is T[] =>
  isArray(value) && value.length > 0
