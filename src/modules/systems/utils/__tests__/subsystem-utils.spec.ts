import {
    addSubsystem,
    addSubsystems,
    filterSubsystem,
    filterSubsystemFromSubsystems,
    updateSubSystem,
    updateSystem,
} from '../index'

const makeSys = (uid: string, subSystems?: any[]): any => ({
    uid,
    name: `S-${uid}`,
    subSystems,
})

describe('systems utils', () => {
    describe('addSubsystems', () => {
        it('replaces subSystems of target uid', () => {
            const prev = [makeSys('a'), makeSys('b')]
            const subs = [makeSys('b-1'), makeSys('b-2')]
            const result = addSubsystems(prev, subs, 'b')
            expect(result[1].subSystems).toEqual(subs)
        })

        it('recurses into nested subSystems', () => {
            const prev = [makeSys('a', [makeSys('a-1')])]
            const subs = [makeSys('a-1-1')]
            const result = addSubsystems(prev, subs, 'a-1')
            expect(result[0].subSystems![0].subSystems).toEqual(subs)
        })

        it('returns clones (does not mutate input)', () => {
            const prev = [makeSys('a')]
            const result = addSubsystems(prev, [], 'a')
            expect(result).not.toBe(prev)
            expect(result[0]).not.toBe(prev[0])
        })
    })

    describe('filterSubsystem', () => {
        it('removes top-level item by uid', () => {
            const prev = { data: [makeSys('a'), makeSys('b')] } as any
            const result = filterSubsystem('a', prev)
            expect(result.data.map((s: any) => s.uid)).toEqual(['b'])
        })

        it('recurses into nested subSystems', () => {
            const prev = {
                data: [makeSys('a', [makeSys('a-1'), makeSys('a-2')])],
            } as any
            const result = filterSubsystem('a-1', prev)
            expect(result.data[0].subSystems!.map((s: any) => s.uid)).toEqual(['a-2'])
        })
    })

    describe('filterSubsystemFromSubsystems', () => {
        it('filters from a flat list', () => {
            const result = filterSubsystemFromSubsystems('b', [makeSys('a'), makeSys('b')])
            expect(result.map(s => s.uid)).toEqual(['a'])
        })

        it('recurses into nested subSystems', () => {
            const result = filterSubsystemFromSubsystems('a-1', [
                makeSys('a', [makeSys('a-1'), makeSys('a-2')]),
            ])
            expect(result[0].subSystems!.map((s: any) => s.uid)).toEqual(['a-2'])
        })
    })

    describe('updateSystem', () => {
        it('replaces target system, preserves hasSubsystems + subSystems', () => {
            const prev = {
                data: [
                    {
                        ...makeSys('a'),
                        hasSubsystems: true,
                        subSystems: [makeSys('a-1')],
                    },
                ],
            } as any
            const result = updateSystem(
                'a',
                { ...makeSys('a'), name: 'NEW' } as any,
                prev,
            )
            expect(result.data[0].name).toBe('NEW')
            expect(result.data[0].hasSubsystems).toBe(true)
            expect(result.data[0].subSystems![0].uid).toBe('a-1')
        })
    })

    describe('addSubsystem', () => {
        it('appends new system to parent uid and sets hasSubsystems', () => {
            const prev = { data: [makeSys('a')] } as any
            const result = addSubsystem('a', makeSys('a-1') as any, prev)
            expect(result.data[0].subSystems!).toHaveLength(1)
            expect(result.data[0].hasSubsystems).toBe(true)
        })

        it('appends to existing subSystems list', () => {
            const prev = { data: [makeSys('a', [makeSys('a-1')])] } as any
            const result = addSubsystem('a', makeSys('a-2') as any, prev)
            expect(result.data[0].subSystems!.map((s: any) => s.uid)).toEqual(['a-1', 'a-2'])
        })
    })

    describe('updateSubSystem', () => {
        it('replaces target while keeping its subSystems', () => {
            const prev = [makeSys('a', [makeSys('a-1')])]
            const result = updateSubSystem(prev, {
                ...makeSys('a-1'),
                name: 'UPDATED',
            } as any)
            // a-1 is at depth 1
            expect((result[0].subSystems as any[])[0].name).toBe('UPDATED')
        })
    })
})
