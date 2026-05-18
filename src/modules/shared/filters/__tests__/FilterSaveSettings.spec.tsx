import { fireEvent, screen } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders as render } from '@/testutils/wrappers/renderWithProviders'

import { FilterSaveSettings } from '../FilterSaveSettings'
import { useFilterOperations } from '../hooks/useFilterOperations'

jest.mock('../hooks/useFilterOperations', () => ({
    useFilterOperations: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../components/SaveFilterModalContent', () => ({
    SaveFilterModalContent: () => null,
}))

jest.mock('@/components/form/Form', () => ({
    Form: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('@/components/Buttons', () => ({
    Button: ({
        children,
        onClick,
        disabled,
    }: {
        children: React.ReactNode
        onClick?: () => void
        disabled?: boolean
    }) => (
        <button data-testid="btn" disabled={disabled} onClick={onClick}>
            {children}
        </button>
    ),
}))

jest.mock('@/components/form/Listbox', () => ({
    __esModule: true,
    default: ({ onChange }: { onChange: (v: any) => void }) => (
        <button data-testid="listbox" onClick={() => onChange({ uid: 'f1' })} />
    ),
}))

const mockUseFilterOperations = useFilterOperations as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock
let deleteFilter: jest.Mock
let updateFilter: jest.Mock
let createFilter: jest.Mock
let applyFilter: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn()
    deleteFilter = jest.fn()
    updateFilter = jest.fn()
    createFilter = jest.fn()
    applyFilter = jest.fn()
    mockUseFilterOperations.mockReturnValue({
        filters: [],
        savedFilter: null,
        formMethods: {} as any,
        applyFilter,
        updateFilter,
        deleteFilter,
        createFilter,
        canUpdate: false,
        canSaveNew: false,
    })
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

describe('FilterSaveSettings', () => {
    it('Delete button disabled without savedFilter', () => {
        render(
            <FilterSaveSettings
                tableId="t1"
                enableQueryURL
                resetForm={jest.fn()}
                defaultFormValues={{}}
            />,
        )
        const [del] = screen.getAllByTestId('btn')
        expect(del).toBeDisabled()
    })

    it('Update button disabled when canUpdate=false', () => {
        render(
            <FilterSaveSettings
                tableId="t1"
                enableQueryURL
                resetForm={jest.fn()}
                defaultFormValues={{}}
            />,
        )
        const buttons = screen.getAllByTestId('btn')
        // [del, update, save-new]
        expect(buttons[1]).toBeDisabled()
    })

    it('Update enabled when canUpdate=true + click triggers updateFilter', () => {
        mockUseFilterOperations.mockReturnValue({
            filters: [],
            savedFilter: { uid: 's' },
            formMethods: {} as any,
            applyFilter,
            updateFilter,
            deleteFilter,
            createFilter,
            canUpdate: true,
            canSaveNew: true,
        })
        render(
            <FilterSaveSettings
                tableId="t1"
                enableQueryURL
                resetForm={jest.fn()}
                defaultFormValues={{}}
            />,
        )
        const [, update] = screen.getAllByTestId('btn')
        fireEvent.click(update)
        expect(updateFilter).toHaveBeenCalled()
    })

    it('Save New button opens dialog with title "Save Filter"', () => {
        mockUseFilterOperations.mockReturnValue({
            filters: [],
            savedFilter: null,
            formMethods: {} as any,
            applyFilter,
            updateFilter,
            deleteFilter,
            createFilter,
            canUpdate: false,
            canSaveNew: true,
        })
        render(
            <FilterSaveSettings
                tableId="t1"
                enableQueryURL
                resetForm={jest.fn()}
                defaultFormValues={{}}
            />,
        )
        const buttons = screen.getAllByTestId('btn')
        // last button = save new
        fireEvent.click(buttons[buttons.length - 1])
        const [kind, opts] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(opts.id).toBe('filter-save-settings')
        expect(opts.props.title).toBe('Save Filter')
    })

    it('listbox change calls applyFilter', () => {
        render(
            <FilterSaveSettings
                tableId="t1"
                enableQueryURL
                resetForm={jest.fn()}
                defaultFormValues={{}}
            />,
        )
        fireEvent.click(screen.getByTestId('listbox'))
        expect(applyFilter).toHaveBeenCalledWith({ uid: 'f1' })
    })
})
