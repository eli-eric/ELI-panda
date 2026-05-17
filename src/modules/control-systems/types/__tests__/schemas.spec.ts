import { BATCH_LIMIT } from '../constants'
import {
    codebookTypeSchema,
    parentPathItemSchema,
    systemCodeRequestSchema,
    systemCodeResultSchema,
    systemCodesOverviewResponseSchema,
    systemCodesPreviewParamsSchema,
} from '../schemas'

describe('codebookTypeSchema', () => {
    it('accepts minimal uid+name', () => {
        const r = codebookTypeSchema.safeParse({ uid: 'u', name: 'n' })
        expect(r.success).toBe(true)
    })

    it('accepts nullable code', () => {
        expect(
            codebookTypeSchema.safeParse({ uid: 'u', name: 'n', code: null }).success,
        ).toBe(true)
    })

    it('rejects missing uid', () => {
        expect(codebookTypeSchema.safeParse({ name: 'n' }).success).toBe(false)
    })
})

describe('parentPathItemSchema', () => {
    it('requires uid and name', () => {
        expect(parentPathItemSchema.safeParse({ uid: 'u', name: 'n' }).success).toBe(true)
        expect(parentPathItemSchema.safeParse({ uid: 'u' }).success).toBe(false)
    })
})

describe('systemCodeResultSchema', () => {
    it('parses preview-style payload (no uid)', () => {
        const r = systemCodeResultSchema.safeParse({ name: 'A', code: 'C' })
        expect(r.success).toBe(true)
    })

    it('parses full payload with nested codebook + parentPath', () => {
        const r = systemCodeResultSchema.safeParse({
            uid: 'x',
            name: 'A',
            code: 'C',
            zone: { uid: 'z', name: 'Zone' },
            systemType: { uid: 's', name: 'Type' },
            parentPath: [{ uid: 'p1', name: 'Root' }],
        })
        expect(r.success).toBe(true)
    })
})

describe('systemCodeRequestSchema', () => {
    const baseValid = {
        zone: { uid: 'z', name: 'Z' },
        systemType: { uid: 's', name: 'S' },
        batch: 5,
    }

    it('accepts valid request', () => {
        expect(systemCodeRequestSchema.safeParse(baseValid).success).toBe(true)
    })

    it('rejects batch below 1', () => {
        const r = systemCodeRequestSchema.safeParse({ ...baseValid, batch: 0 })
        expect(r.success).toBe(false)
        if (!r.success) expect(r.error.issues[0].message).toMatch(/at least 1/)
    })

    it('rejects batch above BATCH_LIMIT', () => {
        const r = systemCodeRequestSchema.safeParse({ ...baseValid, batch: BATCH_LIMIT + 1 })
        expect(r.success).toBe(false)
    })
})

describe('systemCodesOverviewResponseSchema', () => {
    it('accepts empty result list', () => {
        expect(
            systemCodesOverviewResponseSchema.safeParse({ data: [], totalCount: 0 }).success,
        ).toBe(true)
    })

    it('rejects when totalCount missing', () => {
        expect(systemCodesOverviewResponseSchema.safeParse({ data: [] }).success).toBe(false)
    })
})

describe('systemCodesPreviewParamsSchema', () => {
    it('accepts valid params', () => {
        expect(
            systemCodesPreviewParamsSchema.safeParse({
                zoneUid: 'z',
                systemTypeUid: 's',
                batch: 10,
            }).success,
        ).toBe(true)
    })

    it('rejects batch above BATCH_LIMIT', () => {
        const r = systemCodesPreviewParamsSchema.safeParse({
            zoneUid: 'z',
            systemTypeUid: 's',
            batch: BATCH_LIMIT + 1,
        })
        expect(r.success).toBe(false)
    })
})
