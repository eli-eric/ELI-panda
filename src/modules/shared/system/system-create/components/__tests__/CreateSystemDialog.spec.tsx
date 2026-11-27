import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { useCreateSystem } from '@/modules/shared/system/system-detail/hooks/mutations/useCreateSystem'
import { useSystemDetail } from '@/modules/shared/system/system-detail/hooks/queries/useSystemDetail'
import { SystemLevel } from '@/types/constants/systemLevel'

import { CreateSystemDialog } from '../CreateSystemDialog.comp'

jest.mock('@/modules/shared/system/system-detail/hooks/mutations/useCreateSystem', () => ({
    useCreateSystem: jest.fn(),
}))
jest.mock('@/modules/shared/system/system-detail/hooks/queries/useSystemDetail', () => ({
    useSystemDetail: jest.fn(),
}))
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

const mockUseCreateSystem = useCreateSystem as jest.MockedFunction<typeof useCreateSystem>
const mockUseSystemDetail = useSystemDetail as jest.MockedFunction<typeof useSystemDetail>

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

const PARENT = { uid: 'parent-1', name: 'Parent', level: SystemLevel.KeySystems }

const renderDialog = (overrides: Partial<React.ComponentProps<typeof CreateSystemDialog>> = {}) =>
    render(
        <IntlProvider locale="en" messages={messages}>
            <CreateSystemDialog parent={PARENT} onClose={jest.fn()} {...overrides} />
        </IntlProvider>,
    )

describe('CreateSystemDialog', () => {
    const createSystem = jest.fn()
    const onCreated = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
        mockUseCreateSystem.mockReturnValue({
            createSystem,
            confirmCreate: jest.fn(),
            isPending: false,
        } as any)
        mockUseSystemDetail.mockReturnValue({
            system: parentSystem,
            isLoading: false,
            error: null,
            physicalItem: null,
            catalogueItem: null,
        } as any)
    })

    it('shows validation error and does not call mutation when name is empty', async () => {
        renderDialog()

        fireEvent.click(screen.getByTestId('create-system-submit'))

        await waitFor(() => {
            expect(screen.getByTestId('create-system-name-error')).toBeInTheDocument()
        })
        expect(createSystem).not.toHaveBeenCalled()
    })

    it('preselects the first allowed level on the Select trigger', () => {
        // KeySystems allows: KeySystems, SubsystemsAndParts, Trash — first is KeySystems
        renderDialog()
        expect(screen.getByTestId('create-system-level')).toHaveTextContent('Key systems')
    })

    it('renders a read-only level badge (no Select) when only one level is allowed', () => {
        renderDialog({ parent: { ...PARENT, level: SystemLevel.SystemDomain } })

        expect(screen.queryByTestId('create-system-level')).not.toBeInTheDocument()
        expect(screen.getByTestId('create-system-level-badge')).toHaveTextContent('Technology unit')
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

        expect(screen.getByTestId('create-system-submit')).toBeDisabled()
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
        expect(screen.getByTestId('create-system-inherited-responsible')).toHaveTextContent('Alice')
        expect(screen.getByTestId('create-system-inherited-location')).toHaveTextContent('Hall A')
        expect(screen.getByTestId('create-system-inherited-zone')).toHaveTextContent('Zone 1')
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
        expect(screen.getByTestId('create-system-inherited')).toBeInTheDocument()
        expect(screen.getByTestId('create-system-inherited-responsible')).toHaveTextContent(
            'Not set on parent',
        )
        expect(screen.getByTestId('create-system-inherited-location')).toHaveTextContent(
            'Not set on parent',
        )
        expect(screen.getByTestId('create-system-inherited-zone')).toHaveTextContent(
            'Not set on parent',
        )
    })

    // inheritance happens server-side — the body only carries name + level
    it('on successful submit posts parent + name + level and hands the result to onCreated', async () => {
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

        createSystem.mockResolvedValue({
            uid: 'new-uid',
            name: 'Child',
            systemLevel: SystemLevel.SubsystemsAndParts,
        })
        const onClose = jest.fn()

        renderDialog({ onClose, onCreated })

        fireEvent.change(screen.getByTestId('create-system-name'), {
            target: { value: 'Child' },
        })
        fireEvent.click(screen.getByTestId('create-system-submit'))

        await waitFor(() => {
            expect(createSystem).toHaveBeenCalledWith({
                parentUid: 'parent-1',
                name: 'Child',
                systemLevel: SystemLevel.KeySystems,
            })
        })
        await waitFor(() => {
            expect(onCreated).toHaveBeenCalledWith(expect.objectContaining({ uid: 'new-uid' }))
        })
        await waitFor(() => {
            expect(onClose).toHaveBeenCalled()
        })
    })

    it('renders the empty state when parent has no allowed child levels (Trash)', () => {
        const onClose = jest.fn()
        renderDialog({ parent: { ...PARENT, level: SystemLevel.Trash }, onClose })

        expect(screen.getByTestId('create-system-empty')).toHaveTextContent(
            'No system levels can be created under this parent.',
        )
        expect(screen.queryByTestId('create-system-dialog')).not.toBeInTheDocument()
        expect(createSystem).not.toHaveBeenCalled()
    })

    it('on mutation rejection does not call onCreated and does not close the modal', async () => {
        createSystem.mockRejectedValue(new Error('boom'))
        const onClose = jest.fn()
        renderDialog({ onClose, onCreated })

        fireEvent.change(screen.getByTestId('create-system-name'), {
            target: { value: 'X' },
        })
        fireEvent.click(screen.getByTestId('create-system-submit'))

        await waitFor(() => {
            expect(createSystem).toHaveBeenCalled()
        })
        expect(onCreated).not.toHaveBeenCalled()
        expect(onClose).not.toHaveBeenCalled()
    })

    it('creates a root system: no parent, root levels, no inherited block', async () => {
        createSystem.mockResolvedValue({ uid: 'root-uid', name: 'Root' })
        renderDialog({ parent: null, onCreated })

        expect(screen.queryByTestId('create-system-inherited')).not.toBeInTheDocument()
        expect(screen.getByTestId('create-system-level')).toHaveTextContent('System domain')

        fireEvent.change(screen.getByTestId('create-system-name'), {
            target: { value: 'Root' },
        })
        fireEvent.click(screen.getByTestId('create-system-submit'))

        await waitFor(() => {
            expect(createSystem).toHaveBeenCalledWith({
                name: 'Root',
                systemLevel: SystemLevel.SystemDomain,
            })
        })
        await waitFor(() => {
            expect(onCreated).toHaveBeenCalledWith(expect.objectContaining({ uid: 'root-uid' }))
        })
    })
})
