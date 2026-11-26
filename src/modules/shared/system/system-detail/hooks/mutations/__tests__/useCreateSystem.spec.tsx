import type { QueryClient } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react'
import type { PropsWithChildren } from 'react'

import { confirmSystemEdit } from '@/modules/shared/system/edit-permission'
import { makeSystemDetail } from '@/testutils/factories/systemDetail'
import { createTestQueryClient, QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'
import { queryMutate } from '@/utils/fetcher'

import { getSystemDetailQueryKey } from '../../queries/useSystemDetail'
import { useCreateSystem } from '../useCreateSystem'

jest.mock('@/utils/fetcher', () => ({ queryMutate: jest.fn() }))
jest.mock('@/modules/shared/system/edit-permission', () => {
    const actual = jest.requireActual('@/modules/shared/system/edit-permission')
    return { ...actual, confirmSystemEdit: jest.fn() }
})
jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

const mockQueryMutate = queryMutate as jest.Mock
const mockConfirm = confirmSystemEdit as jest.Mock

let queryClient: QueryClient
const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientWrapper client={queryClient}>{children}</QueryClientWrapper>
)

beforeEach(() => {
    jest.clearAllMocks()
    queryClient = createTestQueryClient()
    mockConfirm.mockResolvedValue(false)
})

describe('useCreateSystem', () => {
    it('POSTs to /systems and seeds the detail cache with the created system', async () => {
        const created = makeSystemDetail({ uid: 'new-1' })
        const post = jest.fn(async () => ({ data: created }))
        mockQueryMutate.mockReturnValue(post)
        const { result } = renderHook(() => useCreateSystem(), { wrapper })

        await act(async () => {
            await result.current.createSystem({ name: 'N', systemLevel: 'TRASH' })
        })

        expect(mockQueryMutate).toHaveBeenCalledWith('systemCreate', 'post')
        expect(post).toHaveBeenCalledWith({ name: 'N', systemLevel: 'TRASH' })
        expect(queryClient.getQueryData(getSystemDetailQueryKey('new-1'))).toEqual(created)
    })

    it('confirms only for a child, against the parent', async () => {
        const { result } = renderHook(() => useCreateSystem(), { wrapper })

        await expect(result.current.confirmCreate(null)).resolves.toBe(true)
        expect(mockConfirm).not.toHaveBeenCalled()

        await expect(result.current.confirmCreate('parent-1')).resolves.toBe(false)
        expect(mockConfirm).toHaveBeenCalledWith(queryClient, 'parent-1', expect.any(Function))
    })
})
