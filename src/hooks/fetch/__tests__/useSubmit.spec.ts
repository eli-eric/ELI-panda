import { act, renderHook, waitFor } from '@testing-library/react'

import axiosInstance from '@/core/axios/axiosInstance'

import { useSubmit } from '../useSubmit'

jest.mock('@/core/axios/axiosInstance', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    },
}))

const mockedAxios = axiosInstance as unknown as {
    get: jest.Mock
    post: jest.Mock
    put: jest.Mock
    delete: jest.Mock
}

describe('useSubmit', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('initialises with empty state', () => {
        const { result } = renderHook(() => useSubmit({ endpoint: '/foo', method: 'post' }))
        expect(result.current.response).toBeNull()
        expect(result.current.error).toBeUndefined()
        expect(result.current.loading).toBe(false)
        expect(typeof result.current.submit).toBe('function')
    })

    it('runs success path: sets loading, response, fires onSuccess', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { id: 7 } })
        const onSuccess = jest.fn()
        const { result } = renderHook(() =>
            useSubmit<{ id: number }>({ endpoint: '/x', method: 'post', onSuccess }),
        )

        act(() => {
            result.current.submit({ a: 1 }, { source: 'test' })
        })
        expect(result.current.loading).toBe(true)

        await waitFor(() => expect(result.current.loading).toBe(false))
        expect(result.current.response).toEqual({ id: 7 })
        expect(onSuccess).toHaveBeenCalledWith({ id: 7 }, { a: 1 }, { source: 'test' })
        expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    })

    it('runs error path: fires onError, sets error', async () => {
        const err = { message: 'boom' }
        mockedAxios.put.mockRejectedValueOnce(err)
        const onError = jest.fn()
        const { result } = renderHook(() =>
            useSubmit({ endpoint: '/x', method: 'put', onError }),
        )

        act(() => {
            result.current.submit({})
        })
        await waitFor(() => expect(result.current.loading).toBe(false))
        expect(onError).toHaveBeenCalledWith(err)
        expect(result.current.error).toBe(err)
        expect(result.current.response).toBeNull()
    })

    it('prevents concurrent submits while in-flight', async () => {
        let resolve: (v: unknown) => void = () => undefined
        mockedAxios.post.mockReturnValueOnce(new Promise(r => (resolve = r)))
        const { result } = renderHook(() => useSubmit({ endpoint: '/x', method: 'post' }))

        act(() => {
            result.current.submit({ n: 1 })
            result.current.submit({ n: 2 })
        })
        expect(mockedAxios.post).toHaveBeenCalledTimes(1)

        await act(async () => {
            resolve({ data: 'done' })
            await Promise.resolve()
        })
        await waitFor(() => expect(result.current.loading).toBe(false))
    })

    it('uses the configured method', async () => {
        mockedAxios.delete.mockResolvedValueOnce({ data: null })
        const { result } = renderHook(() => useSubmit({ endpoint: '/x', method: 'delete' }))
        act(() => {
            result.current.submit()
        })
        await waitFor(() => expect(result.current.loading).toBe(false))
        expect(mockedAxios.delete).toHaveBeenCalledTimes(1)
        expect(mockedAxios.post).not.toHaveBeenCalled()
    })
})
