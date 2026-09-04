import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'

import type {
    PublicationWosAuthor,
    PublicationWosFieldRow,
    PublicationWosImportField,
    PublicationWosImportValues,
    ResearcherIdLink,
} from '../types/wos-import'
import { PUBLICATION_WOS_IMPORT_FIELDS } from '../types/wos-import'

const isBlank = (value: unknown): boolean =>
    value === undefined ||
    value === null ||
    value === 0 ||
    (typeof value === 'string' && value.trim() === '')

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

const getMediaTypeCode = (value: unknown): string | undefined => {
    if (typeof value !== 'object' || value === null || !('code' in value)) return undefined
    return typeof value.code === 'string' ? value.code.toUpperCase() : undefined
}

export const getWosIsbnTargetField = (
    currentValues: Record<string, unknown>,
    incomingValues: PublicationWosImportValues,
    selectedFields: PublicationWosImportField[],
): 'isbn' | 'proceedingsIsbn' => {
    const mediaType = selectedFields.includes('mediaTypeCb')
        ? incomingValues.mediaTypeCb
        : currentValues.mediaTypeCb

    return getMediaTypeCode(mediaType) === 'D' ? 'proceedingsIsbn' : 'isbn'
}

export const buildWosComparisonValues = (
    currentValues: Record<string, unknown>,
    incomingValues: PublicationWosImportValues,
    selectedFields: PublicationWosImportField[],
): Record<string, unknown> => {
    const isbnTarget = getWosIsbnTargetField(currentValues, incomingValues, selectedFields)
    return { ...currentValues, isbn: currentValues[isbnTarget] }
}

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

export const buildWosResearcherIdLinks = (
    authors: PublicationWosAuthor[],
    selections: PublicationWosAuthorSelections,
    rememberedSourceIndexes: number[],
): ResearcherIdLink[] => {
    const remembered = new Set(rememberedSourceIndexes)

    return authors.flatMap(author => {
        if (
            !remembered.has(author.sourceIndex) ||
            author.match.kind === 'researcher-id' ||
            !author.researcherId
        ) {
            return []
        }

        const researcherUid = selections[author.sourceIndex]
        if (!researcherUid) return []

        return [{ researcherUid, researcherId: author.researcherId }]
    })
}
