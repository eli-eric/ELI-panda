import { z } from 'zod'

const codebookSchema = z.object({
    uid: z.string().min(1, 'UID is required'),
    name: z.string().min(1, 'Name is required'),
})

// Every identifier is optional. A researcher who holds none of them is a real
// person the register still has to be able to record, and RIV does not key
// authors on any of these — it uses the name plus identificationNumber. Missing
// identifiers surface as RIV validation warnings at export time, where they
// actually matter, rather than blocking data entry.
export const researcherSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    identificationNumber: z.string().optional(),
    orcid: z.string().optional(),
    scopusId: z.string().optional(),
    researcherId: z.string().optional(),
    citizenship: codebookSchema.nullable().optional(),
})

export type ResearcherFormData = z.infer<typeof researcherSchema>
