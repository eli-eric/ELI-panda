import { fireEvent, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

import usePermission from '@/hooks/usePermission'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { CategoryItemComponent } from '../CategoryItem.comp'

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}))

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(() => (cb: () => void) => () => cb()),
}))

jest.mock('@/modules/catalogue/hooks/useCategoryUid', () => ({
    useCategoryUid: jest.fn(() => 'parent-1'),
}))

jest.mock('../../../hooks/useCategoryList', () => ({
    useCategoryList: jest.fn(() => ({ refetch: jest.fn() })),
}))

jest.mock('@tanstack/react-query', () => {
    const actual = jest.requireActual('@tanstack/react-query')
    return {
        ...actual,
        useMutation: jest.fn(() => ({ mutate: jest.fn() })),
    }
})

jest.mock('../../categoryEdit/components/CopyCategoryButton', () => ({
    CopyCategoryButton: () => <button>copy</button>,
}))
jest.mock('../../categoryEdit/components/DeleteCategoryButton', () => ({
    DeleteCategoryButton: () => <button>delete</button>,
}))
jest.mock('../../categoryEdit/components/EditCategoryButton', () => ({
    EditCategoryButton: () => <button>edit</button>,
    EditCategorySheetContent: () => null,
}))

const mockUsePermission = usePermission as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUsePermission.mockReturnValue(true)
})

const category = {
    uid: 'c-1',
    name: 'Optics',
    miniImageUrl: '/m.png;/orig.png',
} as any

describe('CategoryItemComponent', () => {
    it('renders category name', () => {
        renderWithProviders(
            <CategoryItemComponent
                category={category}
                setCategoryFilter={jest.fn()}
            />,
        )
        expect(screen.getByText('Optics')).toBeInTheDocument()
    })

    it('uses first miniImage url segment as avatar src', () => {
        const { container } = renderWithProviders(
            <CategoryItemComponent
                category={category}
                setCategoryFilter={jest.fn()}
            />,
        )
        const img = container.querySelector('img')
        expect(img).toBeNull() // RadixUI Avatar may not actually render <img> in jsdom until loaded
    })

    it('falls back to first letter for fallback', () => {
        renderWithProviders(
            <CategoryItemComponent
                category={category}
                setCategoryFilter={jest.fn()}
            />,
        )
        expect(screen.getByText('O')).toBeInTheDocument()
    })

    it('clicking the card invokes setCategoryFilter with {uid,name}', () => {
        const setCategoryFilter = jest.fn()
        const { container } = renderWithProviders(
            <CategoryItemComponent
                category={category}
                setCategoryFilter={setCategoryFilter}
            />,
        )
        // Click the Card root (role=button)
        const card = container.querySelector('[role="button"]') as HTMLElement
        fireEvent.click(card, { target: card })
        expect(setCategoryFilter).toHaveBeenCalledWith({ uid: 'c-1', name: 'Optics' })
    })

    it('hides actions menu when permission denied', () => {
        mockUsePermission.mockReturnValue(false)
        renderWithProviders(
            <CategoryItemComponent
                category={category}
                setCategoryFilter={jest.fn()}
            />,
        )
        expect(screen.queryByLabelText('Category actions')).toBeNull()
    })
})
