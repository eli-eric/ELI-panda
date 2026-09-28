import { useMemo, useState } from 'react'

import { isBlank } from '@/lib/predicates/data'
import { isObject } from '@/lib/predicates/type-guards'

import {
    WOS_IMPORTABLE_FIELDS,
    type WosImportableField,
    type WosImportValues,
    type WosImportWarning,
} from '../types/wos-preview.types'

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

/** Diffs incoming values against the form, one row per frozen field WoS said anything about. */
export const buildWosFieldRows = (
    values: WosImportValues,
    warnings: WosImportWarning[],
    currentValues: Record<string, unknown>,
): WosFieldRow[] =>
    WOS_IMPORTABLE_FIELDS.flatMap((field): WosFieldRow[] => {
        const incoming = values[field]
        const current = currentValues[field]
        const fieldWarnings = warnings.filter(warning => warning.field === field)
        if (isEmptyFormValue(incoming)) {
            return fieldWarnings.length > 0
                ? [{ field, current, incoming, status: 'warningOnly', warnings: fieldWarnings }]
                : []
        }
        const status: WosFieldRowStatus = isEmptyFormValue(current)
            ? 'empty'
            : identity(current) === identity(incoming)
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
    /** Read once, when the preview arrives; later edits do not reshuffle the review. */
    getValues: () => Record<string, unknown>
}

/** Field rows plus their selection: empty destinations start checked, overwrites never do. */
export const useWosFieldRows = ({ values, warnings, getValues }: Options) => {
    const [currentValues] = useState(getValues)
    const rows = useMemo(
        () => buildWosFieldRows(values, warnings, currentValues),
        [values, warnings, currentValues],
    )
    const [selected, setSelected] = useState(() => fieldsWhere(rows, row => row.status === 'empty'))

    const toggle = (field: WosImportableField, checked: boolean) =>
        setSelected(current => {
            const next = new Set(current)
            if (checked) next.add(field)
            else next.delete(field)
            return next
        })

    return {
        rows,
        selected,
        /** Checked rows that will actually change the form. */
        changes: rows.filter(row => isImportable(row) && selected.has(row.field)),
        toggle,
        selectAll: () => setSelected(fieldsWhere(rows, isImportable)),
        selectOnlyEmpty: () => setSelected(fieldsWhere(rows, row => row.status === 'empty')),
        selectNone: () => setSelected(new Set()),
    }
}
