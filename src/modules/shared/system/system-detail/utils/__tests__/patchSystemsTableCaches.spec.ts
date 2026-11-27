import { QueryClient } from '@tanstack/react-query'

import { makeSystemDetail } from '@/testutils/factories/systemDetail'
import type { SystemsResponse } from '@/types/responses/systems'

import {
    insertIntoSystemsTableCaches,
    patchSystemRows,
    patchSystemsTableCaches,
} from '../patchSystemsTableCaches'

const TABLE_KEY = ['systems', { query: { page: 1 } }]

// root → parent (expanded) → child; sibling collapsed
const tree = (): SystemsResponse => ({
    totalCount: 2,
    data: [
        {
            uid: 'parent',
            name: 'Parent',
            hasSubsystems: true,
            subSystems: [
                {
                    uid: 'child',
                    name: 'Child',
                    systemCode: 'OLD',
                    physicalItem: { uid: 'pi', eun: 'EUN1', serialNumber: 'S1' },
                },
            ],
        },
        { uid: 'sibling', name: 'Sibling', hasSubsystems: true, subSystems: [] },
    ],
})

describe('patchSystemRows', () => {
    it('replaces the nested row and keeps the expanded subtree', () => {
        const rows = tree().data
        const next = patchSystemRows(
            rows,
            makeSystemDetail({
                uid: 'child',
                name: 'Renamed',
                systemCode: null,
                physicalItem: { ...makeSystemDetail().physicalItem!, uid: 'pi', serialNumber: 'S2' },
            }),
        )
        const child = next[0].subSystems![0]
        expect(child.name).toBe('Renamed')
        expect(child.systemCode).toBeUndefined()
        expect(child.physicalItem).toEqual(expect.objectContaining({ eun: 'EUN1', serialNumber: 'S2' }))
        expect(next[1]).toBe(rows[1]) // untouched branches keep their reference
    })

    it('returns the same array when the system is not in the table', () => {
        const rows = tree().data
        expect(patchSystemRows(rows, makeSystemDetail({ uid: 'elsewhere' }))).toBe(rows)
    })
})

describe('systems table caches', () => {
    let queryClient: QueryClient
    beforeEach(() => {
        queryClient = new QueryClient()
        queryClient.setQueryData(TABLE_KEY, tree())
    })

    it('patches the overview in place without invalidating it', () => {
        patchSystemsTableCaches(queryClient, makeSystemDetail({ uid: 'child', name: 'Renamed' }))
        const data = queryClient.getQueryData<SystemsResponse>(TABLE_KEY)!
        expect(data.data[0].subSystems![0].name).toBe('Renamed')
        expect(queryClient.getQueryState(TABLE_KEY)?.isInvalidated).toBe(false)
    })

    it('inserts a created child under an expanded parent', () => {
        insertIntoSystemsTableCaches(
            queryClient,
            makeSystemDetail({ uid: 'new', name: 'New', parentUid: 'parent' }),
        )
        const data = queryClient.getQueryData<SystemsResponse>(TABLE_KEY)!
        expect(data.data[0].subSystems!.map(s => s.uid)).toEqual(['child', 'new'])
        expect(data.totalCount).toBe(2)
    })

    it('marks a collapsed parent as having subsystems without faking its children', () => {
        queryClient.setQueryData(TABLE_KEY, {
            totalCount: 1,
            data: [{ uid: 'leaf', name: 'Leaf', hasSubsystems: false }],
        })
        insertIntoSystemsTableCaches(queryClient, makeSystemDetail({ uid: 'new', parentUid: 'leaf' }))
        const leaf = queryClient.getQueryData<SystemsResponse>(TABLE_KEY)!.data[0]
        expect(leaf.hasSubsystems).toBe(true)
        expect(leaf.subSystems).toBeUndefined()
    })

    it('prepends a created root system', () => {
        insertIntoSystemsTableCaches(queryClient, makeSystemDetail({ uid: 'root', parentUid: null }))
        const data = queryClient.getQueryData<SystemsResponse>(TABLE_KEY)!
        expect(data.data[0].uid).toBe('root')
        expect(data.totalCount).toBe(3)
    })

    it('does not insert a new root into filtered or searched views (marks them stale instead)', () => {
        const filteredKey = [
            'systems',
            { query: { pagination: '{"page":1}', search: '', columnFilter: '[{"id":"zone"}]' } },
        ]
        queryClient.setQueryData(filteredKey, tree())
        insertIntoSystemsTableCaches(queryClient, makeSystemDetail({ uid: 'root', parentUid: null }))

        expect(queryClient.getQueryData<SystemsResponse>(filteredKey)!.data[0].uid).toBe('parent')
        expect(queryClient.getQueryState(filteredKey)?.isInvalidated).toBe(true)
        expect(queryClient.getQueryData<SystemsResponse>(TABLE_KEY)!.data[0].uid).toBe('root')
    })
})
