import { fireEvent, screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { AddSystemTypeButton } from '../AddSystemTypeButton'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: Object.assign(jest.fn(), { getState: jest.fn() }),
}))

const mockUsePermission = usePermission as unknown as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock & {
    getState: jest.Mock
}

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid')
    mockUseDynamicModalStore.getState.mockReturnValue({ openModal })
    mockUsePermission.mockReturnValue(true)
})

describe('AddSystemTypeButton', () => {
    it('disabled when no selectedGroup', () => {
        renderWithProviders(
            <AddSystemTypeButton selectedGroup={null} refetch={jest.fn() as any} />,
        )
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('disabled when lacks SYSTEM_TYPE_EDIT permission', () => {
        mockUsePermission.mockReturnValue(false)
        renderWithProviders(
            <AddSystemTypeButton selectedGroup="g-1" refetch={jest.fn() as any} />,
        )
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('enabled when both selectedGroup + permission', () => {
        renderWithProviders(
            <AddSystemTypeButton selectedGroup="g-1" refetch={jest.fn() as any} />,
        )
        expect(screen.getByRole('button')).toBeEnabled()
    })

    it('click opens add-system-type dialog only when selectedGroup present', () => {
        renderWithProviders(
            <AddSystemTypeButton selectedGroup="g-1" refetch={jest.fn() as any} />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(openModal).toHaveBeenCalled()
    })
})
