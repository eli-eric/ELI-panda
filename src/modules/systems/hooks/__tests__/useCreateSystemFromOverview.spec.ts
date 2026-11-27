import { renderHook } from '@testing-library/react'

import { useCreateSystemDialog } from '@/modules/shared/system/system-create/hooks/useCreateSystemDialog'
import { useSystemEditSheet } from '@/modules/shared/system/system-edit/useSystemEditSheet'

import { useCreateSystemFromOverview } from '../useCreateSystemFromOverview'

jest.mock('@/modules/shared/system/system-create/hooks/useCreateSystemDialog', () => ({
    useCreateSystemDialog: jest.fn(),
}))
jest.mock('@/modules/shared/system/system-edit/useSystemEditSheet', () => ({
    useSystemEditSheet: jest.fn(),
}))

const mockUseCreateSystemDialog = useCreateSystemDialog as jest.Mock
const mockUseSystemEditSheet = useSystemEditSheet as jest.Mock

describe('useCreateSystemFromOverview', () => {
    it('opens the Edit System sheet for the created system instead of navigating', () => {
        const openSystemEdit = jest.fn()
        const openCreate = jest.fn()
        mockUseSystemEditSheet.mockReturnValue(openSystemEdit)
        mockUseCreateSystemDialog.mockReturnValue(openCreate)

        const { result } = renderHook(() => useCreateSystemFromOverview())

        expect(result.current).toBe(openCreate)
        const { onCreated } = mockUseCreateSystemDialog.mock.calls[0][0]
        onCreated({ uid: 'new-uid' })
        expect(openSystemEdit).toHaveBeenCalledWith('new-uid')
    })
})
