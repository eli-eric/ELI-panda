import type { QueryClient } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { toast } from 'sonner'

import { confirmSystemEdit } from '@/modules/shared/system/edit-permission'
import { makeSystemDetail } from '@/testutils/factories/systemDetail'
import { createTestQueryClient, QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'
import { queryMutate } from '@/utils/fetcher'
import { SYSTEM_DETAIL_QUERY_KEY } from '@/utils/query/queryKeys'

import { getSystemDetailQueryKey } from '../../queries/useSystemDetail'
import { useSystemPatch } from '../useSystemPatch'

jest.mock('@/utils/fetcher', () => ({ queryMutate: jest.fn() }))
jest.mock('@/modules/shared/system/edit-permission', () => {
    const actual = jest.requireActual('@/modules/shared/system/edit-permission')
    return { ...actual, confirmSystemEdit: jest.fn() }
})
jest.mock('sonner', () => ({ toast: { promise: jest.fn() } }))
jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

const mockQueryMutate = queryMutate as jest.Mock
const mockConfirm = confirmSystemEdit as jest.Mock
const mockToastPromise = toast.promise as jest.Mock

const UID = 'sys-1'
const T0 = '2026-11-26T10:00:00.000+01:00'
const T1 = '2026-11-26T10:00:01.000+01:00'
const T2 = '2026-11-26T10:00:02.000+01:00'

let queryClient: QueryClient
let sentBodies: Array<Record<string, unknown>>

const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientWrapper client={queryClient}>{children}</QueryClientWrapper>
)

const conflict = (code: string) =>
    Object.assign(new Error('Conflict'), {
        isAxiosError: true,
        code,
        response: { status: 409, data: { code, message: 'conflict' } },
    })

// Fake server: echoes a fresh detail with the next token for every PATCH.
const serveTokens = (...tokens: string[]) => {
    const queue = [...tokens]
    mockQueryMutate.mockImplementation(() => async (body: Record<string, unknown>) => {
        sentBodies.push(body)
        return { data: makeSystemDetail({ uid: UID, lastUpdateTime: queue.shift() ?? null }) }
    })
}

beforeEach(() => {
    jest.clearAllMocks()
    queryClient = createTestQueryClient()
    sentBodies = []
    mockConfirm.mockResolvedValue(true)
    queryClient.setQueryData(
        getSystemDetailQueryKey(UID),
        makeSystemDetail({ uid: UID, lastUpdateTime: T0 }),
    )
})

describe('useSystemPatch', () => {
    it('sends the cached lastUpdateTime as concurrency token and stores the response', async () => {
        serveTokens(T1)
        const { result } = renderHook(() => useSystemPatch(UID), { wrapper })

        await act(async () => {
            await result.current.patchSystem({ name: 'Renamed' })
        })

        expect(mockQueryMutate).toHaveBeenCalledWith('systemDetail', 'patch', { uid: UID })
        expect(sentBodies[0]).toEqual({ name: 'Renamed', lastUpdateTime: T0 })
        expect(
            queryClient.getQueryData<{ lastUpdateTime: string }>(getSystemDetailQueryKey(UID)),
        ).toEqual(expect.objectContaining({ lastUpdateTime: T1 }))
    })

    it('serializes writes to one system so each carries the token of the previous one', async () => {
        serveTokens(T1, T2)
        const { result } = renderHook(() => useSystemPatch(UID), { wrapper })

        await act(async () => {
            await Promise.all([
                result.current.patchSystem({ name: 'A' }),
                result.current.patchSystem({ description: 'B' }),
            ])
        })

        expect(sentBodies).toEqual([
            { name: 'A', lastUpdateTime: T0 },
            { description: 'B', lastUpdateTime: T1 },
        ])
    })

    it('omits the token when the detail was never loaded', async () => {
        queryClient.removeQueries({ queryKey: [SYSTEM_DETAIL_QUERY_KEY] })
        serveTokens(T1)
        const { result } = renderHook(() => useSystemPatch(UID), { wrapper })

        await act(async () => {
            await result.current.patchSystem({ name: 'A' })
        })

        expect(sentBodies[0]).toEqual({ name: 'A' })
    })

    it('does not write when the user declines the soft-lock prompt', async () => {
        mockConfirm.mockResolvedValue(false)
        serveTokens(T1)
        const { result } = renderHook(() => useSystemPatch(UID), { wrapper })

        await act(async () => {
            await expect(result.current.patchSystem({ name: 'A' })).rejects.toThrow(/cancelled/)
        })

        expect(sentBodies).toHaveLength(0)
        expect(mockToastPromise).not.toHaveBeenCalled()
    })

    it('on 409 STALE refetches the detail and shows the stale-conflict toast', async () => {
        mockQueryMutate.mockImplementation(() => async () => {
            throw conflict('STALE')
        })
        const invalidate = jest.spyOn(queryClient, 'invalidateQueries')
        const { result } = renderHook(() => useSystemPatch(UID), { wrapper })

        await act(async () => {
            await expect(result.current.patchSystem({ name: 'A' })).rejects.toBeTruthy()
        })

        await waitFor(() =>
            expect(invalidate).toHaveBeenCalledWith({ queryKey: getSystemDetailQueryKey(UID) }),
        )
        const { error } = mockToastPromise.mock.calls[0][1]
        expect(error(conflict('STALE'))).toBe('systemHierarchy.toast.staleConflict')
    })

    it('maps 409 DUPLICATE_SYSTEM_CODE to the duplicate-code toast', async () => {
        mockQueryMutate.mockImplementation(() => async () => {
            throw conflict('DUPLICATE_SYSTEM_CODE')
        })
        const { result } = renderHook(() => useSystemPatch(UID), { wrapper })

        await act(async () => {
            await expect(result.current.patchSystem({ systemCode: 'X-1' })).rejects.toBeTruthy()
        })

        const { error } = mockToastPromise.mock.calls[0][1]
        expect(error(conflict('DUPLICATE_SYSTEM_CODE'))).toBe('systemHierarchy.toast.duplicateCode')
    })

    it('uses the release wording when clearing the system code', async () => {
        serveTokens(T1)
        const { result } = renderHook(() => useSystemPatch(UID), { wrapper })

        await act(async () => {
            await result.current.patchSystem({ systemCode: null })
        })

        expect(mockToastPromise.mock.calls[0][1]).toEqual(
            expect.objectContaining({
                loading: 'systemHierarchy.toast.releasingCode',
                success: 'systemHierarchy.toast.codeReleased',
            }),
        )
    })
})
