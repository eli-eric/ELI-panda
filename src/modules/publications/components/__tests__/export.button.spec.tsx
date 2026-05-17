import { fireEvent, screen, waitFor } from '@testing-library/react'

import { QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'
import { render } from '@testing-library/react'
import { queryMutate } from '@/utils/fetcher'

import { ExportButton } from '../export.button'

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(),
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: jest.fn(() => ({ query: { search: '' } })),
}))

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('sonner', () => ({ toast: { promise: jest.fn() } }))
const sonner = jest.requireMock('sonner')

const mockQueryMutate = queryMutate as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockQueryMutate.mockReturnValue(jest.fn().mockResolvedValue({ data: 'csv,data\n1,2' }))
    ;(global.URL as any).createObjectURL = jest.fn(() => 'blob:fake')
    ;(global.URL as any).revokeObjectURL = jest.fn()
})

describe('ExportButton', () => {
    it('renders a button', () => {
        render(<ExportButton />, { wrapper: QueryClientWrapper })
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('click wraps export with toast.promise', async () => {
        render(<ExportButton />, { wrapper: QueryClientWrapper })
        fireEvent.click(screen.getByRole('button'))
        await waitFor(() => expect(sonner.toast.promise).toHaveBeenCalled())
        const [promise, msgs] = sonner.toast.promise.mock.calls[0]
        expect(typeof promise.then).toBe('function')
        expect(msgs).toEqual(
            expect.objectContaining({
                loading: 'Exporting CSV...',
                success: 'CSV exported',
                error: 'Failed to export CSV',
            }),
        )
    })

    it('click queues queryMutate with responseType: text + table query', async () => {
        render(<ExportButton />, { wrapper: QueryClientWrapper })
        fireEvent.click(screen.getByRole('button'))
        await waitFor(() =>
            expect(mockQueryMutate).toHaveBeenCalledWith(
                'publicationsExport',
                'get',
                expect.objectContaining({ responseType: 'text' }),
            ),
        )
    })
})
