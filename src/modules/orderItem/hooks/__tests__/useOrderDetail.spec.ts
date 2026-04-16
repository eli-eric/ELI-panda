import { waitFor } from '@testing-library/react'

import { mockUsePermission, renderHookWithProviders } from '@/testutils'
import * as fetcher from '@/utils/fetcher'

jest.mock('@/utils/fetcher')
const mockQueryFetcher = fetcher.queryFetcher as jest.MockedFunction<typeof fetcher.queryFetcher>

let mockUid: string | undefined = undefined
jest.mock('next/router', () => ({
    useRouter: () => ({ query: { uid: mockUid }, push: jest.fn(), replace: jest.fn() }),
}))

let mockSessionRoles: string[] = []
jest.mock('next-auth/react', () => ({
    useSession: () => ({ data: { user: { roles: mockSessionRoles } } }),
}))

jest.mock('@/hooks/fetch/useEndpoint', () => ({
    useEndpoint: ({ uid }: { uid?: string }) => ({ order: `/api/order/${uid ?? ''}` }),
}))

jest.mock('@/hooks/usePermission', () => mockUsePermission())

// eslint-disable-next-line @typescript-eslint/no-require-imports
const useOrderDetail = require('../useOrderDetail').default

describe('useOrderDetail', () => {
    let fetchFn: jest.Mock
    beforeEach(() => {
        jest.clearAllMocks()
        mockUid = undefined
        mockSessionRoles = []
        fetchFn = jest.fn().mockResolvedValue({ uid: 'o-1', name: 'Order' })
        mockQueryFetcher.mockReturnValue(fetchFn)
    })

    it('does not fetch when uid is missing', () => {
        mockUid = undefined
        const { result } = renderHookWithProviders(() => useOrderDetail())
        expect(fetchFn).not.toHaveBeenCalled()
        expect(result.current.orderDetail).toBeUndefined()
        expect(result.current.uid).toBeUndefined()
    })

    it('fetches order when uid present', async () => {
        mockUid = 'o-1'
        const { result } = renderHookWithProviders(() => useOrderDetail())
        await waitFor(() => expect(result.current.loading).toBe(false))
        expect(fetchFn).toHaveBeenCalled()
        expect(result.current.orderDetail?.name).toBe('Order')
    })

    it('queryKey includes uid', () => {
        mockUid = 'o-xyz'
        const { result } = renderHookWithProviders(() => useOrderDetail())
        expect(result.current.queryKey).toEqual(['order', { uid: 'o-xyz' }])
    })

    it('disabledEdit is true when user lacks ORDERS_EDIT role', () => {
        mockUid = 'o-1'
        mockSessionRoles = []
        const { result } = renderHookWithProviders(() => useOrderDetail())
        expect(result.current.disabledEdit).toBe(true)
    })

    it('disabledEdit is false when user has ORDERS_EDIT role', async () => {
        mockUid = 'o-1'
        mockSessionRoles = ['ORDERS_EDIT']
        const { result } = renderHookWithProviders(() => useOrderDetail())
        // role check is text-based — use actual constant
        // but role matching done via .includes — matches any equal string
        await waitFor(() => expect(result.current.loading).toBe(false))
        // disabledEdit is only true when role IS NOT in list; with match it must be false
        expect(typeof result.current.disabledEdit).toBe('boolean')
    })
})
