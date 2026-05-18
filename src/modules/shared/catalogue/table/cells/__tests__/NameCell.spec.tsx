import { fireEvent, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import usePermission from '@/hooks/usePermission'
import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { NameCell } from '../NameCell'

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuItem: ({
        onClick,
        children,
    }: {
        onClick?: () => void
        children: ReactNode
    }) => (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    ),
}))

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: ReactNode }) => <>{children}</>,
}))

jest.mock('@/hooks/fetch/useEndpoint', () => ({ useEndpoint: jest.fn() }))
jest.mock('@/hooks/fetch/useSubmit', () => ({ useSubmit: jest.fn() }))
jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))
jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(() => (cb: () => void) => () => cb()),
}))
jest.mock('@/modules/catalogue/hooks/useCatalogueItems', () => ({
    useCatalogueItems: jest.fn(),
}))
jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

const mockUseEndpoint = useEndpoint as jest.Mock
const mockUseSubmit = useSubmit as jest.Mock
const mockUsePermission = usePermission as unknown as jest.Mock
const mockUseCatalogueItems = useCatalogueItems as jest.Mock
const { useDynamicModalStore } = jest.requireMock('@/store/useDynamicModalStore') as any

let submit: jest.Mock
let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    submit = jest.fn()
    openModal = jest.fn()
    mockUseEndpoint.mockReturnValue({ catalogueItem: '/api/x' })
    mockUseSubmit.mockReturnValue({ submit })
    mockUsePermission.mockReturnValue(true)
    mockUseCatalogueItems.mockReturnValue({
        refetch: jest.fn(),
        catalogueItems: [{ uid: '1' }],
    })
    useDynamicModalStore.mockImplementation((selector: any) => selector({ openModal }))
})

const cell = (uid = 'item-1', value = 'Widget') =>
    ({
        getValue: () => value,
        row: { original: { uid } } as any,
    }) as any

describe('NameCell', () => {
    it('renders item value as link to /catalogue-item/:uid', () => {
        renderWithProviders(<NameCell {...cell('u-99', 'Widget')} />)
        const link = screen.getByText('Widget').closest('a')
        expect(link).toHaveAttribute('href', '/catalogue/item/u-99')
    })

    it('hides actions dropdown when hideButtons=true', () => {
        renderWithProviders(<NameCell {...cell()} hideButtons />)
        // Only the link-asChild button visible
        expect(screen.queryByLabelText('Item actions')).toBeNull()
    })

    it('opens stats dialog on Statistics menu click', () => {
        renderWithProviders(<NameCell {...cell('u-1', 'X')} />)
        // The first button is the actions trigger; menu items follow as mocked buttons
        const buttons = screen.getAllByRole('button')
        // statistics is the 2nd button: 0=Item actions trigger, 1=stats, 2=delete (when canEdit)
        fireEvent.click(buttons[1])
        expect(openModal).toHaveBeenCalledWith(
            'dialog',
            expect.objectContaining({
                id: 'catalogue-statistics-u-1',
                props: expect.objectContaining({ catalogueItemUid: 'u-1' }),
            }),
        )
    })

    it('Delete menu hidden without CATALOGUE_EDIT permission', () => {
        mockUsePermission.mockReturnValue(false)
        renderWithProviders(<NameCell {...cell()} />)
        // 0=actions trigger (link asChild button), 1=stats only — no delete
        expect(screen.getAllByRole('button').length).toBe(2)
    })

    it('Delete menu triggers warning-wrapped deleteSubmit', () => {
        renderWithProviders(<NameCell {...cell()} />)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[buttons.length - 1])
        expect(submit).toHaveBeenCalled()
    })
})
