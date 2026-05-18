import { fireEvent, render, screen } from '@testing-library/react'

import { useAssignSparesNavigation } from '@/modules/shared/hooks/useAssignSparesNavigation'

import { useSystemDetail } from '../../../hooks/useSystemDetail'
import { SparePartsFor } from '../SpareFor.cont'
import { useSpareForColumns } from '../SpareFor.columns'

jest.mock('../../../hooks/useSystemDetail', () => ({
    useSystemDetail: jest.fn(),
}))

jest.mock('@/modules/shared/hooks/useAssignSparesNavigation', () => ({
    useAssignSparesNavigation: jest.fn(),
}))

jest.mock('../SpareFor.columns', () => ({
    useSpareForColumns: jest.fn(() => []),
}))

jest.mock('@/components/Buttons', () => ({
    PlusButton: ({ onClick }: { onClick?: () => void }) => (
        <button data-testid="plus" onClick={onClick}>
            +
        </button>
    ),
}))

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/components/layout/Heading', () => ({
    Heading: ({ children, customText }: { children?: React.ReactNode; customText: string }) => (
        <div>
            <h2>{customText}</h2>
            {children}
        </div>
    ),
}))

jest.mock('@/modules/shared/table/pandaTable/PandaTable', () => ({
    PandaTable: ({ data, tableId }: { data: unknown[]; tableId: string }) => (
        <div data-testid="panda-table" data-id={tableId} data-count={data?.length ?? 0} />
    ),
}))

const mockUseSystemDetail = useSystemDetail as jest.Mock
const mockUseAssignSparesNavigation = useAssignSparesNavigation as jest.Mock
const mockUseColumns = useSpareForColumns as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseColumns.mockReturnValue([])
})

describe('SparePartsFor', () => {
    it('renders heading + Plus that triggers assign-spares navigation', () => {
        const navigate = jest.fn()
        mockUseAssignSparesNavigation.mockReturnValue(navigate)
        mockUseSystemDetail.mockReturnValue({
            systemDetail: { uid: 'sys-1', sparePartsFor: [] },
            catalogueItem: null,
        })
        render(<SparePartsFor />)
        expect(screen.getByText('Designated spare part for')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('plus'))
        expect(navigate).toHaveBeenCalledTimes(1)
    })

    it('hides table when sparePartsFor empty', () => {
        mockUseAssignSparesNavigation.mockReturnValue(jest.fn())
        mockUseSystemDetail.mockReturnValue({
            systemDetail: { uid: 'sys-1', sparePartsFor: [] },
            catalogueItem: null,
        })
        render(<SparePartsFor />)
        expect(screen.queryByTestId('panda-table')).toBeNull()
    })

    it('shows table when sparePartsFor has rows', () => {
        mockUseAssignSparesNavigation.mockReturnValue(jest.fn())
        mockUseSystemDetail.mockReturnValue({
            systemDetail: {
                uid: 'sys-1',
                sparePartsFor: [{ uid: 'a' }, { uid: 'b' }],
            },
            catalogueItem: null,
        })
        render(<SparePartsFor />)
        const table = screen.getByTestId('panda-table')
        expect(table.dataset.count).toBe('2')
        expect(table.dataset.id).toBe('sparePartFor')
    })

    it('builds parentPath + catalogueNumber payload for navigation hook', () => {
        mockUseAssignSparesNavigation.mockReturnValue(jest.fn())
        mockUseSystemDetail.mockReturnValue({
            systemDetail: {
                uid: 'sys-1',
                parentPath: [{ uid: 'p-1', name: 'P1', systemLevel: 'KeySystems' }],
                sparePartsFor: [],
            },
            catalogueItem: { catalogueNumber: 'CN-1' },
        })
        render(<SparePartsFor />)
        expect(mockUseAssignSparesNavigation).toHaveBeenCalledWith({
            uid: 'sys-1',
            parentPath: [{ uid: 'p-1', name: 'P1', systemLevel: 'KeySystems' }],
            catalogueNumber: 'CN-1',
        })
    })
})
