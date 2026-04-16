import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { useSystemCopy } from '../../../hooks/mutations/useSystemCopy'
import { useSystemDetail } from '../../../hooks/queries/useSystemDetail'
import { CopySystemDialog } from '../CopySystemDialog.comp'

jest.mock('../../../hooks/mutations/useSystemCopy')
jest.mock('../../../hooks/queries/useSystemDetail')
jest.mock('sonner', () => ({ toast: { promise: jest.fn() } }))

const mockUseSystemCopy = useSystemCopy as jest.MockedFunction<typeof useSystemCopy>
const mockUseSystemDetail = useSystemDetail as jest.MockedFunction<typeof useSystemDetail>

const messages: Record<string, string> = {
    'systemHierarchy.copy.source': 'Source',
    'systemHierarchy.copy.destination': 'Destination',
    'systemHierarchy.copy.copyOnlyChildren': 'Copy only children',
    'systemHierarchy.copy.copyRecursive': 'Copy recursive',
    'systemHierarchy.copy.submit': 'Copy',
    'systemHierarchy.copy.cancel': 'Cancel',
    'systemHierarchy.copy.loading': 'Loading...',
    'systemHierarchy.copy.notFound': 'System not found',
    'systemHierarchy.copy.copying': 'Copying...',
    'systemHierarchy.copy.copied': 'Copied',
    'systemHierarchy.copy.failedToCopy': 'Failed',
}

const mockSystem = {
    uid: 'src-1',
    name: 'Source System',
    systemCode: 'SYS-001',
    systemLevel: 'KEY_SYSTEMS',
    description: null,
    systemType: null,
    location: null,
    zone: null,
    responsible: null,
    responsibleTeam: null,
    owner: null,
    parentPath: [{ uid: 'root', name: 'Root', systemLevel: 'KEY_SYSTEMS' }],
    physicalItem: null,
    operators: [],
    maintainedBy: [],
    attribute: null,
    sparesIn: 0,
    sparesOut: 0,
}

const renderDialog = (props: Partial<React.ComponentProps<typeof CopySystemDialog>> = {}) =>
    render(
        <IntlProvider locale="en" messages={messages}>
            <CopySystemDialog sourceSystemUid="src-1" destinationSystemUid="dest-1" {...props} />
        </IntlProvider>,
    )

describe('CopySystemDialog', () => {
    const mutateAsync = jest.fn().mockResolvedValue(['new-uid'])

    beforeEach(() => {
        jest.clearAllMocks()
        mockUseSystemCopy.mockReturnValue({
            mutateAsync,
            isPending: false,
        } as any)
    })

    it('renders source and destination labels', () => {
        mockUseSystemDetail.mockReturnValue({
            system: mockSystem,
            isLoading: false,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)

        renderDialog()

        expect(screen.getByText('Source')).toBeInTheDocument()
        expect(screen.getByText('Destination')).toBeInTheDocument()
    })

    it('shows loading state when systems are loading', () => {
        mockUseSystemDetail.mockReturnValue({
            system: null,
            isLoading: true,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)

        renderDialog()

        expect(screen.getAllByText('Loading...')).toHaveLength(2)
    })

    it('shows not found when system is null and not loading', () => {
        mockUseSystemDetail.mockReturnValue({
            system: null,
            isLoading: false,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)

        renderDialog()

        expect(screen.getAllByText('System not found')).toHaveLength(2)
    })

    it('has both checkboxes checked by default', () => {
        mockUseSystemDetail.mockReturnValue({
            system: mockSystem,
            isLoading: false,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)

        renderDialog()

        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes).toHaveLength(2)
        expect(checkboxes[0]).toHaveAttribute('data-state', 'checked')
        expect(checkboxes[1]).toHaveAttribute('data-state', 'checked')
    })

    it('disables submit button while systems are loading', () => {
        mockUseSystemDetail.mockReturnValue({
            system: null,
            isLoading: true,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)

        renderDialog()

        const submitButton = screen.getByText('Copy').closest('button')
        expect(submitButton).toBeDisabled()
    })

    it('calls mutateAsync with correct body on submit', async () => {
        mockUseSystemDetail.mockReturnValue({
            system: mockSystem,
            isLoading: false,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)

        renderDialog()

        fireEvent.click(screen.getByText('Copy'))

        expect(mutateAsync).toHaveBeenCalledWith({
            sourceSystemUid: 'src-1',
            destinationSystemUid: 'dest-1',
            copyOnlySourceSystemChildren: true,
            copyRecursive: true,
        })
    })

    it('renders system name and parent path breadcrumb', () => {
        mockUseSystemDetail.mockReturnValue({
            system: mockSystem,
            isLoading: false,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)

        renderDialog()

        expect(screen.getAllByText('Source System')).toHaveLength(4) // name + breadcrumb x2 (source + dest)
        expect(screen.getAllByText('Root')).toHaveLength(2)
    })
})
