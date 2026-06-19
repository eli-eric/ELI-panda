import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { SystemLevel } from '@/types/gql/graphql'

import { useCreateSubsystem } from '../../../hooks/mutations/useCreateSubsystem'
import { useSystemDetail } from '../../../hooks/queries/useSystemDetail'
import { useHierarchyNavigation } from '../../../hooks/useHierarchyNavigation'
import { CreateSubsystemDialog } from '../CreateSubsystemDialog.comp'

jest.mock('../../../hooks/mutations/useCreateSubsystem')
jest.mock('../../../hooks/queries/useSystemDetail')
jest.mock('../../../hooks/useHierarchyNavigation')
jest.mock('sonner', () => ({
    toast: {
        promise: jest.fn((p, opts) =>
            p.then(
                (res: unknown) => {
                    if (typeof opts.success === 'function') opts.success(res)
                },
                () => {
                    if (typeof opts.error === 'function') opts.error()
                },
            ),
        ),
    },
}))

const mockUseCreateSubsystem = useCreateSubsystem as jest.MockedFunction<
    typeof useCreateSubsystem
>
const mockUseSystemDetail = useSystemDetail as jest.MockedFunction<typeof useSystemDetail>
const mockUseHierarchyNavigation = useHierarchyNavigation as jest.MockedFunction<
    typeof useHierarchyNavigation
>

const messages: Record<string, string> = {
    'systemHierarchy.fields.name': 'Name',
    'systemHierarchy.fields.systemLevel': 'System Level',
    'systemHierarchy.fields.responsible': 'Responsible',
    'systemHierarchy.fields.location': 'Location',
    'systemHierarchy.fields.zone': 'Zone',
    'systemHierarchy.create.submit': 'Create',
    'systemHierarchy.create.cancel': 'Cancel',
    'systemHierarchy.create.creating': 'Creating...',
    'systemHierarchy.create.created': 'Created',
    'systemHierarchy.create.saveFailed': 'Failed',
    'systemHierarchy.create.inheritedTitle': 'Inherited at creation',
    'systemHierarchy.create.inheritedHelp':
        'Copied from "{parentName}". You can change these later.',
    'systemHierarchy.create.inheritedNotSet': 'Not set on parent',
    'systemHierarchy.create.namePlaceholder': 'e.g. Cooling pump',
    'systemHierarchy.create.onlyOneLevelHint':
        'Only "{levelLabel}" can be created under {parentLevelLabel}.',
    'systemHierarchy.create.validation.nameRequired': 'Name is required',
    'systemHierarchy.create.noAllowedLevels': 'No system levels can be created under this parent.',
    'systemHierarchy.create.close': 'Close',
    'systemHierarchy.systemLevels.SYSTEM_DOMAIN': 'System domain',
    'systemHierarchy.systemLevels.TECHNOLOGY_UNIT': 'Technology unit',
    'systemHierarchy.systemLevels.KEY_SYSTEMS': 'Key systems',
    'systemHierarchy.systemLevels.SUBSYSTEMS_AND_PARTS': 'Subsystems and parts',
    'systemHierarchy.systemLevels.TRASH': 'Trash',
}

const parentSystem = {
    uid: 'parent-1',
    name: 'Parent',
    systemCode: null,
    systemLevel: SystemLevel.KeySystems,
    description: null,
    systemType: null,
    location: null,
    zone: null,
    responsible: null,
    responsibleTeam: null,
    owner: null,
    parentPath: [],
    physicalItem: null,
    operators: [],
    maintainedBy: [],
    attribute: null,
    sparesIn: 0,
    sparesOut: 0,
}

const renderDialog = (overrides: Partial<React.ComponentProps<typeof CreateSubsystemDialog>> = {}) =>
    render(
        <IntlProvider locale="en" messages={messages}>
            <CreateSubsystemDialog
                parentUid="parent-1"
                parentName="Parent"
                parentLevel={SystemLevel.KeySystems}
                onClose={jest.fn()}
                {...overrides}
            />
        </IntlProvider>,
    )

