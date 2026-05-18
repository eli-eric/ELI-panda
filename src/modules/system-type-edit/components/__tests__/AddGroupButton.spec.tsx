import { fireEvent, screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { AddGroupButton } from '../AddGroupButton'

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

describe('AddGroupButton', () => {
    it('renders a button', () => {
        renderWithProviders(<AddGroupButton refetch={jest.fn() as any} />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('disabled when user lacks SYSTEM_TYPE_EDIT', () => {
        mockUsePermission.mockReturnValue(false)
        renderWithProviders(<AddGroupButton refetch={jest.fn() as any} />)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('click opens the add-group dialog via useDynamicModalStore.getState().openModal', () => {
        renderWithProviders(<AddGroupButton refetch={jest.fn() as any} />)
        fireEvent.click(screen.getByRole('button'))
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('add-system-type-group')
        expect(config.props).toEqual({ title: 'Add Group', size: 'm' })
    })
})
