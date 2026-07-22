import { teamCreateSchema } from '../team-create.schema'

describe('teamCreateSchema', () => {
    it('accepts a name-only payload', () => {
        expect(teamCreateSchema.safeParse({ name: 'Alpha' }).success).toBe(true)
    })

    it('accepts name + code + description', () => {
        expect(
            teamCreateSchema.safeParse({
                name: 'Alpha',
                code: 'A1',
                description: 'desc',
            }).success,
        ).toBe(true)
    })

    it('rejects empty name', () => {
        expect(teamCreateSchema.safeParse({ name: '' }).success).toBe(false)
    })

    it('rejects whitespace-only name', () => {
        expect(teamCreateSchema.safeParse({ name: '   ' }).success).toBe(false)
    })

    it('trims name before validating', () => {
        const parsed = teamCreateSchema.safeParse({ name: '  Alpha  ' })
        expect(parsed.success).toBe(true)
        if (parsed.success) expect(parsed.data.name).toBe('Alpha')
    })
})
