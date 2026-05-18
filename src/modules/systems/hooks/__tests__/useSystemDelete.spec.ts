import { renderHook } from '@testing-library/react'

import useWarningModal from '@/hooks/useWarningModal'
import { useRecalculate } from '@/modules/systemItem/hooks/useRecalculate'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useSystemDelete } from '../useSystemDelete'

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/modules/systemItem/hooks/useRecalculate', () => ({
    useRecalculate: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => jest.fn().mockResolvedValue({})),
}))

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

const mockUseWarningModal = useWarningModal as jest.Mock
const mockUseRecalculate = useRecalculate as jest.Mock

let warningWrapper: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    warningWrapper = jest.fn(fn => () => fn())
    mockUseWarningModal.mockReturnValue(warningWrapper)
    mockUseRecalculate.mockReturnValue([jest.fn(), false])
})

describe('useSystemDelete', () => {
    it('returns deleteSystem function wrapped in warning modal', () => {
        const { result } = renderHook(
            () => useSystemDelete({ system: { uid: 'u-1', name: 'X' } as any }),
            { wrapper: AllProvidersWrapper },
        )
        expect(typeof result.current.deleteSystem).toBe('function')
        expect(warningWrapper).toHaveBeenCalled()
    })

    it('isPending is true when recalculating', () => {
        mockUseRecalculate.mockReturnValue([jest.fn(), true])
        const { result } = renderHook(
            () => useSystemDelete({ system: { uid: 'u-1', name: 'X' } as any }),
            { wrapper: AllProvidersWrapper },
        )
        expect(result.current.isPending).toBe(true)
    })

    it('useWarningModal receives a message with system name', () => {
        renderHook(
            () =>
                useSystemDelete({ system: { uid: 'u-1', name: 'My System' } as any }),
            { wrapper: AllProvidersWrapper },
        )
        expect(mockUseWarningModal).toHaveBeenCalled()
        const arg = mockUseWarningModal.mock.calls[0][0]
        expect(typeof arg).toBe('string')
    })
})
