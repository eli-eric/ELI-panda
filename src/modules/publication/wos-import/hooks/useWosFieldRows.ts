import { useMemo, useState } from 'react'

import { isBlank } from '@/lib/predicates/data'
import { isObject } from '@/lib/predicates/type-guards'

import {
    WOS_IMPORTABLE_FIELDS,
    type WosImportableField,
    type WosImportValues,
    type WosImportWarning,
} from '../types/wos-preview.types'
import { resolveWosIsbnTarget, type WosIsbnTarget } from '../utils/wos-import'

/**
 * - `empty`: the form field is blank; importing fills it (pre-checked)
 * - `overwrite`: the form holds a different value; importing replaces it (unchecked)
 * - `same`: the form already holds the incoming value; nothing to import
 * - `warningOnly`: WoS had a value it could not map; the row only explains why
 */
export type WosFieldRowStatus = 'empty' | 'overwrite' | 'same' | 'warningOnly'

export interface WosFieldRow {
    field: WosImportableField
    current: unknown
    incoming: unknown
    status: WosFieldRowStatus
    warnings: WosImportWarning[]
}

const isEmptyFormValue = (value: unknown): boolean =>
    isBlank(value) || (Array.isArray(value) && value.length === 0)

const identity = (value: unknown): string => {
    if (Array.isArray(value)) return value.map(identity).join('\n')
    if (isObject(value) && 'uid' in value) return String(value.uid)
    return String(value).trim()
}

// DOIs are case-insensitive by definition; WoS's canonical casing of the DOI
// the user just typed is the same value, not an overwrite.
const fieldIdentity = (field: WosImportableField, value: unknown): string =>
    field === 'doi' ? identity(value).toLowerCase() : identity(value)

/**
 * Diffs incoming values against the form, one row per frozen field WoS said
 * anything about. The ISBN row compares against the field the value will
 * actually land in (`isbn` or `proceedingsIsbn`), not always `isbn`.
 */
export const buildWosFieldRows = (
    values: WosImportValues,
    warnings: WosImportWarning[],
    currentValues: Record<string, unknown>,
    isbnTarget: WosIsbnTarget = 'isbn',
): WosFieldRow[] =>
    WOS_IMPORTABLE_FIELDS.flatMap((field): WosFieldRow[] => {
        const incoming = values[field]
        const current = field === 'isbn' ? currentValues[isbnTarget] : currentValues[field]
        const fieldWarnings = warnings.filter(warning => warning.field === field)
        if (isEmptyFormValue(incoming)) {
            return fieldWarnings.length > 0
                ? [{ field, current, incoming, status: 'warningOnly', warnings: fieldWarnings }]
                : []
        }
        const status: WosFieldRowStatus = isEmptyFormValue(current)
            ? 'empty'
            : fieldIdentity(field, current) === fieldIdentity(field, incoming)
              ? 'same'
              : 'overwrite'
        return [{ field, current, incoming, status, warnings: fieldWarnings }]
    })

const isImportable = (row: WosFieldRow) => row.status === 'empty' || row.status === 'overwrite'

const fieldsWhere = (rows: WosFieldRow[], predicate: (row: WosFieldRow) => boolean) =>
    new Set(rows.filter(predicate).map(row => row.field))

interface Options {
    values: WosImportValues
    warnings: WosImportWarning[]
    /** Snapshot taken when the preview opens; later edits do not reshuffle the review. */
    currentValues: Record<string, unknown>
}

/** Field rows plus their selection: empty destinations start checked, overwrites never do. */
export const useWosFieldRows = ({ values, warnings, currentValues }: Options) => {
    const selectFields = (predicate: (row: WosFieldRow) => boolean) => {
        // Decide the media-type selection before classifying the ISBN destination.
        const candidates = fieldsWhere(
            buildWosFieldRows(values, warnings, currentValues),
            predicate,
        )
        const target = resolveWosIsbnTarget(currentValues, values, candidates)
        return fieldsWhere(buildWosFieldRows(values, warnings, currentValues, target), predicate)
    }
    const [selection, setSelection] = useState<ReadonlySet<WosImportableField>>(() =>
        selectFields(row => row.status === 'empty'),
    )

    const isbnTarget = resolveWosIsbnTarget(currentValues, values, selection)
    const rows = useMemo(
        () => buildWosFieldRows(values, warnings, currentValues, isbnTarget),
        [values, warnings, currentValues, isbnTarget],
    )

    const toggle = (field: WosImportableField, checked: boolean) =>
        setSelection(current => {
            const next = new Set(current)
            if (checked) next.add(field)
            else next.delete(field)
            if (
                field === 'mediaTypeCb' &&
                resolveWosIsbnTarget(currentValues, values, current) !==
                    resolveWosIsbnTarget(currentValues, values, next)
            ) {
                // Consent to one destination must not silently carry to another.
                next.delete('isbn')
            }
            return next
        })

    return {
        rows,
        selected: selection,
        isbnTarget,
        /** Checked rows that will actually change the form. */
        changes: rows.filter(row => isImportable(row) && selection.has(row.field)),
        toggle,
        selectAll: () => setSelection(selectFields(isImportable)),
        selectOnlyEmpty: () => setSelection(selectFields(row => row.status === 'empty')),
        selectNone: () => setSelection(new Set()),
    }
}
