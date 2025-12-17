import { z } from 'zod'

const codebookSchema = z.object({
  uid: z.string().min(1, 'UID is required'),
  name: z.string().min(1, 'Name is required')
})

export const researcherSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    identificationNumber: z.string().optional(),
    orcid: z.string().optional(),
    scopusId: z.string().optional(),
    researcherId: z.string().optional(),
    citizenship: codebookSchema.nullable().optional()
  })
  .refine(
    data => {
      const hasOrcid = data.orcid && data.orcid.trim().length > 0
      const hasScopusId = data.scopusId && data.scopusId.trim().length > 0
      const hasResearcherId =
        data.researcherId && data.researcherId.trim().length > 0
      return hasOrcid || hasScopusId || hasResearcherId
    },
    {
      message:
        'At least one identifier is required (ORCID, Scopus ID, or Researcher ID)',
      path: ['orcid']
    }
  )

export type ResearcherFormData = z.infer<typeof researcherSchema>
