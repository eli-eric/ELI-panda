import { QueryClient } from '@tanstack/react-query'

import { SYSTEM_DETAIL_QUERY_KEY } from '../../../types/constants'
import { primeSystemDetailCache } from '../useSystemDetail'

describe('primeSystemDetailCache', () => {
    it('seeds the cache with a minimal SystemDetail-shaped payload', () => {
        const qc = new QueryClient()
        primeSystemDetailCache(qc, 'sys-1', {
            name: 'System One',
            systemCode: 'S-1',
            parentPath: [
                { uid: 'p0', name: 'Root' },
                { uid: 'p1', name: 'Group' },
            ],
        })

        const data = qc.getQueryData<any>([SYSTEM_DETAIL_QUERY_KEY, 'sys-1'])
        expect(data?.systems).toHaveLength(1)
        const node = data.systems[0]
        expect(node.uid).toBe('sys-1')
        expect(node.name).toBe('System One')
        expect(node.systemCode).toBe('S-1')
        expect(node.parentPath).toEqual([
            { __typename: 'System', uid: 'p0', name: 'Root', systemLevel: null },
            { __typename: 'System', uid: 'p1', name: 'Group', systemLevel: null },
        ])
    })

    it('handles missing parentPath and systemCode by defaulting to empty / null', () => {
        const qc = new QueryClient()
        primeSystemDetailCache(qc, 'sys-2', { name: 'Solo' })

        const node = qc.getQueryData<any>([SYSTEM_DETAIL_QUERY_KEY, 'sys-2']).systems[0]
        expect(node.systemCode).toBeNull()
        expect(node.parentPath).toEqual([])
    })

    it('does not overwrite an existing cache entry', () => {
        const qc = new QueryClient()
        const existing = { systems: [{ uid: 'sys-3', name: 'Existing' }] }
        qc.setQueryData([SYSTEM_DETAIL_QUERY_KEY, 'sys-3'], existing)
        const fetchSpy = jest.spyOn(qc, 'fetchQuery')

        primeSystemDetailCache(qc, 'sys-3', { name: 'Replacement' })

        const data = qc.getQueryData<any>([SYSTEM_DETAIL_QUERY_KEY, 'sys-3'])
        expect(data.systems[0].name).toBe('Existing')
        expect(fetchSpy).not.toHaveBeenCalled()
    })

    it('dispatches a background fetchQuery to refine the seed', () => {
        const qc = new QueryClient()
        const fetchSpy = jest.spyOn(qc, 'fetchQuery').mockImplementation(() => Promise.resolve({}))

        primeSystemDetailCache(qc, 'sys-4', { name: 'Optimistic' })

        expect(fetchSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                queryKey: [SYSTEM_DETAIL_QUERY_KEY, 'sys-4'],
                queryFn: expect.any(Function),
            }),
        )
    })
})
