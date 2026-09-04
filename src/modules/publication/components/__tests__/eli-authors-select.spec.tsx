import { fireEvent, screen } from '@testing-library/react'

import { useAccessControl } from '@/hooks/useAccessControl'
import { useResearcherSelectionModal } from '@/modules/shared/form/researcherSelect'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { EliAuthorsSelectComponent } from '../eli-authors-select.comp'

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: jest.fn(),
}))

jest.mock('@/modules/shared/form/researcherSelect', () => ({
    useResearcherSelectionModal: jest.fn(),
}))

const mockUseAccessControl = useAccessControl as jest.Mock
const mockUseResearcherSelectionModal = useResearcherSelectionModal as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseAccessControl.mockReturnValue(() => true)
    mockUseResearcherSelectionModal.mockReturnValue({
        openResearcherModal: jest.fn(),
    })
})

describe('EliAuthorsSelectComponent', () => {
    it('renders label with selection count + empty-state placeholder when no researchers', () => {
        renderWithProviders(<EliAuthorsSelectComponent />, {
            withForm: true,
            formProps: { defaultValues: { eliResearchers: [] } },
        })
        // Count badge shows 0
        expect(screen.getByText('(0)')).toBeInTheDocument()
    })

    it('Add button hidden when permission denied', () => {
        mockUseAccessControl.mockReturnValue(() => false)
        renderWithProviders(<EliAuthorsSelectComponent />, {
            withForm: true,
            formProps: { defaultValues: { eliResearchers: [] } },
        })
        // No Add button visible (only the heading exists)
        expect(screen.queryByRole('button')).toBeNull()
    })

    it('clicking Add opens researcher modal', () => {
        const openResearcherModal = jest.fn()
        mockUseResearcherSelectionModal.mockReturnValue({ openResearcherModal })

        renderWithProviders(<EliAuthorsSelectComponent />, {
            withForm: true,
            formProps: { defaultValues: { eliResearchers: [] } },
        })
        const addBtn =
            screen.getAllByRole('button').find(b => /add/i.test(b.textContent ?? '')) ??
            screen.getByRole('button')
        fireEvent.click(addBtn)
        expect(openResearcherModal).toHaveBeenCalled()
    })

    it('renders selected researchers as removable badges', () => {
        renderWithProviders(<EliAuthorsSelectComponent />, {
            withForm: true,
            formProps: {
                defaultValues: {
                    eliResearchers: [
                        { uid: '1', firstName: 'Jan', lastName: 'Smith' },
                        { uid: '2', firstName: 'Anna', lastName: 'Karen' },
                    ],
                },
            },
        })
        expect(screen.getByText('Smith, Jan')).toBeInTheDocument()
        expect(screen.getByText('Karen, Anna')).toBeInTheDocument()
        // Count is 2
        expect(screen.getByText('(2)')).toBeInTheDocument()
    })

    it('badges have no remove buttons when permission denied', () => {
        mockUseAccessControl.mockReturnValue(() => false)
        renderWithProviders(<EliAuthorsSelectComponent />, {
            withForm: true,
            formProps: {
                defaultValues: {
                    eliResearchers: [{ uid: '1', firstName: 'Jan', lastName: 'Smith' }],
                },
            },
        })
        expect(screen.getByText('Smith, Jan')).toBeInTheDocument()
        // No interactive buttons (Add hidden + remove hidden)
        expect(screen.queryByRole('button')).toBeNull()
    })
})
