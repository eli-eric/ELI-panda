/**
 * Common Data Predicates
 * Use these predicates for common data checks
 */

// Null/undefined/empty checks
export const isEmpty = (value: unknown): boolean =>
  value === null || value === undefined || value === ''

export const isNotEmpty = (value: unknown): boolean => !isEmpty(value)

export const hasValue = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined

export const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value === null || value === undefined

// Array checks
export const isEmptyArray = (arr: unknown[]): boolean => arr.length === 0

export const hasItems = <T>(arr: T[]): boolean => arr.length > 0

// Object checks
export const isEmptyObject = (obj: Record<string, unknown>): boolean =>
  Object.keys(obj).length === 0

export const hasProperties = (obj: Record<string, unknown>): boolean =>
  Object.keys(obj).length > 0
