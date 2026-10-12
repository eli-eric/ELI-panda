import { isBlank } from '@/lib/predicates/data'
import { isObject } from '@/lib/predicates/type-guards'
import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'

import { MEDIA_TYPE_UID } from '../../types/constants'
import type { WosImportValues } from '../types/wos-preview.types'

/** The form field an incoming ISBN lands in; the visible one depends on media type. */
export type WosIsbnTarget = 'isbn' | 'proceedingsIsbn'

/** Reads optional form researcher selections without inventing an author list. */
export const getCurrentResearchers = (value: unknown): SelectedResearcher[] =>
    Array.isArray(value) ? value : []

/** Detects a change to ordered researcher UIDs before marking form fields dirty. */
export const researchersDiffer = (
    current: SelectedResearcher[],
    incoming: SelectedResearcher[],
): boolean =>
    current.length !== incoming.length ||
    current.some((researcher, index) => researcher.uid !== incoming[index]?.uid)

/**
 * Routes ISBN by the effective media-type UID: the form renders `isbn` only for
 * book chapters, so for conference proceedings the value must land in
 * `proceedingsIsbn` — otherwise it sits in a hidden field and the visible one
 * stays empty. The incoming codebook counts only when its row is selected.
 */
export const resolveWosIsbnTarget = (
    currentValues: Record<string, unknown>,
    values: WosImportValues,
    selectedFields: ReadonlySet<string>,
): WosIsbnTarget => {
    const mediaType = selectedFields.has('mediaTypeCb')
        ? values.mediaTypeCb
        : currentValues.mediaTypeCb

    return typeof mediaType === 'object' &&
        mediaType !== null &&
        'uid' in mediaType &&
        mediaType.uid === MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS
        ? 'proceedingsIsbn'
        : 'isbn'
}

/** Formats scalar, codebook and researcher-list values for the import comparison rows. */
export const displayWosValue = (value: unknown, emptyLabel: string): string => {
    if (isBlank(value) || (Array.isArray(value) && value.length === 0)) return emptyLabel
    if (Array.isArray(value))
        return getCurrentResearchers(value)
            .map(researcher => `${researcher.lastName}, ${researcher.firstName}`)
            .join('; ')
    if (isObject(value) && 'name' in value) return String(value.name)
    return String(value)
}
