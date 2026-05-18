import { act, waitFor } from '@testing-library/react'
import { toast } from 'sonner'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import FileManager from '../FileManager'
import { FILE_TYPE } from '../types'

jest.mock('sonner', () => {
    let counter = 0
    return {
        toast: {
            loading: jest.fn(() => `toast-${++counter}`),
            success: jest.fn(),
            error: jest.fn(),
            dismiss: jest.fn(),
            promise: jest.fn(),
        },
    }
})

let capturedOnDrop: ((files: File[]) => void) | null = null
jest.mock('react-dropzone', () => ({
    useDropzone: ({ onDrop }: { onDrop: (files: File[]) => void }) => {
        capturedOnDrop = onDrop
        return {
            getRootProps: () => ({}),
            getInputProps: () => ({}),
            isDragActive: false,
        }
    },
}))

jest.mock('@/core/axios/axiosInstance', () => ({
    __esModule: true,
    default: {
        get: jest.fn(() => Promise.resolve({ data: [] })),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(() => Promise.resolve({ data: {} })),
    },
}))

const mockToast = toast as jest.Mocked<typeof toast>

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
    capturedOnDrop = null
})

const makeFile = (name: string, sizeBytes = 100) => {
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

describe('FileManager integration', () => {
    it('drop triggers upload, shows loading + success toast', async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            json: () => Promise.resolve(fileItemResponse('a.txt')),
        })

        renderWithProviders(
            <FileManager itemType={FILE_TYPE.SYSTEM} uid="u1" hasEditRole={true} />,
        )

        expect(capturedOnDrop).not.toBeNull()

        await act(async () => {
            capturedOnDrop?.([makeFile('a.txt')])
        })

        await waitFor(() => expect(mockToast.success).toHaveBeenCalled())

        expect(mockToast.loading).toHaveBeenCalled()
        expect(mockFetch).toHaveBeenCalledWith(
            '/api/system/u1/files',
            expect.objectContaining({ method: 'POST' }),
        )
    })

    it('drop with failing fetch produces error toast with retry action', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 500,
            statusText: 'Server Error',
            json: () => Promise.resolve({ error: 'kaboom' }),
        })

        renderWithProviders(
            <FileManager itemType={FILE_TYPE.SYSTEM} uid="u1" hasEditRole={true} />,
        )

        await act(async () => {
            capturedOnDrop?.([makeFile('a.txt')])
        })

        await waitFor(() => expect(mockToast.error).toHaveBeenCalled())

        const errorOpts = mockToast.error.mock.calls[0][1] as unknown as {
            action: { label: string }
        }
        expect(errorOpts.action.label).toBeDefined()
    })
})
