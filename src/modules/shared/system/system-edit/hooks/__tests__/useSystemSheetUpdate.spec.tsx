import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { guardSystemEdit } from '@/modules/shared/system/edit-permission'
import { useSuspenseSystemDetail } from '@/modules/systemItem/hooks/useSuspenseSystemDetail'
import { renderHookWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useSystemSheetUpdate } from '../useSystemSheetUpdate'

jest.mock('@/hooks/fetch/useGraphQL', () => ({ useGraphQLMutation: jest.fn() }))
jest.mock('@/modules/shared/system/edit-permission', () => ({ guardSystemEdit: jest.fn() }))
jest.mock('@/modules/systemItem/hooks/useSuspenseSystemDetail', () => ({
    useSuspenseSystemDetail: jest.fn(),
}))
jest.mock('../../../../../systemItem/hooks/useRecalculate', () => ({
    useRecalculate: () => [jest.fn()],
}))
jest.mock('../../../../../systemItem/hooks/utils', () => ({ makeSystemInputBody: () => ({}) }))
jest.mock('../../../../../systemItem/store/useSystemItemStore', () => ({
    useSystemItemStore: () => ({
        selectedPhysicalSystem: undefined,
        setSelectedPhysicalSystem: jest.fn(),
    }),
}))
jest.mock('../../../../../systemItem/utils/hookHelpers', () => ({
    showErrorToast: jest.fn(),
    showSuccessToast: jest.fn(),
}))

const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock
const mockGuardSystemEdit = guardSystemEdit as jest.Mock
const mockUseSuspenseSystemDetail = useSuspenseSystemDetail as jest.Mock

let update: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    update = jest.fn()
    mockUseGraphQLMutation.mockReturnValue({ mutate: update, isPending: false })
    mockUseSuspenseSystemDetail.mockReturnValue({
        systemDetail: { uid: 'sys-1' },
        refetch: jest.fn(),
        physicalItem: undefined,
    })
})

describe('useSystemSheetUpdate', () => {
    it('does not fire the updateSystems mutation when the guard denies', async () => {
        mockGuardSystemEdit.mockResolvedValue(false)
        const { result } = renderHookWithProviders(() => useSystemSheetUpdate({ uid: 'sys-1' }))

        await result.current.updateSystem({} as never)

        expect(mockGuardSystemEdit).toHaveBeenCalledWith(
            expect.anything(),
            'sys-1',
            expect.any(Function),
        )
        expect(update).not.toHaveBeenCalled()
    })

    it('fires the updateSystems mutation when the guard allows', async () => {
        mockGuardSystemEdit.mockResolvedValue(true)
        const { result } = renderHookWithProviders(() => useSystemSheetUpdate({ uid: 'sys-1' }))

        await result.current.updateSystem({} as never)

        expect(update).toHaveBeenCalledTimes(1)
    })
})
