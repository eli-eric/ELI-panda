import { SystemLevel } from '@/types/gql/graphql'

import {
    codebookRefSchema,
    employeeRefSchema,
    hierarchyNodeSchema,
    hierarchyResponseSchema,
    leavesCountResponseSchema,
    leavesResponseSchema,
    systemLeafSchema,
} from '../schemas'

describe('codebookRefSchema', () => {
    it('accepts uid+name minimum + optional code/additionalData', () => {
        expect(codebookRefSchema.safeParse({ uid: 'a', name: 'A' }).success).toBe(true)
        expect(
            codebookRefSchema.safeParse({
                uid: 'a',
                name: 'A',
                code: 'C',
                additionalData: 'extra',
            }).success,
        ).toBe(true)
    })

    it('rejects missing uid', () => {
        expect(codebookRefSchema.safeParse({ name: 'A' }).success).toBe(false)
    })
})

describe('employeeRefSchema', () => {
    it('accepts uid alone (name + fullName optional/nullable)', () => {
        expect(employeeRefSchema.safeParse({ uid: 'u' }).success).toBe(true)
        expect(
            employeeRefSchema.safeParse({ uid: 'u', fullName: null, name: null }).success,
        ).toBe(true)
    })
})

describe('hierarchyNodeSchema (recursive)', () => {
    it('accepts a leaf node', () => {
        expect(
            hierarchyNodeSchema.safeParse({
                uid: 'a',
                name: 'A',
                systemLevel: SystemLevel.KeySystems,
                hasLeafChildren: false,
                children: [],
            }).success,
        ).toBe(true)
    })

    it('accepts nested children', () => {
        const r = hierarchyNodeSchema.safeParse({
            uid: 'a',
            name: 'A',
            systemLevel: SystemLevel.SystemDomain,
            hasLeafChildren: true,
            children: [
                {
                    uid: 'b',
                    name: 'B',
                    systemLevel: SystemLevel.KeySystems,
                    hasLeafChildren: false,
                    children: [],
                },
            ],
        })
        expect(r.success).toBe(true)
    })

    it('rejects unknown systemLevel', () => {
        expect(
            hierarchyNodeSchema.safeParse({
                uid: 'a',
                name: 'A',
                systemLevel: 'INVALID',
                hasLeafChildren: false,
                children: [],
            }).success,
        ).toBe(false)
    })
})

describe('systemLeafSchema', () => {
    it('accepts minimal leaf', () => {
        expect(
            systemLeafSchema.safeParse({ uid: 'a', name: 'A' }).success,
        ).toBe(true)
    })

    it('accepts arrays of operators and parentPath', () => {
        expect(
            systemLeafSchema.safeParse({
                uid: 'a',
                name: 'A',
                operators: [{ uid: 'o' }],
                parentPath: [{ uid: 'p1', name: 'P1', systemLevel: 'KEY_SYSTEMS' }],
            }).success,
        ).toBe(true)
    })

    it('rejects nested operators missing uid', () => {
        expect(
            systemLeafSchema.safeParse({
                uid: 'a',
                name: 'A',
                operators: [{ fullName: 'x' } as any],
            }).success,
        ).toBe(false)
    })
})

describe('leavesResponseSchema', () => {
    it('accepts empty data with totalCount=0', () => {
        expect(leavesResponseSchema.safeParse({ data: [], totalCount: 0 }).success).toBe(true)
    })

    it('rejects missing totalCount', () => {
        expect(leavesResponseSchema.safeParse({ data: [] }).success).toBe(false)
    })
})

describe('leavesCountResponseSchema', () => {
    it('accepts count: number', () => {
        expect(leavesCountResponseSchema.safeParse({ count: 10 }).success).toBe(true)
    })

    it('rejects non-number count', () => {
        expect(leavesCountResponseSchema.safeParse({ count: 'ten' }).success).toBe(false)
    })
})

describe('hierarchyResponseSchema', () => {
    it('accepts array of nodes', () => {
        expect(
            hierarchyResponseSchema.safeParse([
                {
                    uid: 'a',
                    name: 'A',
                    systemLevel: SystemLevel.KeySystems,
                    hasLeafChildren: false,
                    children: [],
                },
            ]).success,
        ).toBe(true)
    })
})
