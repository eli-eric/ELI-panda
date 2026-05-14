import { fireEvent, screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { CategoryItemComponent } from '../CategoryItem.comp'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(() => (fn: any) => fn),
}))

jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    useMutation: () => ({ mutate: jest.fn() }),
}))

jest.mock('../../../hooks/useCategoryList', () => ({
    useCategoryList: () => ({ refetch: jest.fn() }),
}))

jest.mock('@/modules/catalogue/hooks/useCategoryUid', () => ({
    useCategoryUid: () => 'parent-uid',
}))

jest.mock('../../categoryEdit/components/CopyCategoryButton', () => ({
    CopyCategoryButton: () => <button data-testid="copy-btn">copy</button>,
}))

jest.mock('../../categoryEdit/components/DeleteCategoryButton', () => ({
    DeleteCategoryButton: () => <button data-testid="delete-btn">del</button>,
}))

jest.mock('../../categoryEdit/components/EditCategoryButton', () => ({
    EditCategoryButton: () => <button data-testid="edit-btn">edit</button>,
    EditCategorySheetContent: () => null,
}))

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

const category = {
    uid: 'c-1',
    name: 'Category Name',
    miniImageUrl: 'img1.png;img2.png',
} as any

beforeEach(() => {
    jest.clearAllMocks()
})

describe('CategoryItemComponent', () => {
    it('renders category name', () => {
        ;(usePermission as jest.Mock).mockReturnValue(false)
        renderWithProviders(
            <CategoryItemComponent category={category} setCategoryFilter={jest.fn()} />,
        )
        expect(screen.getByText('Category Name')).toBeInTheDocument()
    })

    it('clicking card invokes setCategoryFilter with uid+name', () => {
        ;(usePermission as jest.Mock).mockReturnValue(false)
        const setCategoryFilter = jest.fn()
        renderWithProviders(
            <CategoryItemComponent
                category={category}
                setCategoryFilter={setCategoryFilter}
            />,
        )
        fireEvent.click(screen.getByText('Category Name'))
        expect(setCategoryFilter).toHaveBeenCalledWith({ uid: 'c-1', name: 'Category Name' })
    })

    it('hides actions menu when no CATALOGUE_EDIT permission', () => {
        ;(usePermission as jest.Mock).mockReturnValue(false)
        renderWithProviders(
            <CategoryItemComponent category={category} setCategoryFilter={jest.fn()} />,
        )
        expect(screen.queryByLabelText('Category actions')).toBeNull()
    })

    it('shows actions menu with edit/copy/delete when has permission', () => {
        ;(usePermission as jest.Mock).mockReturnValue(true)
        renderWithProviders(
            <CategoryItemComponent category={category} setCategoryFilter={jest.fn()} />,
        )
        expect(screen.getByLabelText('Category actions')).toBeInTheDocument()
        expect(screen.getByTestId('edit-btn')).toBeInTheDocument()
        expect(screen.getByTestId('copy-btn')).toBeInTheDocument()
        expect(screen.getByTestId('delete-btn')).toBeInTheDocument()
    })

    it('renders avatar with category initial as fallback', () => {
        ;(usePermission as jest.Mock).mockReturnValue(false)
        renderWithProviders(
            <CategoryItemComponent category={category} setCategoryFilter={jest.fn()} />,
        )
        // Radix Avatar renders fallback (first char) until image loads
        expect(screen.getByText('C')).toBeInTheDocument()
    })
})
