import { fireEvent, screen } from '@testing-library/react'

import { useAccessControl } from '@/hooks/useAccessControl'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { DepartmentsComponent } from '../departments.comp'

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: jest.fn(),
}))

jest.mock('../department.listbox', () => ({
    DepartmentListbox: ({ name, disabled }: { name: string; disabled?: boolean }) => (
        <div data-testid="dept-listbox" data-name={name} data-disabled={String(!!disabled)} />
    ),
}))

jest.mock('@/components/form/inputs', () => ({
    Input: (props: any) => <input data-testid="inp" name={props.name} />,
}))

const mockUseAccessControl = useAccessControl as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseAccessControl.mockReturnValue(() => true)
})

describe('DepartmentsComponent', () => {
    it('renders Add button when permission granted', () => {
        renderWithProviders(<DepartmentsComponent />, {
            withForm: true,
            formProps: { defaultValues: { authorsDepartments: [{ department: null }] } },
        })
        // Add button + remove (per row)
        expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })

    it('hides Add and remove buttons when permission denied', () => {
        mockUseAccessControl.mockReturnValue(() => false)
        renderWithProviders(<DepartmentsComponent />, {
            withForm: true,
            formProps: { defaultValues: { authorsDepartments: [{ department: null }] } },
        })
        expect(screen.queryAllByRole('button').length).toBe(0)
    })

    it('Add button click appends a new row', () => {
        renderWithProviders(<DepartmentsComponent />, {
            withForm: true,
            formProps: { defaultValues: { authorsDepartments: [{ department: null }] } },
        })
        const buttonsBefore = screen.getAllByTestId('dept-listbox').length
        const addButton = screen.getByText(/.+/, { selector: 'button' }) // last button before Plus icon path is Add
        // The component renders Trash2 buttons for each row + 1 Add button.
        // Click the Add button (assumed last): get all buttons, click the last
        const allButtons = screen.getAllByRole('button')
        fireEvent.click(allButtons[allButtons.length - 1])
        const buttonsAfter = screen.getAllByTestId('dept-listbox').length
        expect(buttonsAfter).toBe(buttonsBefore + 1)
        // silence unused
        void addButton
    })
})
