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
})
