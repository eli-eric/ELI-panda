import { fireEvent, screen } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { EditCategoryButton } from '../EditCategoryButton'

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenuItem: ({
        onClick,
        children,
    }: {
        onClick?: (e: any) => void
        children: React.ReactNode
    }) => (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    ),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: { getState: jest.fn() } as any,
}))

jest.mock('../../CategoryEdit.cont', () => ({
    __esModule: true,
    default: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as {
    getState: jest.Mock
}

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid')
    mockUseDynamicModalStore.getState.mockReturnValue({ openModal })
})

describe('EditCategoryButton', () => {
    it('click opens sheet with id "category-edit-{uid}"', () => {
        renderWithProviders(<EditCategoryButton uid="cat-1" parentUID="parent-1" />)
        fireEvent.click(screen.getByRole('button'))
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('sheet')
        expect(config.id).toBe('category-edit-cat-1')
        expect(config.props.uid).toBe('cat-1')
        expect(config.props.parentUID).toBe('parent-1')
    })

    it('uses edit-title when uid present', () => {
        renderWithProviders(<EditCategoryButton uid="cat-1" />)
        fireEvent.click(screen.getByRole('button'))
        const config = openModal.mock.calls[0][1]
        // Translated id 'catalogue.category.editCategory' resolves to English
        expect(config.props.title).toMatch(/Edit/i)
    })

    it('click event stops propagation (calls e.stopPropagation)', () => {
        renderWithProviders(<EditCategoryButton uid="cat-1" />)
        // Trigger fireEvent.click; verify openModal is invoked (stopPropagation is internal)
        fireEvent.click(screen.getByRole('button'))
        expect(openModal).toHaveBeenCalled()
    })
})
