import { z } from 'zod'

import {
    REPORTING_CLASSIFICATIONS,
    REPORTING_DOCUMENT_TYPES,
    REPORTING_QUARTILES,
    REPORTING_RANKING_STATUSES,
} from '../types/reporting'

const uids = z.array(z.string().min(1))

export const publicationReportingSchema = z.object({
    classification: z.enum(REPORTING_CLASSIFICATIONS),
    reviewed: z.boolean(),
    documentType: z.enum(REPORTING_DOCUMENT_TYPES),
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
    // The shared Input always hands react-hook-form the raw text value, so
    // numeric metric fields arrive as strings once edited. Coerce at the schema
    // boundary: an emptied percentile/impact factor ('' == unknown) becomes
    // null, and a non-numeric string still fails as NaN rather than passing
    // through.
    journalMetrics: z.array(
        z.object({
            journalId: z.string().optional(),
            source: z.literal('JCR'),
            year: z.coerce.number().int().min(1900).max(9999),
            category: z.string().trim().min(1, 'JCR category is required'),
            quartile: z.enum(REPORTING_QUARTILES),
            percentile: z.preprocess(
                value =>
                    value === '' || value === null || value === undefined ? null : Number(value),
                z.number().min(0).max(100).nullable(),
            ),
            impactFactor: z.preprocess(
                value =>
                    value === '' || value === null || value === undefined ? null : Number(value),
                z.number().min(0).nullable(),
            ),
        }),
    ),
    journalRankingStatus: z.enum(REPORTING_RANKING_STATUSES).optional(),
    reviewedAt: z.string().optional(),
    reviewedBy: z.string().optional(),
})
