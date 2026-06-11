import { fireEvent, screen } from '@testing-library/react'

import { openGraphModal } from '@/modules/shared/system/GraphModal'
import { useSystemDelete } from '@/modules/systems/hooks/useSystemDelete'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemActionButtons } from '../SystemActionButtons'

jest.mock('@/modules/systems/hooks/useSystemDelete', () => ({
    useSystemDelete: jest.fn(),
}))

jest.mock('@/modules/shared/system/GraphModal', () => ({
    openGraphModal: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuItem: ({
        children,
        onClick,
        asChild,
    }: {
        children: React.ReactNode
        onClick?: () => void
        asChild?: boolean
    }) =>
        asChild ? (
            <div data-testid="dd-item">{children}</div>
        ) : (
            <button data-testid="dd-item" onClick={onClick}>
                {children}
            </button>
        ),
    DropdownMenuSeparator: () => <hr />,
}))

const mockUseSystemDelete = useSystemDelete as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let deleteSystem: jest.Mock
let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    deleteSystem = jest.fn()
    openModal = jest.fn()
    mockUseSystemDelete.mockReturnValue({ deleteSystem })
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

const baseProps = {
    tableId: 'systems',
    original: { uid: 'u-1' } as any,
    canEdit: true,
}

describe('SystemActionButtons', () => {
    it('returns null when hideButtons', () => {
        const { container } = renderWithProviders(
            <SystemActionButtons {...baseProps} hideButtons />,
        )
        expect(container.firstChild).toBeNull()
    })

    it('always shows viewDetail + showGraph items', () => {
        renderWithProviders(<SystemActionButtons {...baseProps} />)
        // 3 items minimum (viewDetail, showGraph, delete because canEdit=true)
        expect(screen.getAllByTestId('dd-item').length).toBeGreaterThanOrEqual(3)
    })

    it('viewDetail item contains link with /system/{uid}', () => {
        renderWithProviders(<SystemActionButtons {...baseProps} />)
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/systems/hierarchy?leaf=u-1')
        expect(link).toHaveAttribute('target', '_blank')
    })

    it('Show Graph item calls openGraphModal(uid)', () => {
        renderWithProviders(<SystemActionButtons {...baseProps} />)
        // index: [0]=viewDetail (rendered as div with link inside), [1]=showGraph
        const items = screen.getAllByTestId('dd-item')
        fireEvent.click(items[1])
        expect(openGraphModal).toHaveBeenCalledWith('u-1')
    })

    it('Spare Parts items appear only on systems table with sparesIn/Out > 0', () => {
        renderWithProviders(
            <SystemActionButtons {...baseProps} sparesIn={3} sparesOut={5} />,
        )
        const items = screen.getAllByTestId('dd-item')
        // viewDetail + showGraph + showSpareParts + showSparePartsFor + delete = 5
        expect(items.length).toBe(5)
        fireEvent.click(items[2])
        expect(openModal).toHaveBeenCalledWith(
            'dialog',
            expect.objectContaining({ id: 'spare-parts-u-1' }),
        )
        fireEvent.click(items[3])
        expect(openModal).toHaveBeenCalledWith(
            'dialog',
            expect.objectContaining({ id: 'spare-parts-for-u-1' }),
        )
    })

    it('hides Delete item when canEdit=false', () => {
        renderWithProviders(<SystemActionButtons {...baseProps} canEdit={false} />)
        // viewDetail + showGraph only
        expect(screen.getAllByTestId('dd-item').length).toBe(2)
    })

    it('Delete invokes deleteSystem', () => {
        renderWithProviders(<SystemActionButtons {...baseProps} />)
        const items = screen.getAllByTestId('dd-item')
        // last clickable item is delete
        fireEvent.click(items[items.length - 1])
        expect(deleteSystem).toHaveBeenCalledTimes(1)
    })

    it('hides Spare Parts items when tableId !== "systems"', () => {
        renderWithProviders(
            <SystemActionButtons
                {...baseProps}
                tableId="otherTable"
                sparesIn={3}
                sparesOut={5}
            />,
        )
        // viewDetail + showGraph + delete = 3
        expect(screen.getAllByTestId('dd-item').length).toBe(3)
    })
})