describe('CreateSubsystemDialog', () => {
    const createSubsystem = jest.fn()
    const selectLeaf = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
        mockUseCreateSubsystem.mockReturnValue({
            createSubsystem,
            isPending: false,
        })
        mockUseSystemDetail.mockReturnValue({
            system: parentSystem,
            isLoading: false,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)
        mockUseHierarchyNavigation.mockReturnValue({
            selectLeaf,
            selectedParentUid: null,
            selectedLeafUid: null,
            activeTab: 'detail',
            selectParent: jest.fn(),
            setActiveTab: jest.fn(),
            goBackToLeaves: jest.fn(),
        } as any)
    })

    it('shows validation error and does not call mutation when name is empty', async () => {
        renderDialog()

        fireEvent.click(screen.getByTestId('create-subsystem-submit'))

        await waitFor(() => {
            expect(screen.getByTestId('create-subsystem-name-error')).toBeInTheDocument()
        })
        expect(createSubsystem).not.toHaveBeenCalled()
    })

    it('preselects the first allowed level on the Select trigger', () => {
        // KeySystems allows: KeySystems, SubsystemsAndParts, Trash — first is KeySystems
        renderDialog()
        expect(screen.getByTestId('create-subsystem-level')).toHaveTextContent('Key systems')
    })

    it('renders a read-only level badge (no Select) when only one level is allowed', () => {
        renderDialog({ parentLevel: SystemLevel.SystemDomain })

        expect(screen.queryByTestId('create-subsystem-level')).not.toBeInTheDocument()
        expect(screen.getByTestId('create-subsystem-level-badge')).toHaveTextContent(
            'Technology unit',
        )
    })

    it('disables submit while parent detail is loading', () => {
        mockUseSystemDetail.mockReturnValue({
            system: null,
            isLoading: true,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)

        renderDialog()

        expect(screen.getByTestId('create-subsystem-submit')).toBeDisabled()
    })

    it('always renders all three inherited rows; shows values when set and "Not set on parent" when null', () => {
        // First render: parent with all inherited fields populated
        mockUseSystemDetail.mockReturnValue({
            system: {
                ...parentSystem,
                responsible: { uid: 'u-1', name: 'Alice' },
                location: { uid: 'l-1', name: 'Hall A', code: 'HA' },
                zone: { uid: 'z-1', name: 'Zone 1' },
            },
            isLoading: false,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)

        const { unmount } = renderDialog()
        expect(screen.getByTestId('create-subsystem-inherited-responsible')).toHaveTextContent(
            'Alice',
        )
        expect(screen.getByTestId('create-subsystem-inherited-location')).toHaveTextContent(
            'Hall A',
        )
        expect(screen.getByTestId('create-subsystem-inherited-zone')).toHaveTextContent('Zone 1')
        unmount()

        // Second render: parent with no inherited fields — rows still render with "Not set on parent"
        mockUseSystemDetail.mockReturnValue({
            system: parentSystem,
            isLoading: false,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)

        renderDialog()
        expect(screen.getByTestId('create-subsystem-inherited')).toBeInTheDocument()
        expect(screen.getByTestId('create-subsystem-inherited-responsible')).toHaveTextContent(
            'Not set on parent',
        )
        expect(screen.getByTestId('create-subsystem-inherited-location')).toHaveTextContent(
            'Not set on parent',
        )
        expect(screen.getByTestId('create-subsystem-inherited-zone')).toHaveTextContent(
            'Not set on parent',
        )
    })

    it('on successful submit calls createSubsystem with inherited uids and navigates via selectLeaf', async () => {
        mockUseSystemDetail.mockReturnValue({
            system: {
                ...parentSystem,
                responsible: { uid: 'u-1', name: 'Alice' },
                location: { uid: 'l-1', name: 'Hall A', code: 'HA' },
                zone: null,
            },
            isLoading: false,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)

        createSubsystem.mockResolvedValue({
            uid: 'new-uid',
            name: 'Child',
            systemLevel: SystemLevel.SubsystemsAndParts,
        })
        const onClose = jest.fn()

        renderDialog({ onClose })

        fireEvent.change(screen.getByTestId('create-subsystem-name'), {
            target: { value: 'Child' },
        })
        fireEvent.click(screen.getByTestId('create-subsystem-submit'))

        await waitFor(() => {
            expect(createSubsystem).toHaveBeenCalledWith({
                parentUid: 'parent-1',
                name: 'Child',
                systemLevel: SystemLevel.KeySystems,
                inherit: {
                    responsibleUid: 'u-1',
                    locationUid: 'l-1',
                    zoneUid: undefined,
                },
            })
        })
        await waitFor(() => {
            expect(selectLeaf).toHaveBeenCalledWith('new-uid')
        })
        await waitFor(() => {
            expect(onClose).toHaveBeenCalled()
        })
    })

    it('renders the empty state when parent has no allowed child levels (Trash)', () => {
        const onClose = jest.fn()
        renderDialog({ parentLevel: SystemLevel.Trash, onClose })

        expect(screen.getByTestId('create-subsystem-empty')).toHaveTextContent(
            'No system levels can be created under this parent.',
        )
        expect(screen.queryByTestId('create-subsystem-dialog')).not.toBeInTheDocument()
        expect(createSubsystem).not.toHaveBeenCalled()
    })

    it('on mutation rejection does not navigate and does not close the modal', async () => {
        createSubsystem.mockRejectedValue(new Error('boom'))
        const onClose = jest.fn()
        renderDialog({ onClose })

        fireEvent.change(screen.getByTestId('create-subsystem-name'), {
            target: { value: 'X' },
        })
        fireEvent.click(screen.getByTestId('create-subsystem-submit'))

        await waitFor(() => {
            expect(createSubsystem).toHaveBeenCalled()
        })
        expect(selectLeaf).not.toHaveBeenCalled()
        expect(onClose).not.toHaveBeenCalled()
    })
})
