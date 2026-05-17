import { screen } from '@testing-library/react'

import { useServiceType } from '@/modules/services/hooks/useServiceType'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SelectableServiceLineDetails } from '../selectable-service-line.details'

jest.mock('@/modules/services/hooks/useServiceType', () => ({
    useServiceType: jest.fn(),
}))

let lastGroupsProps: any = null

jest.mock('../selectable-service-line.groups', () => ({
    SelectableServiceLineGroups: (props: any) => {
        lastGroupsProps = props
        return <div data-testid="groups" />
    },
}))

const mockUseServiceType = useServiceType as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    lastGroupsProps = null
})

describe('SelectableServiceLineDetails', () => {
    it('renders SelectableServiceLineGroups with category + allowedDetails from useServiceType', () => {
        mockUseServiceType.mockReturnValue({
            data: { category: { uid: 'c1' }, properties: ['p1', 'p2'] },
        })
        renderWithProviders(
            <SelectableServiceLineDetails serviceType={{ uid: 'st-1', name: 'S' } as any} />,
            { withForm: true },
        )
        expect(screen.getByTestId('groups')).toBeInTheDocument()
        expect(lastGroupsProps.category).toEqual({ uid: 'c1' })
        expect(lastGroupsProps.allowedDetails).toEqual(['p1', 'p2'])
    })

    it('falls back to form serviceType when prop missing', () => {
        mockUseServiceType.mockReturnValue({ data: { category: null, properties: [] } })
        renderWithProviders(<SelectableServiceLineDetails />, {
            withForm: true,
            formProps: { defaultValues: { serviceType: { uid: 'form-st' } } },
        })
        expect(mockUseServiceType).toHaveBeenCalledWith('form-st')
    })

    it('shows error fallback when useServiceType returns error', () => {
        mockUseServiceType.mockReturnValue({ data: null, error: new Error('boom') })
        renderWithProviders(<SelectableServiceLineDetails />, { withForm: true })
        expect(screen.queryByTestId('groups')).toBeNull()
    })

    it('passes empty array allowedDetails when properties missing', () => {
        mockUseServiceType.mockReturnValue({ data: { category: null, properties: undefined } })
        renderWithProviders(
            <SelectableServiceLineDetails serviceType={{ uid: 'st-x', name: 'X' } as any} />,
            { withForm: true },
        )
        expect(lastGroupsProps.allowedDetails).toEqual([])
    })
})
