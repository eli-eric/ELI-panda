import { z } from 'zod'

const uids = z.array(z.string().min(1))

export const publicationReportingSchema = z.object({
    classification: z.enum(['own-user', 'own-other', 'coauthorship', 'unclassified']),
    reviewed: z.boolean(),
    documentType: z.enum(['article', 'proceedings', 'book-chapter', 'other', 'unknown']),
    departmentUids: uids,
    authors: z.array(
        z.object({
            researcherUid: z.string().min(1),
            departmentUids: uids,
            isFirstAuthor: z.boolean().nullable(),
            isCorresponding: z.boolean().nullable(),
        }),
    ),
    userCallUids: uids,
    userExperimentUids: uids,
    experimentalSystemUids: uids,
    journalMetrics: z.array(
        z.object({
            journalId: z.string().optional(),
            source: z.literal('JCR'),
            year: z.number().int().min(1900).max(9999),
            category: z.string().trim().min(1, 'JCR category is required'),
            quartile: z.enum(['Q1', 'Q2', 'Q3', 'Q4']),
            percentile: z.number().min(0).max(100).nullable(),
            impactFactor: z.number().min(0).nullable(),
        }),
    ),
    journalRankingStatus: z.enum(['unknown', 'unranked']).optional(),
    reviewedAt: z.string().optional(),
    reviewedBy: z.string().optional(),
})
