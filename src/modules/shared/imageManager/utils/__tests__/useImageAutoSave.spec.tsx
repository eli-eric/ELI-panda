import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'

import axiosInstance from '@/core/axios/axiosInstance'
import { uniFetcher } from '@/utils/fetcher'

import type { FileItem } from '../../../fileManager/types'
import { useImageAutoSave } from '../useImageAutoSave'

jest.mock('@/core/axios/axiosInstance', () => ({
    __esModule: true,
    default: {
        post: jest.fn(),
        delete: jest.fn(),
        get: jest.fn(),
        put: jest.fn(),
    },
}))

// mimic sonner: attach handlers so a rejected mutation promise is considered handled
jest.mock('sonner', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
        promise: jest.fn((p: Promise<unknown>) => {
            p.catch(() => {})
            return p
        }),
    },
}))

// the mount-time list query reads through uniFetcher; seed the initial list here
jest.mock('@/utils/fetcher', () => ({ uniFetcher: jest.fn() }))

jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

const mockedAxios = axiosInstance as unknown as { post: jest.Mock; delete: jest.Mock }
const mockedFetcher = uniFetcher as jest.Mock

const endpoint = '/api/system/uid-1/image'
const ARGS = { itemCategory: 'system', itemId: 'uid-1' }
const KEY = ['fileItem', endpoint]

const buildWrapper = (qc: QueryClient) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    )
    return Wrapper
}

const file = (name: string) => new File(['x'], name, { type: 'image/png' })
const item = (id: string, name = `${id}.png`): FileItem => ({ id, name, url: '', size: 1 })

// mount the hook with a seeded server list and wait for the list query to settle
const mountWith = async (initial: FileItem[]) => {
    mockedFetcher.mockResolvedValue(initial)
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    // stub invalidate so onSettled doesn't refetch away the optimistic cache under test
    jest.spyOn(qc, 'invalidateQueries').mockResolvedValue(undefined)
    const hook = renderHook(() => useImageAutoSave(ARGS), { wrapper: buildWrapper(qc) })
    await waitFor(() => expect(hook.result.current.images).toHaveLength(initial.length))
    return { qc, ...hook }
}

beforeEach(() => jest.clearAllMocks())

describe('useImageAutoSave', () => {
    it('uploadImages optimistically prepends a temp entry and POSTs', async () => {
        mockedAxios.post.mockResolvedValue({ data: null })
        const { qc, result } = await mountWith([item('existing')])

        await act(async () => {
            await result.current.uploadImages([file('new.png')])
            await new Promise(r => setTimeout(r, 0))
        })

        const cached = qc.getQueryData<FileItem[]>(KEY)!
        expect(cached.map(c => c.name)).toEqual(['new.png', 'existing.png'])
        expect(cached[0].id.startsWith('temp-')).toBe(true)
        await waitFor(() => expect(mockedAxios.post).toHaveBeenCalled())
        expect(mockedAxios.post.mock.calls[0][0]).toBe(endpoint)
        await waitFor(() => expect(qc.invalidateQueries).toHaveBeenCalledWith({ queryKey: KEY }))
    })

    it('uploadImages rolls back the optimistic entry when the POST fails', async () => {
        mockedAxios.post.mockRejectedValue(new Error('nope'))
        const initial = [item('existing')]
        const { qc, result } = await mountWith(initial)

        await act(async () => {
            await result.current.uploadImages([file('new.png')])
            await new Promise(r => setTimeout(r, 0))
        })

        await waitFor(() => expect(qc.getQueryData<FileItem[]>(KEY)).toEqual(initial))
    })

    it('deleteImage optimistically removes the item and DELETEs', async () => {
        mockedAxios.delete.mockResolvedValue({ data: null })
        const target = item('real-1', 'a.png')
        const { qc, result } = await mountWith([target])

        await act(async () => {
            result.current.deleteImage(target)
            await new Promise(r => setTimeout(r, 0))
        })

        expect(qc.getQueryData<FileItem[]>(KEY)).toEqual([])
        await waitFor(() => expect(mockedAxios.delete).toHaveBeenCalledWith(`${endpoint}/real-1`))
        await waitFor(() => expect(qc.invalidateQueries).toHaveBeenCalledWith({ queryKey: KEY }))
    })

    it('deleteImage restores the item when the DELETE fails', async () => {
        mockedAxios.delete.mockRejectedValue(new Error('nope'))
        const target = item('real-1', 'a.png')
        const { qc, result } = await mountWith([target])

        await act(async () => {
            result.current.deleteImage(target)
            await new Promise(r => setTimeout(r, 0))
        })

        await waitFor(() => expect(qc.getQueryData<FileItem[]>(KEY)).toEqual([target]))
    })
})
