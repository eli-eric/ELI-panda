import { fireEvent, screen } from '@testing-library/react'

import { useSystemDetail } from '@/modules/shared/system/system-detail'
import { makeSystemDetail } from '@/testutils/factories/systemDetail'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemEditContainer } from '../system-edit.cont'

jest.mock('@/modules/shared/system/system-detail', () => {
    const actual = jest.requireActual('@/modules/shared/system/system-detail')
    const stub = (testId: string) => {
        const Stub = () => <div data-testid={testId} />
        Stub.displayName = testId
        return Stub
    }
    return {
        ...actual,
        useSystemDetail: jest.fn(),
        useSystemHistory: () => ({ data: [] }),
        SystemHistoryFeed: stub('history-stub'),
        SystemImagePanel: stub('images-stub'),
        SystemTitleField: ({ system }: { system: { name: string } }) => (
            <div data-testid="title-stub">{system.name}</div>
        ),
        SystemDescriptionField: stub('description-stub'),
        SystemClassificationFields: stub('classification-stub'),
        SystemPeopleFields: stub('people-stub'),
        PhysicalItemFields: stub('item-fields-stub'),
        CataloguePropertiesSection: stub('properties-stub'),
        PhysicalItemOrdersSection: stub('orders-stub'),
        SpareRelationsSection: ({ mode }: { mode: string }) => (
            <div data-testid={`spares-${mode}-stub`} />
        ),
        SubsystemsSection: ({ onSelectSystem }: { onSelectSystem: (uid: string) => void }) => (
            <button data-testid="subsystem-stub" onClick={() => onSelectSystem('child-1')} />
        ),
    }
})

jest.mock('@/modules/shared/system/edit-permission', () => ({
    SystemEditRestrictionBanner: () => <div data-testid="banner-stub" />,
    useSystemEditPermission: () => ({
        canEdit: true,
        isOutsideResponsibility: false,
        responsibles: [],
        status: 'allowed',
        refetch: jest.fn(),
    }),
}))

const mockUseSystemDetail = useSystemDetail as jest.Mock

const detailState = (overrides: Record<string, unknown>) => ({
    system: null,
    isLoading: false,
    isFetching: false,
    isSeeded: false,
    isNotFound: false,
    error: null,
    refetch: jest.fn(),
    ...overrides,
})

describe('SystemEditContainer (Edit System sheet)', () => {
    beforeEach(() => {
        mockUseSystemDetail.mockReset()
    })

    it('renders the two-column layout without a Save button', () => {
        mockUseSystemDetail.mockReturnValue(
            detailState({ system: makeSystemDetail({ uid: 'sys-1', name: 'Pump' }) }),
        )
        renderWithProviders(<SystemEditContainer uid="sys-1" />)

        expect(screen.getByTestId('system-edit-sheet')).toBeInTheDocument()
        expect(screen.getByTestId('title-stub')).toHaveTextContent('Pump')
        expect(screen.getByTestId('system-edit-details-panel')).toBeInTheDocument()
        expect(screen.getByTestId('classification-stub')).toBeInTheDocument()
        expect(screen.getByTestId('people-stub')).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: /save/i })).not.toBeInTheDocument()
    })

    it('shows item, spare and subsystem sections only when the system has them', () => {
        const bare = makeSystemDetail({ uid: 'sys-1' })
        mockUseSystemDetail.mockReturnValue(detailState({ system: bare }))
        const { unmount } = renderWithProviders(<SystemEditContainer uid="sys-1" />)
        expect(screen.queryByTestId('system-edit-physical-item')).not.toBeInTheDocument()
        expect(screen.queryByTestId('spares-spareParts-stub')).not.toBeInTheDocument()
        expect(screen.queryByTestId('subsystem-stub')).not.toBeInTheDocument()
        unmount()

        mockUseSystemDetail.mockReturnValue(
            detailState({
                system: makeSystemDetail({
                    uid: 'sys-1',
                    physicalItem: { uid: 'pi-1' } as never,
                    statistics: {
                        ...bare.statistics,
                        sparePartsCount: 1,
                        sparesForCount: 1,
                        directSubsystemsCount: 2,
                    },
                }),
            }),
        )
        renderWithProviders(<SystemEditContainer uid="sys-1" />)
        expect(screen.getByTestId('system-edit-physical-item')).toBeInTheDocument()
        expect(screen.getByTestId('spares-spareParts-stub')).toBeInTheDocument()
        expect(screen.getByTestId('spares-spareFor-stub')).toBeInTheDocument()
        expect(screen.getByTestId('subsystem-stub')).toBeInTheDocument()
    })

    it('re-targets the sheet when navigating to another system inside it', () => {
        const parent = makeSystemDetail({
            uid: 'sys-1',
            statistics: { ...makeSystemDetail().statistics, directSubsystemsCount: 1 },
        })
        mockUseSystemDetail.mockImplementation((uid: string) =>
            detailState({
                system: uid === 'sys-1' ? parent : makeSystemDetail({ uid, name: 'Child' }),
            }),
        )
        renderWithProviders(<SystemEditContainer uid="sys-1" />)

        fireEvent.click(screen.getByTestId('subsystem-stub'))

        expect(mockUseSystemDetail).toHaveBeenLastCalledWith('child-1')
        expect(screen.getByTestId('title-stub')).toHaveTextContent('Child')
    })

    it('renders the not-found state for a deleted system', () => {
        mockUseSystemDetail.mockReturnValue(
            detailState({ isNotFound: true, error: new Error('404') }),
        )
        renderWithProviders(<SystemEditContainer uid="gone" />)
        expect(screen.getByTestId('system-edit-not-found')).toBeInTheDocument()
    })

    it('renders a retry on a transient load failure', () => {
        const refetch = jest.fn()
        mockUseSystemDetail.mockReturnValue(detailState({ error: new Error('500'), refetch }))
        renderWithProviders(<SystemEditContainer uid="sys-1" />)
        fireEvent.click(screen.getByRole('button'))
        expect(refetch).toHaveBeenCalled()
    })
})
