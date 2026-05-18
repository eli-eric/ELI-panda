import { QueryClient } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { toast } from 'sonner'

import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import type { FileItem } from '../../types'
import { FILE_TYPE } from '../../types'
import { useFileUpload } from '../useFileUpload'

jest.mock('sonner', () => {
    let counter = 0
    return {
        toast: {
            loading: jest.fn(() => `toast-${++counter}`),
            success: jest.fn(),
            error: jest.fn(),
            dismiss: jest.fn(),
        },
    }
})

const mockToast = toast as jest.Mocked<typeof toast>

const makeFile = (name: string, sizeBytes: number) => {
    const file = new File(['x'], name, { type: 'text/plain' })
    Object.defineProperty(file, 'size', { value: sizeBytes })
    return file
}

const fileItemResponse = (name: string, id = `id-${name}`) => ({
    id,
    name,
    url: `https://example.com/${name}`,
    size: 100,
    tags: [],
})

const mockFetchOk = (response: object) =>
    Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(response),
    } as Response)

const mockFetchError = (status: number, body?: object) =>
    Promise.resolve({
        ok: false,
        status,
        statusText: `HTTP ${status}`,
        json: () =>
            body ? Promise.resolve(body) : Promise.reject(new Error('parse error')),
    } as Response)

const originalFetch = global.fetch
const mockFetch = jest.fn()

beforeAll(() => {
    global.fetch = mockFetch as unknown as typeof fetch
})

