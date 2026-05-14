import { act, render } from '@testing-library/react'

import { usePagination } from '@/hooks/table/usePagination'
import useTableStateStore from '@/store/useTableStateStore'

import { PaginationV2 } from '../PaginationV2'

jest.mock('@/hooks/table/usePagination', () => ({
    usePagination: jest.fn(),
}))

jest.mock('@/store/useTableStateStore', () => ({
    __esModule: true,
    default: jest.fn(),
}))

let lastCompProps: any = null
jest.mock('@/components/table/PaginationV2.comp', () => ({
    PaginationV2: (p: any) => {
        lastCompProps = p
        return <div data-testid="comp" />
    },
}))

const mockUsePagination = usePagination as jest.Mock
const mockUseTableStateStore = useTableStateStore as unknown as jest.Mock

let resetPagination: jest.Mock
let paginationHook: any

beforeEach(() => {
    jest.clearAllMocks()
    lastCompProps = null
    resetPagination = jest.fn()
    paginationHook = {
        pagination: { page: 1, pageSize: 10 },
        resetPagination,
    }
    mockUsePagination.mockReturnValue(paginationHook)
    mockUseTableStateStore.mockReturnValue({ instances: {} })
})

describe('PaginationV2 (shared wrapper)', () => {
    it('passes settings into usePagination + forwards props to comp', () => {
        render(
            <PaginationV2
                tableId="t1"
                settings={{ enableQueryURL: false, total: 42 }}
            />,
        )
        expect(mockUsePagination).toHaveBeenCalledWith(
            expect.objectContaining({
                tableId: 't1',
                enableQueryURL: false,
                total: 42,
            }),
        )
        expect(lastCompProps.total).toBe(42)
    })

    it('does NOT reset pagination on initial mount even with non-default state', () => {
        mockUseTableStateStore.mockReturnValue({
            instances: { t1: { search: 's' } },
        })
        render(<PaginationV2 tableId="t1" />)
        expect(resetPagination).not.toHaveBeenCalled()
    })

    it('resets pagination when search changes (after mount) and page > 1', () => {
        paginationHook.pagination = { page: 3, pageSize: 10 }
        // Initial render
        mockUseTableStateStore.mockReturnValue({
            instances: { t1: { search: 'a' } },
        })
        const { rerender } = render(<PaginationV2 tableId="t1" />)
        // Subsequent render with changed search
        mockUseTableStateStore.mockReturnValue({
            instances: { t1: { search: 'b' } },
        })
        act(() => {
            rerender(<PaginationV2 tableId="t1" />)
        })
        expect(resetPagination).toHaveBeenCalled()
    })

    it('does NOT reset when already on page 1', () => {
        paginationHook.pagination = { page: 1, pageSize: 10 }
        mockUseTableStateStore.mockReturnValue({
            instances: { t1: { search: 'a' } },
        })
        const { rerender } = render(<PaginationV2 tableId="t1" />)
        mockUseTableStateStore.mockReturnValue({
            instances: { t1: { search: 'b' } },
        })
        act(() => {
            rerender(<PaginationV2 tableId="t1" />)
        })
        expect(resetPagination).not.toHaveBeenCalled()
    })
})
