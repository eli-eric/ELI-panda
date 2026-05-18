import { employeeAssignmentSchema } from '../employeeAssignment.schema'

describe('employeeAssignmentSchema', () => {
    it('accepts a fully populated employee', () => {
        expect(
            employeeAssignmentSchema.safeParse({
                employee: {
                    uid: 'u',
                    name: 'Jan',
                    fullName: 'Jan Smith',
                    phone1: '111',
                    phone2: '222',
                },
            }).success,
        ).toBe(true)
    })

    it('accepts null employee (cleared assignment)', () => {
        expect(employeeAssignmentSchema.safeParse({ employee: null }).success).toBe(true)
    })

    it('rejects employee missing uid', () => {
        expect(
            employeeAssignmentSchema.safeParse({
                employee: { name: 'Jan' } as any,
            }).success,
        ).toBe(false)
    })

    it('accepts employee with only uid (optional/nullable name fields)', () => {
        expect(
            employeeAssignmentSchema.safeParse({ employee: { uid: 'u' } }).success,
        ).toBe(true)
    })
})
