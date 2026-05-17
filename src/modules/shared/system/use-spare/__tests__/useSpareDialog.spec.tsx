import { renderHook } from '@testing-library/react'

import { isFeatureEnabled } from '@/config/featureFlags'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSpareDialog } from '../useSpareDialog'

jest.mock('@/config/featureFlags', () => ({
    isFeatureEnabled: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../components/spare-assignment-wizard.cont', () => ({
    SpareAssignmentWizardContainer: () => null,
}))

const mockIsFeatureEnabled = isFeatureEnabled as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock
let warnSpy: jest.SpyInstance

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
    warnSpy.mockRestore()
})

describe('useSpareDialog', () => {
    it('warns and bails when feature flag disabled', () => {
        mockIsFeatureEnabled.mockReturnValue(false)
        const { result } = renderHook(() => useSpareDialog())
        result.current({ systemUid: 'sys', spareItemUid: 'sp' })
        expect(warnSpy).toHaveBeenCalled()
        expect(openModal).not.toHaveBeenCalled()
    })

    it('opens xl dialog with wizard container + props when enabled', () => {
        mockIsFeatureEnabled.mockReturnValue(true)
        const { result } = renderHook(() => useSpareDialog())
        const onSuccess = jest.fn()
        result.current({ systemUid: 'sys-1', spareItemUid: 'sp-2', onSuccess })
        expect(openModal).toHaveBeenCalledWith(
            'dialog',
            expect.objectContaining({
                id: 'spare-assignment-wizard',
                props: expect.objectContaining({
                    systemUid: 'sys-1',
                    spareItemUid: 'sp-2',
                    onSuccess,
                    size: 'xl',
                }),
            }),
        )
    })
})
