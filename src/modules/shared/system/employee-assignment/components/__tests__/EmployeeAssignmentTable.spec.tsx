import { fireEvent, render, screen } from '@testing-library/react'

import type { EmployeeAssignment } from '../../types'
import { EmployeeAssignmentTable } from '../EmployeeAssignmentTable.comp'

// Mock react-intl to avoid IntlProvider requirement
jest.mock('react-intl', () => ({
    useIntl: () => ({
        formatMessage: ({ defaultMessage }: { defaultMessage: string }) => defaultMessage || '',
    }),
    FormattedMessage: ({ defaultMessage }: { defaultMessage: string }) => defaultMessage || '',
}))

// Mock hooks
jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(() => true),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(() => jest.fn(callback => callback)),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: () => ({
        openModal: jest.fn(() => 'modal-id'),
        closeModal: jest.fn(),
    }),
}))

const mockEmployees: EmployeeAssignment[] = [
    { uid: 'emp-1', fullName: 'John Doe' },
    { uid: 'emp-2', fullName: 'Jane Smith' },
]

describe('EmployeeAssignmentTable', () => {
    const defaultProps = {
        header: 'Test Header',
        data: mockEmployees,
        onAdd: jest.fn(),
        onRemove: jest.fn(),
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders header correctly', () => {
        render(<EmployeeAssignmentTable {...defaultProps} />)
        expect(screen.getByText('Test Header')).toBeInTheDocument()
    })

    it('renders all employees', () => {
        render(<EmployeeAssignmentTable {...defaultProps} />)
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })

    it('renders add button when user has edit permission', () => {
        render(<EmployeeAssignmentTable {...defaultProps} />)
        const addButtons = screen.getAllByRole('button')
        expect(addButtons.length).toBeGreaterThan(0)
    })

    it('calls onRemove when delete button is clicked', () => {
        render(<EmployeeAssignmentTable {...defaultProps} />)

        const deleteButtons = screen
            .getAllByRole('button')
            .filter(btn => btn.className.includes('text-orange'))

        expect(deleteButtons.length).toBe(2)

        fireEvent.click(deleteButtons[0])

        expect(defaultProps.onRemove).toHaveBeenCalledWith('emp-1')
    })

    it('disables add button when isLoading is true', () => {
        render(<EmployeeAssignmentTable {...defaultProps} isLoading />)

        const buttons = screen.getAllByRole('button')
        const addButton = buttons.find(btn =>
            btn.closest('div')?.textContent?.includes('Test Header'),
        )

        expect(addButton).toBeDisabled()
    })

    it('renders empty table without errors when data is empty', () => {
        render(<EmployeeAssignmentTable {...defaultProps} data={[]} />)
        expect(screen.getByText('Test Header')).toBeInTheDocument()
    })

    it('does not show delete buttons when user lacks edit permission', () => {
        const usePermission = require('@/hooks/usePermission').default
        usePermission.mockReturnValue(false)

        render(<EmployeeAssignmentTable {...defaultProps} />)

        const deleteButtons = screen
            .queryAllByRole('button')
            .filter(btn => btn.className.includes('text-orange'))

        expect(deleteButtons.length).toBe(0)
    })
})
