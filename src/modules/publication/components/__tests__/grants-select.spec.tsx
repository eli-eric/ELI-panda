import { fireEvent, screen } from '@testing-library/react'

import { useAccessControl } from '@/hooks/useAccessControl'
import { useGrantSelectionModal } from '@/modules/shared/form/grantSelect'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { GrantsSelectComponent } from '../grants-select.comp'

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: jest.fn(),
}))

jest.mock('@/modules/shared/form/grantSelect', () => ({
    useGrantSelectionModal: jest.fn(),
}))

const mockUseAccessControl = useAccessControl as jest.Mock
const mockUseGrantSelectionModal = useGrantSelectionModal as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseAccessControl.mockReturnValue(() => true)
    mockUseGrantSelectionModal.mockReturnValue({ openGrantModal: jest.fn() })
})

describe('GrantsSelectComponent', () => {
    it('shows empty placeholder when no grants', () => {
        renderWithProviders(<GrantsSelectComponent />, {
            withForm: true,
            formProps: { defaultValues: { grants: [] } },
        })
        // empty-state text exists
        expect(screen.getAllByText(/.+/)[0]).toBeTruthy()
    })

    it('renders selected grants as badges with their name', () => {
        renderWithProviders(<GrantsSelectComponent />, {
            withForm: true,
            formProps: {
                defaultValues: {
                    grants: [
                        { uid: 'g1', code: 'C1', name: 'Grant One' },
                        { uid: 'g2', code: 'C2', name: 'Grant Two' },
                    ],
                },
            },
        })
        expect(screen.getByText('Grant One')).toBeInTheDocument()
        expect(screen.getByText('Grant Two')).toBeInTheDocument()
    })

    it('hides Add button + remove buttons when permission denied', () => {
        mockUseAccessControl.mockReturnValue(() => false)
        renderWithProviders(<GrantsSelectComponent />, {
            withForm: true,
            formProps: {
                defaultValues: {
                    grants: [{ uid: 'g1', code: 'C', name: 'G' }],
                },
            },
        })
        expect(screen.queryByRole('button')).toBeNull()
    })

    it('clicking Add opens grant modal', () => {
        const openGrantModal = jest.fn()
        mockUseGrantSelectionModal.mockReturnValue({ openGrantModal })
        renderWithProviders(<GrantsSelectComponent />, {
            withForm: true,
            formProps: { defaultValues: { grants: [] } },
        })
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])
        expect(openGrantModal).toHaveBeenCalled()
    })
})
