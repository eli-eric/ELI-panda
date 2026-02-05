import type { Researcher } from '@/modules/researchers/types/researcher.types'

/**
 * Minimal researcher data stored in form for eliResearchers field.
 * This is what gets saved to the backend and displayed in badges.
 */
export interface SelectedResearcher {
    uid: string
    firstName: string
    lastName: string
}

/**
 * Props for the researcher selection modal content component.
 */
export interface ResearcherModalContentProps {
    title?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    onSelect: (researchers: SelectedResearcher[]) => void
    onClose?: () => void
    initialSelected?: SelectedResearcher[]
}

/**
 * Converts a full Researcher object to SelectedResearcher (minimal form data).
 */
export const toSelectedResearcher = (researcher: Researcher): SelectedResearcher => ({
    uid: researcher.uid,
    firstName: researcher.firstName,
    lastName: researcher.lastName,
})

/**
 * Checks if a researcher is in the selected list by uid.
 */
export const isResearcherSelected = (uid: string, selected: SelectedResearcher[]): boolean =>
    selected.some(r => r.uid === uid)
