import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useTeamSelection } from '../useTeamSelection'

jest.mock('next/router', () => ({ useRouter: jest.fn() }))

const mockUseRouter = useRouter as jest.Mock

const setupRouter = (query: Record<string, unknown>) => {
    const push = jest.fn()
    mockUseRouter.mockReturnValue({ query, pathname: '/administration/teams', push })
    return push
}

describe('useTeamSelection', () => {
    it('reads the selected uid from ?team', () => {
        setupRouter({ team: 't-1' })
        expect(renderHook(() => useTeamSelection()).result.current.selectedUid).toBe('t-1')
    })

    it('falls back to null when ?team is absent', () => {
        setupRouter({})
        expect(renderHook(() => useTeamSelection()).result.current.selectedUid).toBeNull()
    })

    it('takes the first value when ?team arrives as an array', () => {
        setupRouter({ team: ['t-1', 't-2'] })
        expect(renderHook(() => useTeamSelection()).result.current.selectedUid).toBe('t-1')
    })

    it('selectTeam pushes the uid with shallow navigation', () => {
        const push = setupRouter({ other: 'x' })
        renderHook(() => useTeamSelection()).result.current.selectTeam('t-9')
        expect(push).toHaveBeenCalledWith(
            { pathname: '/administration/teams', query: { other: 'x', team: 't-9' } },
            undefined,
            { shallow: true },
        )
    })

    it('clearSelection drops the ?team param', () => {
        const push = setupRouter({ other: 'x', team: 't-1' })
        renderHook(() => useTeamSelection()).result.current.clearSelection()
        expect(push).toHaveBeenCalledWith(
            { pathname: '/administration/teams', query: { other: 'x' } },
            undefined,
            { shallow: true },
        )
    })
})
