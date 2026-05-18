import { screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ServiceItem } from '../ServiceItem'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('../DeleteService.btn', () => ({
    DeleteServiceButton: ({ uid, name }: { uid: string; name: string }) => (
        <button data-testid="del-btn" data-uid={uid} data-name={name}>
            del
        </button>
    ),
}))

const service = {
    uid: 'sv-1',
    name: 'Vacuum',
    description: 'A service description',
    category: { uid: 'cat-1', name: 'Vacuum Cat' },
} as any

beforeEach(() => {
    jest.clearAllMocks()
})

describe('ServiceItem', () => {
    it('renders link to /service/{uid}', () => {
        ;(usePermission as jest.Mock).mockReturnValue(false)
        renderWithProviders(<ServiceItem service={service} />)
        expect(screen.getByRole('link')).toHaveAttribute('href', '/service/sv-1')
    })

    it('renders service name, category and description', () => {
        ;(usePermission as jest.Mock).mockReturnValue(false)
        renderWithProviders(<ServiceItem service={service} />)
        expect(screen.getByText('Vacuum')).toBeInTheDocument()
        expect(screen.getByText('Vacuum Cat', { exact: false })).toBeInTheDocument()
        expect(screen.getByText('A service description')).toBeInTheDocument()
    })

    it('hides Delete button without SERVICE_EDIT permission', () => {
        ;(usePermission as jest.Mock).mockReturnValue(false)
        renderWithProviders(<ServiceItem service={service} />)
        expect(screen.queryByTestId('del-btn')).toBeNull()
    })

    it('shows Delete button with SERVICE_EDIT permission and forwards uid+name', () => {
        ;(usePermission as jest.Mock).mockReturnValue(true)
        renderWithProviders(<ServiceItem service={service} />)
        const btn = screen.getByTestId('del-btn')
        expect(btn.dataset.uid).toBe('sv-1')
        expect(btn.dataset.name).toBe('Vacuum')
    })
})
