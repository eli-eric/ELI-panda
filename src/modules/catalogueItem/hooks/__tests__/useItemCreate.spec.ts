import { useMutation, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useItemCreate } from '../useItemCreate'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => jest.fn()),
}))

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockToast = toast as unknown as { success: jest.Mock; error: jest.Mock }

let mutationOpts: any
beforeEach(() => {
    jest.clearAllMocks()
    mockUseQueryClient.mockReturnValue({ invalidateQueries: jest.fn() })
    mockUseMutation.mockImplementation(opts => {
        mutationOpts = opts
        return { mutate: jest.fn(), isPending: false }
    })
})

describe('useItemCreate', () => {
    it('returns submit + loading aliases', () => {
        const mutate = jest.fn()
        mockUseMutation.mockReturnValue({ mutate, isPending: true })
        const { result } = renderHook(() => useItemCreate())
        expect(result.current.submit).toBe(mutate)
        expect(result.current.loading).toBe(true)
    })

    it('onSuccess invalidates catalogueItems and toasts the new name', () => {
        const invalidateQueries = jest.fn()
        mockUseQueryClient.mockReturnValue({ invalidateQueries })
        renderHook(() => useItemCreate())
        mutationOpts.onSuccess({ data: { name: 'Widget' } })
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['catalogueItems'] })
        expect(mockToast.success).toHaveBeenCalledWith('"Widget" was successfully created')
    })

    it('onSuccess falls back to provided itemName then "Item"', () => {
        renderHook(() => useItemCreate('Fallback'))
        mutationOpts.onSuccess({ data: { name: undefined } })
        expect(mockToast.success).toHaveBeenCalledWith('"Fallback" was successfully created')

        renderHook(() => useItemCreate())
        mutationOpts.onSuccess({ data: undefined })
        expect(mockToast.success).toHaveBeenLastCalledWith('"Item" was successfully created')
    })

    it('onError special-cases 409 / 400 / generic', () => {
        renderHook(() => useItemCreate())

        mutationOpts.onError({ response: { status: 409 } })
        expect(mockToast.error).toHaveBeenLastCalledWith(
            'Item already exists with this catalogue number',
        )

        mutationOpts.onError({ response: { status: 400 } })
        expect(mockToast.error).toHaveBeenLastCalledWith(
            'Invalid data provided. Please check the form.',
        )

        mutationOpts.onError({
            response: { status: 500, data: { message: 'oops' } },
            message: 'fallback',
        })
        expect(mockToast.error).toHaveBeenLastCalledWith('Failed to save item: oops')

        mutationOpts.onError({ message: 'fallback' })
        expect(mockToast.error).toHaveBeenLastCalledWith('Failed to save item: fallback')
    })
})
