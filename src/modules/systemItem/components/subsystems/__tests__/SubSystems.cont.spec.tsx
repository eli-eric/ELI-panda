import { render, screen } from '@testing-library/react'

import { useSystemSubsystems } from '../../../hooks/useSubsystems'
import { useSystemDetail } from '../../../hooks/useSystemDetail'
import { SubSystemsContainer } from '../SubSystems.cont'
import { useSubSystemsColumns } from '../SubSustems.columns'

jest.mock('../../../hooks/useSubsystems', () => ({
    useSystemSubsystems: jest.fn(),
}))

jest.mock('../../../hooks/useSystemDetail', () => ({
    useSystemDetail: jest.fn(),
}))

jest.mock('../SubSustems.columns', () => ({
    useSubSystemsColumns: jest.fn(),
}))

jest.mock('@/components/Buttons', () => ({
    PlusButton: () => <button data-testid="plus">+</button>,
}))

jest.mock('@/components/ui/table', () => ({
    Table: ({ data, loading }: { data: unknown[]; loading?: boolean }) => (
        <div data-testid="table" data-count={data?.length ?? 0} data-loading={String(loading)} />
    ),
}))

jest.mock('@/components/layout/Heading', () => ({
    Heading: ({ children, customText }: { children?: React.ReactNode; customText: string }) => (
        <div>
            <h2>{customText}</h2>
            {children}
        </div>
    ),
}))

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: any }) => (
        <a
            data-testid="link"
            data-href={typeof href === 'string' ? href : JSON.stringify(href)}
        >
            {children}
        </a>
    ),
}))

const mockUseSystemSubsystems = useSystemSubsystems as jest.Mock
const mockUseSystemDetail = useSystemDetail as jest.Mock
const mockUseColumns = useSubSystemsColumns as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseColumns.mockReturnValue([])
})

describe('SubSystemsContainer', () => {
    it('renders heading + plus link to /system?parentUid=...', () => {
        mockUseSystemSubsystems.mockReturnValue({ subsystems: [], loading: false })
        mockUseSystemDetail.mockReturnValue({ systemDetail: { uid: 'sys-1' } })
        render(<SubSystemsContainer />)
        expect(screen.getByText('Sub Systems')).toBeInTheDocument()
        const link = screen.getByTestId('link')
        expect(link.dataset.href).toContain('/system')
        expect(link.dataset.href).toContain('sys-1')
        expect(screen.getByTestId('plus')).toBeInTheDocument()
    })

    it('passes subsystems + loading state into Table', () => {
        const rows = [{ uid: 'a' }, { uid: 'b' }] as any
        mockUseSystemSubsystems.mockReturnValue({ subsystems: rows, loading: true })
        mockUseSystemDetail.mockReturnValue({ systemDetail: { uid: 'sys-1' } })
        render(<SubSystemsContainer />)
        const table = screen.getByTestId('table')
        expect(table.dataset.count).toBe('2')
        expect(table.dataset.loading).toBe('true')
    })
})
