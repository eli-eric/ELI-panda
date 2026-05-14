import { renderHook } from '@testing-library/react'

import { useSystemEditSheet } from '@/modules/shared/system/system-edit/useSystemEditSheet'

import { useSystemCellActions } from '../useSystemCellActions'

jest.mock('@/modules/shared/system/system-edit/useSystemEditSheet', () => ({
    useSystemEditSheet: jest.fn(),
}))

const mockUseSystemEditSheet = useSystemEditSheet as jest.Mock

const makeRow = (overrides: Partial<{ uid: string; hasSubsystems: boolean }>, expanded = false) =>
    ({
        original: { uid: 'sys-1', hasSubsystems: false, ...overrides },
        getIsExpanded: () => expanded,
        toggleExpanded: jest.fn(),
    }) as any

beforeEach(() => jest.clearAllMocks())

describe('useSystemCellActions', () => {
    it('returns hasSubsystems flag from row.original', () => {
        mockUseSystemEditSheet.mockReturnValue(jest.fn())
        const { result } = renderHook(() =>
            useSystemCellActions(makeRow({ hasSubsystems: true })),
        )
        expect(result.current.hasSubsystems).toBe(true)
    })

    it('handleExpand calls setUid + toggleExpanded when row is collapsed', () => {
        mockUseSystemEditSheet.mockReturnValue(jest.fn())
        const row = makeRow({ uid: 'sys-1' }, false)
        const setUid = jest.fn()

        const { result } = renderHook(() => useSystemCellActions(row, setUid))
        result.current.handleExpand()
        expect(setUid).toHaveBeenCalledWith('sys-1')
        expect(row.toggleExpanded).toHaveBeenCalled()
    })

    it('handleExpand does NOT call setUid when row is already expanded', () => {
        mockUseSystemEditSheet.mockReturnValue(jest.fn())
        const row = makeRow({}, true)
        const setUid = jest.fn()
        const { result } = renderHook(() => useSystemCellActions(row, setUid))

        result.current.handleExpand()
        expect(setUid).not.toHaveBeenCalled()
        expect(row.toggleExpanded).toHaveBeenCalled()
    })

    it('handleOpenEdit passes row uid to edit sheet opener', () => {
        const openEdit = jest.fn()
        mockUseSystemEditSheet.mockReturnValue(openEdit)
        const { result } = renderHook(() =>
            useSystemCellActions(makeRow({ uid: 'sys-X' })),
        )
        result.current.handleOpenEdit()
        expect(openEdit).toHaveBeenCalledWith('sys-X')
    })

    it('handleExpand without setUid still toggles', () => {
        mockUseSystemEditSheet.mockReturnValue(jest.fn())
        const row = makeRow({})
        const { result } = renderHook(() => useSystemCellActions(row))
        expect(() => result.current.handleExpand()).not.toThrow()
        expect(row.toggleExpanded).toHaveBeenCalled()
    })
})
