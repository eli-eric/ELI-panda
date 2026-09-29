import { useState } from 'react'

import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'

import { WOS_MATCH_CONFIDENCE, type WosLookupAuthor } from '../types/wos-preview.types'

export interface WosAuthorSelection {
    checked: boolean
    researcher?: SelectedResearcher
    /** Store the author's WoS ResearcherID on `researcher` when importing. */
    remember: boolean
}

export type WosAuthorSelections = Record<number, WosAuthorSelection>

export interface WosResearcherIdToRemember {
    researcher: SelectedResearcher
    researcherId: string
}

/** EXACT_ID starts checked; NAME is proposed unchecked; AMBIGUOUS and NONE start without a researcher. */
export const buildInitialAuthorSelections = (authors: WosLookupAuthor[]): WosAuthorSelections =>
    Object.fromEntries(
        authors.map(({ sourceIndex, match }) => {
            const proposed =
                match.confidence === WOS_MATCH_CONFIDENCE.EXACT_ID ||
                match.confidence === WOS_MATCH_CONFIDENCE.NAME
                    ? match.candidates[0]
                    : undefined
            return [
                sourceIndex,
                {
                    checked: match.confidence === WOS_MATCH_CONFIDENCE.EXACT_ID && !!proposed,
                    researcher: proposed,
                    remember: false,
                },
            ]
        }),
    )

/** Offer to remember the ResearcherID only for a name match that does not already carry it. */
export const canRememberResearcherId = (author: WosLookupAuthor): boolean =>
    author.match.confidence === WOS_MATCH_CONFIDENCE.NAME &&
    !author.match.knownResearcherId &&
    !!author.researcherId

/** Appends confirmed researchers to the current list, keeping order and dropping duplicate UIDs. */
export const mergeWosResearchers = (
    current: SelectedResearcher[],
    incoming: SelectedResearcher[],
): SelectedResearcher[] => {
    const merged = new Map(current.map(researcher => [researcher.uid, researcher]))
    incoming.forEach(researcher => {
        if (!merged.has(researcher.uid)) merged.set(researcher.uid, researcher)
    })
    return Array.from(merged.values())
}

export const useWosAuthorSelections = (authors: WosLookupAuthor[]) => {
    const [selections, setSelections] = useState(() => buildInitialAuthorSelections(authors))

    const update = (sourceIndex: number, patch: Partial<WosAuthorSelection>) =>
        setSelections(current => ({
            ...current,
            [sourceIndex]: { ...current[sourceIndex], ...patch },
        }))

    const confirmed = authors.flatMap(author => {
        const { checked, researcher, remember } = selections[author.sourceIndex]
        return checked && researcher ? [{ author, researcher, remember }] : []
    })

    return {
        selections,
        toggle: (sourceIndex: number, checked: boolean) => update(sourceIndex, { checked }),
        /** A researcher picked by hand is a confirmation, so the row becomes checked. */
        choose: (sourceIndex: number, researcher: SelectedResearcher) =>
            update(sourceIndex, { researcher, checked: true }),
        toggleRemember: (sourceIndex: number, remember: boolean) =>
            update(sourceIndex, { remember }),
        confirmedResearchers: confirmed.map(({ researcher }) => researcher),
        researcherIdsToRemember: confirmed.flatMap(({ author, researcher, remember }) =>
            remember && author.researcherId && canRememberResearcherId(author)
                ? [{ researcher, researcherId: author.researcherId }]
                : [],
        ),
    }
}