afterAll(() => {
    global.fetch = originalFetch
})

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useFileUpload', () => {
    it('returns an upload function', () => {
        const { result } = renderHook(
            () => useFileUpload({ itemType: FILE_TYPE.SYSTEM, uid: 'u1' }),
            { wrapper: AllProvidersWrapper },
        )
        expect(typeof result.current.upload).toBe('function')
    })

    it('calls toast.loading once and toast.success with same id on resolve', async () => {
        mockFetch.mockImplementation(() => mockFetchOk(fileItemResponse('a.txt')))

        const { result } = renderHook(
            () => useFileUpload({ itemType: FILE_TYPE.SYSTEM, uid: 'u1' }),
            { wrapper: AllProvidersWrapper },
        )

        await act(async () => {
            result.current.upload([makeFile('a.txt', 100)])
        })

        await waitFor(() => {
            expect(mockToast.success).toHaveBeenCalled()
        })

        expect(mockToast.loading).toHaveBeenCalled()
        const toastId = mockToast.loading.mock.results[0]?.value as string
        expect(mockToast.success).toHaveBeenCalledWith(
            expect.stringContaining('uploaded'),
            expect.objectContaining({ id: toastId }),
        )
    })

    it('calls fetch with correct URL and JSON body', async () => {
        mockFetch.mockImplementation(() => mockFetchOk(fileItemResponse('a.txt')))

        const { result } = renderHook(
            () => useFileUpload({ itemType: FILE_TYPE.SYSTEM, uid: 'u-99' }),
            { wrapper: AllProvidersWrapper },
        )

        await act(async () => {
            result.current.upload([makeFile('a.txt', 100)])
        })

        await waitFor(() => expect(mockFetch).toHaveBeenCalled())

        const [url, init] = mockFetch.mock.calls[0]
        expect(url).toBe('/api/system/u-99/files')
        expect((init as RequestInit).method).toBe('POST')
        const body = JSON.parse((init as RequestInit).body as string)
        expect(body.name).toBe('a.txt')
        expect(body.payload).toMatch(/^data:/)
    })

    it('shows error toast with retry action when some files fail', async () => {
        let call = 0
        mockFetch.mockImplementation(() => {
            call++
            if (call === 2) return mockFetchError(500, { error: 'server boom' })
            return mockFetchOk(fileItemResponse(`f${call}.txt`))
        })

        const { result } = renderHook(
            () => useFileUpload({ itemType: FILE_TYPE.SYSTEM, uid: 'u1' }),
            { wrapper: AllProvidersWrapper },
        )

        await act(async () => {
            result.current.upload([
                makeFile('f1.txt', 100),
                makeFile('f2.txt', 100),
                makeFile('f3.txt', 100),
            ])
        })

        await waitFor(() => expect(mockToast.error).toHaveBeenCalled())

        expect(mockToast.dismiss).toHaveBeenCalled()
        expect(mockToast.success).toHaveBeenCalled()
        const errorCall = mockToast.error.mock.calls[0]
        expect(errorCall[1]).toMatchObject({
            duration: Infinity,
            action: expect.objectContaining({ label: expect.any(String) }),
        })
    })

    it('retry action re-invokes upload with failed files', async () => {
        let call = 0
        mockFetch.mockImplementation(() => {
            call++
            return call === 1
                ? mockFetchError(500, { error: 'fail once' })
                : mockFetchOk(fileItemResponse('a.txt'))
        })

        const { result } = renderHook(
            () => useFileUpload({ itemType: FILE_TYPE.SYSTEM, uid: 'u1' }),
            { wrapper: AllProvidersWrapper },
        )

        await act(async () => {
            result.current.upload([makeFile('a.txt', 100)])
        })

        await waitFor(() => expect(mockToast.error).toHaveBeenCalled())

        const retryAction = mockToast.error.mock.calls[0][1] as unknown as {
            action: { onClick: () => void }
        }
        const loadingCallsBefore = mockToast.loading.mock.calls.length

        await act(async () => {
            retryAction.action.onClick()
        })

        await waitFor(() =>
            expect(mockToast.loading.mock.calls.length).toBeGreaterThan(loadingCallsBefore),
        )
    })

    it('limits concurrency to 3 in-flight uploads', async () => {
        let inFlight = 0
        let peak = 0
        mockFetch.mockImplementation(
            () =>
                new Promise(resolve => {
                    inFlight++
                    peak = Math.max(peak, inFlight)
                    setTimeout(() => {
                        inFlight--
                        resolve({
                            ok: true,
                            status: 200,
                            json: () => Promise.resolve(fileItemResponse('a.txt')),
                        } as Response)
                    }, 10)
                }),
        )

        const { result } = renderHook(
            () => useFileUpload({ itemType: FILE_TYPE.SYSTEM, uid: 'u1' }),
            { wrapper: AllProvidersWrapper },
        )

        const files = Array.from({ length: 7 }, (_, i) => makeFile(`f${i}.txt`, 100))

        await act(async () => {
            result.current.upload(files)
        })

        await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(7), { timeout: 2000 })
        expect(peak).toBeLessThanOrEqual(3)
    })

    it('parses server error body for user-friendly message', async () => {
        mockFetch.mockImplementation(() =>
            mockFetchError(413, { error: 'Request body exceeded 150MB' }),
        )

        const { result } = renderHook(
            () => useFileUpload({ itemType: FILE_TYPE.SYSTEM, uid: 'u1' }),
            { wrapper: AllProvidersWrapper },
        )

        await act(async () => {
            result.current.upload([makeFile('big.bin', 100)])
        })

        await waitFor(() => expect(mockToast.error).toHaveBeenCalled())

        const errorCall = mockToast.error.mock.calls[0]
        const description = (errorCall[1] as { description?: string })?.description
        expect(description).toContain('Request body exceeded')
    })

    it('falls back to status text when error body is unparseable', async () => {
        mockFetch.mockImplementation(() => mockFetchError(500))

        const { result } = renderHook(
            () => useFileUpload({ itemType: FILE_TYPE.SYSTEM, uid: 'u1' }),
            { wrapper: AllProvidersWrapper },
        )

        await act(async () => {
            result.current.upload([makeFile('a.txt', 100)])
        })

        await waitFor(() => expect(mockToast.error).toHaveBeenCalled())

        const errorCall = mockToast.error.mock.calls[0]
        const description = (errorCall[1] as { description?: string })?.description
        expect(description).toMatch(/HTTP 500|500/)
    })

    it('rejects files larger than 100MB client-side without fetching', async () => {
        const { result } = renderHook(
            () => useFileUpload({ itemType: FILE_TYPE.SYSTEM, uid: 'u1' }),
            { wrapper: AllProvidersWrapper },
        )

        const big = makeFile('huge.bin', 150 * 1024 * 1024)

        await act(async () => {
            result.current.upload([big])
        })

        await waitFor(() => expect(mockToast.error).toHaveBeenCalled())
        expect(mockFetch).not.toHaveBeenCalled()

        const errorMsg = mockToast.error.mock.calls[0][0] as string
        expect(errorMsg).toContain('huge.bin')
    })

    it('updates query cache with uploaded file after success', async () => {
        mockFetch.mockImplementation(() =>
            mockFetchOk(fileItemResponse('a.txt', 'id-a')),
        )

        // Use a client with gcTime > 0 so setQueryData persists without observers
        const queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false, gcTime: Infinity } },
        })
        const wrapper = ({ children }: { children: ReactNode }) => (
            <AllProvidersWrapper queryClient={queryClient}>
                {children}
            </AllProvidersWrapper>
        )

        const { result } = renderHook(
            () => useFileUpload({ itemType: FILE_TYPE.SYSTEM, uid: 'u1' }),
            { wrapper },
        )

        await act(async () => {
            result.current.upload([makeFile('a.txt', 100)])
        })

        await waitFor(() => expect(mockToast.success).toHaveBeenCalled())

        const cached = queryClient.getQueryData<FileItem[]>([
            'files',
            FILE_TYPE.SYSTEM,
            'u1',
        ])
        expect(cached).toEqual([
            expect.objectContaining({ id: 'id-a', name: 'a.txt' }),
        ])
    })
})
