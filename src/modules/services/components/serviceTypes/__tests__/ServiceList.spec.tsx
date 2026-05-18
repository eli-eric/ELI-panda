import { render, screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'

import { ServiceList } from '../ServiceList'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

let capturedColumns: any[] = []

jest.mock('@/components/ui/table', () => ({
    Table: ({ columns, data }: { columns: any[]; data: any[] }) => {
        capturedColumns = columns
        return <div data-testid="table" data-count={data.length} />
    },
}))

jest.mock('../DeleteService.btn', () => ({
    DeleteServiceButton: ({ uid }: { uid: string }) => (
        <button data-testid={`del-${uid}`}>del</button>
    ),
}))

const services = [
    { uid: 's-1', name: 'A', description: 'da', category: { uid: 'c-1', name: 'CatA' } },
    { uid: 's-2', name: 'B', description: 'db', category: { uid: 'c-2', name: 'CatB' } },
] as any

beforeEach(() => {
    jest.clearAllMocks()
    capturedColumns = []
})

describe('ServiceList', () => {
    it('builds 3 base columns when no edit permission', () => {
        ;(usePermission as jest.Mock).mockReturnValue(false)
        render(<ServiceList services={services} />)
        expect(capturedColumns.length).toBe(3)
        expect(capturedColumns.map(c => c.header)).toEqual(['Name', 'Category', 'Description'])
    })

    it('adds actions column when has SERVICE_EDIT', () => {
        ;(usePermission as jest.Mock).mockReturnValue(true)
        render(<ServiceList services={services} />)
        expect(capturedColumns.length).toBe(4)
        expect(capturedColumns[3].id).toBe('actions')
    })

    it('passes data array to Table', () => {
        ;(usePermission as jest.Mock).mockReturnValue(false)
        render(<ServiceList services={services} />)
        expect(screen.getByTestId('table').dataset.count).toBe('2')
    })
})
