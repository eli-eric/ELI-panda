import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'

import { MEDIA_TYPE_UID } from '../types/constants'
import type {
    PublicationWosAuthor,
    PublicationWosFieldRow,
    PublicationWosImportField,
    PublicationWosImportValues,
} from '../types/wos-import'
import { PUBLICATION_WOS_IMPORT_FIELDS } from '../types/wos-import'

/** Checks absence without mistaking numeric zero for an empty field. */
const isBlank = (value: unknown): boolean =>
    value === undefined || value === null || (typeof value === 'string' && value.trim() === '')

/** Compares codebooks by UID and scalar values by their trimmed form representation. */
const isSameValue = (currentValue: unknown, incomingValue: unknown): boolean => {
    if (
        typeof currentValue === 'object' &&
        currentValue !== null &&
        typeof incomingValue === 'object' &&
        incomingValue !== null &&
        'uid' in currentValue &&
        'uid' in incomingValue
    ) {
        return currentValue.uid === incomingValue.uid
    }

    return String(currentValue).trim() === String(incomingValue).trim()
}

/** Builds comparison rows; only empty destinations are selected by default. */
export const buildWosFieldRows = (
    currentValues: Record<string, unknown>,
    incomingValues: PublicationWosImportValues,
): PublicationWosFieldRow[] =>
    PUBLICATION_WOS_IMPORT_FIELDS.flatMap(field => {
        const incomingValue = incomingValues[field]
        if (isBlank(incomingValue)) return []

        const currentValue = currentValues[field]
        const currentIsBlank = isBlank(currentValue)
        const same = !currentIsBlank && isSameValue(currentValue, incomingValue)

        return [
            {
                field,
                currentValue,
                incomingValue,
                selectedByDefault: currentIsBlank,
                status: same ? 'same' : currentIsBlank ? 'empty' : 'different',
            },
        ]
    })

/** Copies only explicitly selected, present values from supported import fields. */
export const buildWosFieldPatch = (
    incomingValues: PublicationWosImportValues,
    selectedFields: PublicationWosImportField[],
): PublicationWosImportValues => {
    const selected = new Set(selectedFields)

    return Object.fromEntries(
        PUBLICATION_WOS_IMPORT_FIELDS.flatMap(field => {
            const value = incomingValues[field]
            return selected.has(field) && !isBlank(value) ? [[field, value]] : []
        }),
    ) as PublicationWosImportValues
}

/** Routes ISBN using the effective media-type UID, including API values without a code. */
export const getWosIsbnTargetField = (
    currentValues: Record<string, unknown>,
    incomingValues: PublicationWosImportValues,
    selectedFields: PublicationWosImportField[],
): 'isbn' | 'proceedingsIsbn' => {
    const mediaType = selectedFields.includes('mediaTypeCb')
        ? incomingValues.mediaTypeCb
        : currentValues.mediaTypeCb

    return typeof mediaType === 'object' &&
        mediaType !== null &&
        'uid' in mediaType &&
        mediaType.uid === MEDIA_TYPE_UID.CONFERENCE_PROCEEDINGS
        ? 'proceedingsIsbn'
        : 'isbn'
}

/** Compares incoming ISBN against the destination field for the selected media type. */
export const buildWosComparisonValues = (
    currentValues: Record<string, unknown>,
    incomingValues: PublicationWosImportValues,
    selectedFields: PublicationWosImportField[],
): Record<string, unknown> => {
    const isbnTarget = getWosIsbnTargetField(currentValues, incomingValues, selectedFields)
    return { ...currentValues, isbn: currentValues[isbnTarget] }
}

/** Builds a form-only patch and routes proceedings ISBN to its visible field. */
export const buildWosFormPatch = (
    currentValues: Record<string, unknown>,
    incomingValues: PublicationWosImportValues,
    selectedFields: PublicationWosImportField[],
): Record<string, unknown> => {
    const patch: Record<string, unknown> = Object.fromEntries(
        Object.entries(buildWosFieldPatch(incomingValues, selectedFields)),
    )
    if (!('isbn' in patch)) return patch

    const isbnTarget = getWosIsbnTargetField(currentValues, incomingValues, selectedFields)
    if (isbnTarget === 'isbn') return patch

    const { isbn, ...remainingPatch } = patch
    return { ...remainingPatch, proceedingsIsbn: isbn }
}

export type PublicationWosAuthorSelections = Record<number, string>

/** Preselects only a unique ResearcherID match, never an uncertain name match. */
export const buildDefaultWosAuthorSelections = (
    authors: PublicationWosAuthor[],
): PublicationWosAuthorSelections =>
    Object.fromEntries(
        authors.flatMap(author => {
            if (author.match.kind !== 'researcher-id' || author.match.candidates.length !== 1) {
                return []
            }

            return [[author.sourceIndex, author.match.candidates[0].uid]]
        }),
    )

/** Merges confirmed candidates with current researchers, deduplicated by UID. */
export const buildSelectedWosResearchers = (
    currentResearchers: SelectedResearcher[],
    authors: PublicationWosAuthor[],
    selections: PublicationWosAuthorSelections,
): SelectedResearcher[] => {
    const researchers = new Map<string, SelectedResearcher>()
    currentResearchers.forEach(researcher => researchers.set(researcher.uid, researcher))

    authors.forEach(author => {
        const selectedUid = selections[author.sourceIndex]
        if (!selectedUid) return

        const candidate = author.match.candidates.find(researcher => researcher.uid === selectedUid)
        if (candidate) researchers.set(candidate.uid, candidate)
    })

    return Array.from(researchers.values())
}

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

/** Formats scalar and codebook values for the import comparison table. */
export const displayWosValue = (value: unknown, emptyLabel: string): string => {
    if (value === undefined || value === null || value === '') return emptyLabel
    if (typeof value === 'object' && 'name' in value) return String(value.name)
    return String(value)
}
