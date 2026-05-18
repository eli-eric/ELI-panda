import { userFormSchema, userUpdateFormSchema } from '../User.schema'

const facility = { uid: 'f', name: 'F' }
const role = { uid: 'r', name: 'Admin' }

const validCreate = {
    email: 'a@b.cz',
    facility,
    firstName: 'Jan',
    isEnabled: true,
    lastName: 'Smith',
    password: 'secret123',
    confirmPassword: 'secret123',
    employee: null,
    roles: [role],
}

const validUpdate = {
    email: 'a@b.cz',
    facility,
    firstName: 'Jan',
    isEnabled: true,
    lastName: 'Smith',
    employee: null,
}

describe('userFormSchema (create)', () => {
    it('accepts a valid create payload', () => {
        expect(userFormSchema.safeParse(validCreate).success).toBe(true)
    })

    it.each([
        ['email', { ...validCreate, email: 'not-an-email' }],
        ['firstName', { ...validCreate, firstName: '' }],
        ['lastName', { ...validCreate, lastName: '' }],
        ['password', { ...validCreate, password: '' }],
        ['confirmPassword', { ...validCreate, confirmPassword: '' }],
    ])('rejects bad %s', (_label, payload) => {
        expect(userFormSchema.safeParse(payload).success).toBe(false)
    })

    it('rejects empty roles', () => {
        const r = userFormSchema.safeParse({ ...validCreate, roles: [] })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(r.error.issues.some(i => i.message === 'Missing selected role')).toBe(true)
        }
    })

    it('rejects mismatching passwords on confirmPassword path', () => {
        const r = userFormSchema.safeParse({ ...validCreate, confirmPassword: 'different' })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(r.error.issues.some(i => i.path[0] === 'confirmPassword')).toBe(true)
        }
    })
})

describe('userUpdateFormSchema (update)', () => {
    it('accepts update without password', () => {
        expect(userUpdateFormSchema.safeParse(validUpdate).success).toBe(true)
    })

    it('accepts update with matching new password', () => {
        expect(
            userUpdateFormSchema.safeParse({
                ...validUpdate,
                password: 'new123',
                confirmPassword: 'new123',
            }).success,
        ).toBe(true)
    })

    it('rejects update when only password set without confirm', () => {
        const r = userUpdateFormSchema.safeParse({ ...validUpdate, password: 'new' })
        expect(r.success).toBe(false)
    })

    it('rejects update when password mismatch', () => {
        const r = userUpdateFormSchema.safeParse({
            ...validUpdate,
            password: 'a',
            confirmPassword: 'b',
        })
        expect(r.success).toBe(false)
    })

    it('still requires valid email + names', () => {
        expect(
            userUpdateFormSchema.safeParse({ ...validUpdate, email: 'x' }).success,
        ).toBe(false)
        expect(
            userUpdateFormSchema.safeParse({ ...validUpdate, firstName: '' }).success,
        ).toBe(false)
    })
})
