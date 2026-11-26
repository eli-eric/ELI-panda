import { renderHook } from '@testing-library/react'

import { useSystemDetail } from '@/modules/shared/system/system-detail/hooks/queries/useSystemDetail'
import { makeSystemDetail } from '@/testutils/factories/systemDetail'

import { useSystemCreateParentStore } from '../../store/useSystemCreateParentStore'
import { useSystemCreateParent } from '../useSystemCreateParent'

jest.mock('@/modules/shared/system/system-detail/hooks/queries/useSystemDetail', () => ({ useSystemDetail: jest.fn() }))

const mockUseSystemDetail = useSystemDetail as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    useSystemCreateParentStore.setState({ parentUid: null })
    mockUseSystemDetail.mockReturnValue({ system: null, isLoading: false, error: null, refetch: jest.fn() })
})

describe('useSystemCreateParent', () => {
    it('prefers store parentUid over arg', () => {
        useSystemCreateParentStore.setState({ parentUid: 'from-store' })
        renderHook(() => useSystemCreateParent('from-arg'))
        expect(mockUseSystemDetail).toHaveBeenCalledWith('from-store')
    })

    it('falls back to arg uid, and to null (disabled) without any', () => {
        renderHook(() => useSystemCreateParent('from-arg'))
        expect(mockUseSystemDetail).toHaveBeenLastCalledWith('from-arg')
        renderHook(() => useSystemCreateParent())
        expect(mockUseSystemDetail).toHaveBeenLastCalledWith(null)
    })

    it('returns an empty path while the parent is not loaded', () => {
        const { result } = renderHook(() => useSystemCreateParent('p'))
        expect(result.current.parentPath).toEqual([])
        expect(result.current.parentSystem).toBeNull()
    })

    it('appends the parent itself to its ancestors', () => {
        mockUseSystemDetail.mockReturnValue({
            system: makeSystemDetail({
                uid: 'p',
                name: 'Parent',
                systemLevel: 'KEY_SYSTEMS',
                parentPath: [{ uid: 'root', name: 'Root', systemLevel: 'SYSTEM_DOMAIN' }],
            }),
            isLoading: false,
            error: null,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useSystemCreateParent('p'))
        expect(result.current.parentPath).toEqual([
            { uid: 'root', name: 'Root', systemLevel: 'SYSTEM_DOMAIN' },
            { uid: 'p', name: 'Parent', systemLevel: 'KEY_SYSTEMS' },
        ])
    })
})
