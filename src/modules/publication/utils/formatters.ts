import { isFeatureEnabled } from '@/config/featureFlags'
import type { SelectedResearcher } from '@/modules/shared/form/researcherSelect'

import type { Publication } from '../types/responses'

/**
 * Formats form data before submission to API.
 * Converts string numbers to actual numbers and generates backward-compatible eliAuthors string.
 */
export const formatFormData = (data: any): Publication => ({
  ...data,
  allAuthorsCount: Number(data.allAuthorsCount),
  eliAuthorsCount: Number(data.eliAuthorsCount),
  volume: data.volume ? Number(data.volume) : null,
  pagesCount: Number(data.pagesCount),
  issue: data.issue ? Number(data.issue) : null,
  impactFactor: data.impactFactor ? Number(data.impactFactor) : null,
  authorsDepartments:
    data.authorsDepartments?.map((author: any) => ({
      ...author,
      authorsCount: Number(author.authorsCount)
    })) ?? [],
  // Ensure eliResearchers is always an array
  eliResearchers: data.eliResearchers ?? [],
  // Generate eliAuthors string for backward compatibility
  eliAuthors: isFeatureEnabled('enableEliAuthorsResearcherPicker')
    ? generateEliAuthorsString(data.eliResearchers)
    : data.eliAuthors
})

/**
 * Formats publication data from API for form display.
 * Ensures eliResearchers defaults to empty array if not present.
 */
export const formatPublication = (
  publication?: Publication
): any | undefined => {
  if (!publication) {
    return undefined
  }

  return {
    ...publication,
    language: publication.language || 'English',
    // Ensure eliResearchers is always an array for the form
    eliResearchers: publication.eliResearchers ?? []
  }
}

/**
 * Generates a semicolon-separated string of author names for backward compatibility.
 * Format: "LastName1, FirstName1; LastName2, FirstName2"
 */
const generateEliAuthorsString = (
  researchers?: SelectedResearcher[]
): string => {
  if (!researchers || researchers.length === 0) {
    return ''
  }

  return researchers.map(r => `${r.lastName}, ${r.firstName}`).join('; ')
}
