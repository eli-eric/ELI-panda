import { renderHook, waitFor } from '@testing-library/react'

import { QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'
import { queryMutate } from '@/utils/fetcher'

import { useAssignRelations } from '../useAssignRelations'

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: {
        success: jest.fn(),
        warning: jest.fn(),
        error: jest.fn(),
    },
}))

const mockQueryMutate = queryMutate as jest.Mock
const sonner = jest.requireMock('sonner')

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useAssignRelations', () => {
    it('mutation uses systemRelationshipsBatch endpoint via POST', () => {
        mockQueryMutate.mockReturnValue(jest.fn().mockResolvedValue({ data: { created: 0, skipped: 0 } }))
        renderHook(() => useAssignRelations(), { wrapper: QueryClientWrapper })
        expect(mockQueryMutate).toHaveBeenCalledWith('systemRelationshipsBatch', 'post')
    })

    it('success toast shows created count', async () => {
        const fn = jest.fn().mockResolvedValue({ data: { created: 3, skipped: 0 } })
        mockQueryMutate.mockReturnValue(fn)
        const { result } = renderHook(() => useAssignRelations(), {
            wrapper: QueryClientWrapper,
        })
        result.current.assignRelations({
            sourceUids: ['a'],
            targetUids: ['b'],
            relationshipType: 'IS_SPARE_FOR' as any,
        })
        await waitFor(() =>
            expect(sonner.toast.success).toHaveBeenCalledWith('Relationships created: 3'),
        )
    })

    it('skipped count triggers warning toast (duration 10000)', async () => {
        const fn = jest.fn().mockResolvedValue({ data: { created: 1, skipped: 2 } })
        mockQueryMutate.mockReturnValue(fn)
        const { result } = renderHook(() => useAssignRelations(), {
            wrapper: QueryClientWrapper,
        })
        result.current.assignRelations({
            sourceUids: ['a'],
            targetUids: ['b'],
            relationshipType: 'IS_SPARE_FOR' as any,
        })
        await waitFor(() =>
            expect(sonner.toast.warning).toHaveBeenCalledWith('Skipped: 2', { duration: 10000 }),
        )
    })

    it('no warning toast when skipped=0', async () => {
        const fn = jest.fn().mockResolvedValue({ data: { created: 1, skipped: 0 } })
        mockQueryMutate.mockReturnValue(fn)
        const { result } = renderHook(() => useAssignRelations(), {
            wrapper: QueryClientWrapper,
        })
        result.current.assignRelations({
            sourceUids: ['a'],
            targetUids: ['b'],
            relationshipType: 'IS_SPARE_FOR' as any,
        })
        await waitFor(() => expect(sonner.toast.success).toHaveBeenCalled())
        expect(sonner.toast.warning).not.toHaveBeenCalled()
    })

    it('error path shows error toast', async () => {
        const fn = jest.fn().mockRejectedValue(new Error('boom'))
        mockQueryMutate.mockReturnValue(fn)
        const { result } = renderHook(() => useAssignRelations(), {
            wrapper: QueryClientWrapper,
        })
        result.current.assignRelations({
            sourceUids: ['a'],
            targetUids: ['b'],
            relationshipType: 'IS_SPARE_FOR' as any,
        })
        await waitFor(() => expect(sonner.toast.error).toHaveBeenCalledWith('boom'))
    })
})
