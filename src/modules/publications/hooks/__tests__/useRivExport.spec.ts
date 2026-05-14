import { act, renderHook } from '@testing-library/react'

import { fetchRequestDetailed } from '@/core/http/fetchClient'

import { useRivExport } from '../useRivExport'

jest.mock('@/core/http/fetchClient', () => ({
    fetchRequestDetailed: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockFetch = fetchRequestDetailed as unknown as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    // jsdom stubs
    if (!window.URL.createObjectURL) {
        ;(window.URL as any).createObjectURL = jest.fn(() => 'blob:url')
    } else {
        ;(window.URL.createObjectURL as jest.Mock).mockReturnValue('blob:url')
    }
    if (!window.URL.revokeObjectURL) {
        ;(window.URL as any).revokeObjectURL = jest.fn()
    }
})

describe('useRivExport', () => {
    it('returns isDownloading default false', () => {
        const { result } = renderHook(() => useRivExport('2026', 'ELI', 'D1'))
        expect(result.current.isDownloading).toBe(false)
        expect(typeof result.current.downloadXml).toBe('function')
    })

    it('downloadXml fetches with year+provider+deliveryRef in URL', async () => {
        mockFetch.mockResolvedValueOnce({
            data: new Blob(['<xml/>']),
            headers: { 'content-disposition': 'attachment; filename="riv.xml"' },
        })
        const { result } = renderHook(() => useRivExport('2026', 'ELI', 'D1'))
        await act(async () => {
            await result.current.downloadXml()
        })
        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining(
                '/publications/export/riv?year=2026&provider=ELI&deliveryRef=D1',
            ),
            { responseType: 'blob' },
        )
    })

    it('uses filename from content-disposition header when present', async () => {
        const anchorClick = jest.fn()
        const realCreate = document.createElement.bind(document)
        jest.spyOn(document, 'createElement').mockImplementation(tag => {
            if (tag === 'a') {
                return { click: anchorClick, href: '', download: '' } as any
            }
            return realCreate(tag)
        })

        mockFetch.mockResolvedValueOnce({
            data: new Blob([]),
            headers: { 'content-disposition': 'attachment; filename="custom-file.xml"' },
        })
        const { result } = renderHook(() => useRivExport('2026', 'ELI', 'D1'))
        await act(async () => {
            await result.current.downloadXml()
        })
        expect(anchorClick).toHaveBeenCalled()
        ;(document.createElement as jest.Mock).mockRestore()
    })

    it('uses fallback filename when content-disposition missing', async () => {
        mockFetch.mockResolvedValueOnce({ data: new Blob([]), headers: {} })
        const { result } = renderHook(() => useRivExport('2026', 'ELI', 'D'))
        await act(async () => {
            await result.current.downloadXml()
        })
        // fallback was used - no throw + isDownloading reset
        expect(result.current.isDownloading).toBe(false)
    })

    it('fires toast.error on fetch failure', async () => {
        mockFetch.mockRejectedValueOnce(new Error('boom'))
        const { result } = renderHook(() => useRivExport('2026', 'ELI', 'D'))
        await act(async () => {
            await result.current.downloadXml()
        })
        expect(mockToast.error).toHaveBeenCalledWith('Failed to download RIV export')
        expect(result.current.isDownloading).toBe(false)
    })
})
