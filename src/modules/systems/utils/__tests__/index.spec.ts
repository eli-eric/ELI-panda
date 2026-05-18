import type { SystemDetail, SystemsResponse } from '@/types/responses/systems'

import {
    addSubsystem,
    addSubsystems,
    filterSubsystem,
    filterSubsystemFromSubsystems,
    updateSubSystem,
    updateSystem,
} from '../index'

const sys = (uid: string, subSystems: SystemDetail[] = [], extra: any = {}): SystemDetail =>
    ({ uid, name: `s-${uid}`, subSystems, hasSubsystems: subSystems.length > 0, ...extra } as any)

const wrap = (data: SystemDetail[]): SystemsResponse => ({ data, totalCount: data.length } as any)

describe('addSubsystems', () => {
    it('replaces subSystems of matching node, immutably', () => {
        const a = sys('a', [sys('a1')])
        const b = sys('b')
        const out = addSubsystems([a, b], [sys('a2'), sys('a3')], 'a')
        expect(out[0].subSystems?.map(s => s.uid)).toEqual(['a2', 'a3'])
        expect(out[1].uid).toBe('b')
        // immutability: original a.subSystems untouched
        expect(a.subSystems?.[0].uid).toBe('a1')
    })

    it('recurses into nested subSystems', () => {
        const tree = [sys('a', [sys('a1', [sys('a1a')])])]
        const out = addSubsystems(tree, [sys('new')], 'a1')
        expect(out[0].subSystems?.[0].subSystems?.[0].uid).toBe('new')
    })
})

describe('filterSubsystem', () => {
    it('removes matching root entry', () => {
        const prev = wrap([sys('a'), sys('b')])
        const out = filterSubsystem('a', prev)
        expect(out.data.map(d => d.uid)).toEqual(['b'])
    })

    it('removes deeply nested subsystem', () => {
        const prev = wrap([sys('a', [sys('a1', [sys('a1a')])])])
        const out = filterSubsystem('a1a', prev)
        expect(out.data[0].subSystems?.[0].subSystems).toEqual([])
    })
})

describe('filterSubsystemFromSubsystems', () => {
    it('removes matching entry from a subSystem list', () => {
        const prev = [sys('a'), sys('b')]
        const out = filterSubsystemFromSubsystems('a', prev)
        expect(out.map(d => d.uid)).toEqual(['b'])
    })
})

describe('updateSystem', () => {
    it('replaces system fields while preserving subSystems + hasSubsystems', () => {
        const prev = wrap([sys('a', [sys('a1')], { name: 'old' })])
        const updated = sys('a', [], { name: 'new', extra: 'x' })
        const out = updateSystem('a', updated, prev)
        expect((out.data[0] as any).name).toBe('new')
        expect((out.data[0] as any).extra).toBe('x')
        expect(out.data[0].subSystems?.map(s => s.uid)).toEqual(['a1'])
        expect(out.data[0].hasSubsystems).toBe(true)
    })

    it('recurses into nested matches', () => {
        const prev = wrap([sys('a', [sys('a1', [], { name: 'old' })])])
        const out = updateSystem('a1', sys('a1', [], { name: 'new' }), prev)
        expect((out.data[0].subSystems?.[0] as any).name).toBe('new')
    })
})

describe('addSubsystem', () => {
    it('appends new subsystem and flips hasSubsystems', () => {
        const prev = wrap([sys('a', [], { hasSubsystems: false })])
        const out = addSubsystem('a', sys('a1'), prev)
        expect(out.data[0].subSystems?.[0].uid).toBe('a1')
        expect(out.data[0].hasSubsystems).toBe(true)
    })

    it('recurses into nested levels', () => {
        const prev = wrap([sys('a', [sys('a1')])])
        const out = addSubsystem('a1', sys('a1a'), prev)
        expect(out.data[0].subSystems?.[0].subSystems?.[0].uid).toBe('a1a')
        expect(out.data[0].subSystems?.[0].hasSubsystems).toBe(true)
    })
})

describe('updateSubSystem', () => {
    it('updates a matching entry while preserving subSystems', () => {
        const prev = [sys('a', [sys('a1')], { name: 'old' })]
        const out = updateSubSystem(prev, sys('a', [], { name: 'new' }))
        expect((out[0] as any).name).toBe('new')
        expect(out[0].subSystems?.map(s => s.uid)).toEqual(['a1'])
    })
})
