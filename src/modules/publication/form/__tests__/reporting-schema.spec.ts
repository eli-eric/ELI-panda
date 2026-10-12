import { publicationReportingSchema } from '../reporting.schema'

const baseMetric = {
    source: 'JCR',
    journalId: '0031-9007',
    year: 2024,
    category: 'Physics, Multidisciplinary',
    quartile: 'Q1',
    percentile: null,
    impactFactor: null,
}

const baseReporting = {
    classification: 'own-user',
    reviewed: true,
    documentType: 'article',
    departmentUids: [],
    authors: [],
    userCallUids: [],
    userExperimentUids: [],
    experimentalSystemUids: [],
    journalMetrics: [baseMetric],
}

// The shared Input always stores text — including for type="number" fields —
// so an edited metric row reaches zod as strings. Before the schema coerced,
// any edit made the whole publication form unsubmittable.
describe('publicationReportingSchema numeric coercion', () => {
    it('accepts a metric row typed into the form as raw input strings', () => {
        const result = publicationReportingSchema.safeParse({
            ...baseReporting,
            journalMetrics: [
                { ...baseMetric, year: '2023', percentile: '92.5', impactFactor: '8.4' },
            ],
        })
        expect(result.success).toBe(true)
        if (result.success) {
            const metric = result.data.journalMetrics[0]
            expect(metric.year).toBe(2023)
            expect(metric.percentile).toBe(92.5)
            expect(metric.impactFactor).toBe(8.4)
        }
    })

    it('reads an emptied percentile / impact factor as unknown (null)', () => {
        const result = publicationReportingSchema.safeParse({
            ...baseReporting,
            journalMetrics: [{ ...baseMetric, percentile: '', impactFactor: '' }],
        })
        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data.journalMetrics[0].percentile).toBeNull()
            expect(result.data.journalMetrics[0].impactFactor).toBeNull()
        }
    })

    it.each([
        ['out-of-range year', { year: '202' }],
        ['non-numeric year', { year: 'twenty' }],
        ['percentile above 100', { percentile: '140' }],
        ['non-numeric percentile', { percentile: 'high' }],
        ['negative impact factor', { impactFactor: '-1' }],
    ])('rejects %s', (_name, edit) => {
        const result = publicationReportingSchema.safeParse({
            ...baseReporting,
            journalMetrics: [{ ...baseMetric, ...edit }],
        })
        expect(result.success).toBe(false)
    })

    it('still accepts untouched numeric values from a loaded record', () => {
        const result = publicationReportingSchema.safeParse({
            ...baseReporting,
            journalMetrics: [{ ...baseMetric, percentile: 92.5, impactFactor: 8.4 }],
        })
        expect(result.success).toBe(true)
    })
})
