import { fireEvent, screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import { useCategoryUid } from '@/modules/catalogue/hooks/useCategoryUid'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { AddCategoryButton } from '../AddCateforyButton'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/modules/catalogue/hooks/useCategoryUid', () => ({
    useCategoryUid: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../CategoryEdit.cont', () => ({
    __esModule: true,
    default: () => null,
}))

jest.mock('@/components/ui/breadcrumb', () => ({
    BreadcrumbItem: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
    BreadcrumbSeparator: () => <span>/</span>,
}))

const mockUsePermission = usePermission as unknown as jest.Mock
const mockUseCategoryUid = useCategoryUid as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid')
    mockUseDynamicModalStore.mockImplementation((selector: any) => selector({ openModal }))
    mockUsePermission.mockReturnValue(true)
    mockUseCategoryUid.mockReturnValue('parent-1')
})

describe('AddCategoryButton', () => {
    it('returns null without CATALOGUE_EDIT permission', () => {
        mockUsePermission.mockReturnValue(false)
        const { container } = renderWithProviders(<AddCategoryButton />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders + click opens sheet with parent-id-based modal id', () => {
        renderWithProviders(<AddCategoryButton />)
        fireEvent.click(screen.getByRole('button'))
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('sheet')
        expect(config.id).toBe('category-add-parent-1')
    })

    it('modal id falls back to "root" when no parent', () => {
        mockUseCategoryUid.mockReturnValue(undefined)
        renderWithProviders(<AddCategoryButton />)
        fireEvent.click(screen.getByRole('button'))
        expect(openModal.mock.calls[0][1].id).toBe('category-add-root')
    })
})
