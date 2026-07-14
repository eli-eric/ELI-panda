import usePermission from '@/hooks/usePermission'
import { renderHookWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useSystemContext } from '../../../store/useSystemContext'
import useSystemEditFormFields from '../SystemForm.fields'

jest.mock('@/hooks/usePermission', () => ({ __esModule: true, default: jest.fn(() => true) }))

const mockUsePermission = usePermission as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUsePermission.mockReturnValue(true)
    useSystemContext.setState({ blockedEdit: false })
})

describe('useSystemEditFormFields', () => {
    it('enables system fields when role held and canEdit true (default)', () => {
        const { result } = renderHookWithProviders(() => useSystemEditFormFields())
        expect(result.current.name.disabled).toBe(false)
    })

    it('disables system fields when canEdit is false, even with the role', () => {
        const { result } = renderHookWithProviders(() => useSystemEditFormFields(false))
        expect(result.current.name.disabled).toBe(true)
        expect(result.current.systemCode.disabled).toBe(true)
    })

    it('still disables system fields when the SYSTEM_EDIT role is missing', () => {
        mockUsePermission.mockReturnValue(false)
        const { result } = renderHookWithProviders(() => useSystemEditFormFields(true))
        expect(result.current.name.disabled).toBe(true)
    })
})
