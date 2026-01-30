import type { Grant } from '@/modules/grants/types/grant.types'

/**
 * Minimal grant data stored in form for grants field.
 * This is what gets saved to the backend and displayed in badges.
 */
export interface SelectedGrant {
    uid: string
    code: string
    name: string
}

/**
 * Props for the grant selection modal content component.
 */
export interface GrantModalContentProps {
    title?: string
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    onSelect: (grants: SelectedGrant[]) => void
    onClose?: () => void
    initialSelected?: SelectedGrant[]
}

/**
 * Converts a full Grant object to SelectedGrant (minimal form data).
 */
export const toSelectedGrant = (grant: Grant): SelectedGrant => ({
    uid: grant.uid,
    code: grant.code,
    name: grant.name,
})

/**
 * Checks if a grant is in the selected list by uid.
 */
export const isGrantSelected = (uid: string, selected: SelectedGrant[]): boolean =>
    selected.some(g => g.uid === uid)
