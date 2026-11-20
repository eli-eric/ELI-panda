import { useMutation, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { CODEBOOK } from '@/types/constants/codebook'

import { useCodebookValueMutations } from '../useCodebookValueMutations'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}))

jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => jest.fn(async () => ({ uid: 'new', name: 'X' }))),
}))

jest.mock('sonner', () => ({
    toast: { promise: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockToast = toast as unknown as { promise: jest.Mock }

const ARGS = { codebookType: CODEBOOK.GRANT, queryKey: ['cb-grant'] }

let mutationOpts: any[]
beforeEach(() => {
    jest.clearAllMocks()
    mutationOpts = []
    mockUseQueryClient.mockReturnValue({ invalidateQueries: jest.fn() })
    mockUseMutation.mockImplementation(opts => {
        mutationOpts.push(opts)
        return {
            mutateAsync: jest.fn(async (input: any) => opts.mutationFn(input)),
            isPending: false,
        }
    })
})

describe('useCodebookValueMutations', () => {
    it('exposes create + update + delete + isPending + isUpdating', () => {
        const { result } = renderHook(() => useCodebookValueMutations(ARGS))
        expect(typeof result.current.create).toBe('function')
        expect(typeof result.current.update).toBe('function')
        expect(typeof result.current.delete).toBe('function')
        expect(result.current.isPending).toBe(false)
        expect(result.current.isUpdating).toBe(false)
    })

    it('aggregates isPending across the three mutations', () => {
        mockUseMutation
            .mockReturnValueOnce({ mutateAsync: jest.fn(), isPending: false })
            .mockReturnValueOnce({ mutateAsync: jest.fn(), isPending: true })
            .mockReturnValueOnce({ mutateAsync: jest.fn(), isPending: false })
        const { result } = renderHook(() => useCodebookValueMutations(ARGS))
        expect(result.current.isPending).toBe(true)
        expect(result.current.isUpdating).toBe(true)
    })

    it('onSuccess of all three calls invalidateQueries with the queryKey', () => {
        const invalidateQueries = jest.fn()
        mockUseQueryClient.mockReturnValue({ invalidateQueries })
        renderHook(() => useCodebookValueMutations(ARGS))
        mutationOpts.forEach(opts => opts.onSuccess())
        expect(invalidateQueries).toHaveBeenCalledTimes(3)
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['cb-grant'] })
    })

    it('create() wires toast.promise', async () => {
        const { result } = renderHook(() => useCodebookValueMutations(ARGS))
        await result.current.create({ name: '  Value  ' })
        expect(mockToast.promise).toHaveBeenCalledTimes(1)
    })

    it('update() and delete() also wire toast.promise', async () => {
        const { result } = renderHook(() => useCodebookValueMutations(ARGS))
        await result.current.update({ uid: 'u', name: ' V ', code: ' C ' })
        await result.current.delete('u')
        expect(mockToast.promise).toHaveBeenCalledTimes(2)
    })

    describe('conflict handling', () => {
        /** queryMutate wraps errors so the status lands on response.status, not status. */
        const conflictError = () => ({
            isAxiosError: true,
            message: 'Code already exists',
            response: { status: 409 },
        })

        it.each([
            ['create', 'codebooksPage.toast.codeAlreadyExists'],
            ['update', 'codebooksPage.toast.codeAlreadyExists'],
        ])('reports a 409 from %s as a duplicate code', async (op, expected) => {
            // Regression: the predicate read error.status, which queryMutate never sets,
            // so every conflict showed the generic failure message instead.
            const { result } = renderHook(() => useCodebookValueMutations(ARGS))
            await (result.current as any)[op]({ uid: 'u', name: 'X', code: 'DUP' })

            const [, opts] = mockToast.promise.mock.calls[0]
            expect(opts.error(conflictError())).toBe(expected)
        })

        it('reports a non-409 with the generic failure message', async () => {
            const { result } = renderHook(() => useCodebookValueMutations(ARGS))
            await result.current.create({ name: 'X' })

            const [, opts] = mockToast.promise.mock.calls[0]
            expect(opts.error({ isAxiosError: true, response: { status: 500 } })).toBe(
                'codebooksPage.toast.failedToAdd',
            )
        })
    })
})
