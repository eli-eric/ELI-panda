import { codebookValueSchema } from '../codebook-value.schema'

describe('codebookValueSchema', () => {
    it('accepts a normal name', () => {
        expect(codebookValueSchema.safeParse({ name: 'Hello' }).success).toBe(true)
    })

    it('rejects empty name', () => {
        const r = codebookValueSchema.safeParse({ name: '' })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(r.error.issues[0].message).toBe('Name is required')
        }
    })

    it('rejects name longer than 255 chars', () => {
        const r = codebookValueSchema.safeParse({ name: 'a'.repeat(256) })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(r.error.issues[0].message).toBe('Name must be at most 255 characters')
        }
    })

    it('accepts name at the 255 boundary', () => {
        expect(codebookValueSchema.safeParse({ name: 'a'.repeat(255) }).success).toBe(true)
    })
})
