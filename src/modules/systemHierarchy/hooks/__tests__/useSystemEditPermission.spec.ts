import { renderHook } from '@testing-library/react'

import { useSystemCanEdit } from '../queries/useSystemCanEdit'
import { formatResponsibleName, useSystemEditPermission } from '../useSystemEditPermission'

jest.mock('../queries/useSystemCanEdit', () => ({
    useSystemCanEdit: jest.fn(),
}))

const mockUseSystemCanEdit = useSystemCanEdit as jest.Mock

const responsible = {
    uid: 'u1',
    firstName: 'Ann',
    lastName: 'Lee',
    username: 'alee',
    email: 'ann.lee@eli.eu',
}

const setQuery = (overrides: Record<string, unknown>) =>
    mockUseSystemCanEdit.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        refetch: jest.fn(),
        ...overrides,
    })

describe('useSystemEditPermission', () => {
    it('is denied and fail-closed while loading', () => {
        setQuery({ isLoading: true })
        const { result } = renderHook(() => useSystemEditPermission('s1'))
        expect(result.current.status).toBe('loading')
        expect(result.current.canEdit).toBe(false)
    })

    it('is not denied when no uid is provided (disabled query)', () => {
        // A disabled query never loads: data undefined, isLoading false, isError false.
        setQuery({ isLoading: false })
        const { result } = renderHook(() => useSystemEditPermission(null))
        expect(result.current.status).toBe('loading')
        expect(result.current.canEdit).toBe(false)
    })

    it('is fail-closed on fetch error', () => {
        setQuery({ isError: true })
        const { result } = renderHook(() => useSystemEditPermission('s1'))
        expect(result.current.status).toBe('error')
        expect(result.current.canEdit).toBe(false)
    })

    it('allows editing when the backend confirms', () => {
        setQuery({ data: { result: true, responsibles: [responsible] } })
        const { result } = renderHook(() => useSystemEditPermission('s1'))
        expect(result.current.status).toBe('allowed')
        expect(result.current.canEdit).toBe(true)
        expect(result.current.responsibles).toEqual([responsible])
    })

    it('denies and exposes responsibles when the backend says no', () => {
        setQuery({ data: { result: false, responsibles: [responsible] } })
        const { result } = renderHook(() => useSystemEditPermission('s1'))
        expect(result.current.status).toBe('denied')
        expect(result.current.canEdit).toBe(false)
        expect(result.current.responsibles).toEqual([responsible])
    })
})

describe('formatResponsibleName', () => {
    it('joins first and last name', () => {
        expect(formatResponsibleName(responsible)).toBe('Ann Lee')
    })

    it('falls back to username then email', () => {
        expect(
            formatResponsibleName({ ...responsible, firstName: null, lastName: null }),
        ).toBe('alee')
        expect(
            formatResponsibleName({
                ...responsible,
                firstName: null,
                lastName: null,
                username: null,
            }),
        ).toBe('ann.lee@eli.eu')
    })
})
