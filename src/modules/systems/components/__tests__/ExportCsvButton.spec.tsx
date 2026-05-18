import { fireEvent, render, screen } from '@testing-library/react'

import { useSubmit } from '@/hooks/fetch/useSubmit'

import { ExportCsvButton } from '../ExportCsvButton'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/hooks/fetch/useSubmit', () => ({
    useSubmit: jest.fn(),
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: jest.fn(() => ({ query: { search: 'foo' } })),
}))

jest.mock('@/utils/formatters', () => ({
    makeQuery: (q: any) => `?q=${JSON.stringify(q)}`,
}))

jest.mock('sonner', () => ({ toast: { error: jest.fn() } }))
const sonner = jest.requireMock('sonner')

const mockUseSubmit = useSubmit as jest.Mock

let submit: jest.Mock
let onError: (() => void) | undefined
let onSuccess: ((data: any) => void) | undefined

beforeEach(() => {
    jest.clearAllMocks()
    submit = jest.fn()
    mockUseSubmit.mockImplementation((opts: any) => {
        onError = opts.onError
        onSuccess = opts.onSuccess
        return { submit }
    })
    ;(global.URL as any).createObjectURL = jest.fn(() => 'blob:fake')
    ;(global.URL as any).revokeObjectURL = jest.fn()
})

describe('ExportCsvButton', () => {
    it('useSubmit wired to /systems/export-to-csv endpoint with query', () => {
        render(<ExportCsvButton />)
        const opts = mockUseSubmit.mock.calls[0][0]
        expect(opts.endpoint).toContain('/systems/export-to-csv')
        expect(opts.method).toBe('get')
    })

    it('click invokes submit', () => {
        render(<ExportCsvButton />)
        fireEvent.click(screen.getByRole('button'))
        expect(submit).toHaveBeenCalled()
    })

    it('onError shows toast', () => {
        render(<ExportCsvButton />)
        onError?.()
        expect(sonner.toast.error).toHaveBeenCalledWith('Failed to export CSV')
    })

    it('onSuccess triggers blob download (createObjectURL)', () => {
        const createAnchorSpy = jest.spyOn(document, 'createElement')
        render(<ExportCsvButton />)
        onSuccess?.(new Uint8Array([1, 2, 3]) as any)
        expect((global.URL as any).createObjectURL).toHaveBeenCalled()
        expect(createAnchorSpy).toHaveBeenCalledWith('a')
        createAnchorSpy.mockRestore()
    })
})
