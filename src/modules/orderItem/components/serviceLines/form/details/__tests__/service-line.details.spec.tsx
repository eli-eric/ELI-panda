import { screen } from '@testing-library/react'

import { useServiceType } from '@/modules/services/hooks/useServiceType'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ServiceLineDetails } from '../service-line.details'

jest.mock('@/modules/services/hooks/useServiceType', () => ({
    useServiceType: jest.fn(),
}))

let lastGroupsProps: any = null
jest.mock('../service-line.groups', () => ({
    ServiceLineGroups: (p: any) => {
        lastGroupsProps = p
        return <div data-testid="groups" />
    },
}))

const mockUseServiceType = useServiceType as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    lastGroupsProps = null
})

describe('ServiceLineDetails', () => {
    it('uses serviceType prop uid when given', () => {
        mockUseServiceType.mockReturnValue({ data: undefined, error: undefined })
        renderWithProviders(
            <ServiceLineDetails serviceType={{ uid: 'st-1', name: 'X' } as any} />,
            { withForm: true, formProps: { defaultValues: { serviceType: null } } },
        )
        expect(mockUseServiceType).toHaveBeenCalledWith('st-1')
    })

    it('falls back to form value uid when no prop', () => {
        mockUseServiceType.mockReturnValue({ data: undefined, error: undefined })
        renderWithProviders(<ServiceLineDetails />, {
            withForm: true,
            formProps: { defaultValues: { serviceType: { uid: 'form-st' } } },
        })
        expect(mockUseServiceType).toHaveBeenCalledWith('form-st')
    })

    it('renders error message when useServiceType errors', () => {
        mockUseServiceType.mockReturnValue({ data: undefined, error: new Error('boom') })
        renderWithProviders(<ServiceLineDetails />, {
            withForm: true,
            formProps: { defaultValues: { serviceType: null } },
        })
        expect(screen.queryByTestId('groups')).toBeNull()
    })

    it('renders ServiceLineGroups with category + allowedDetails from data', () => {
        mockUseServiceType.mockReturnValue({
            data: { category: { uid: 'c' }, properties: [{ uid: 'p1' }] },
            error: undefined,
        })
        renderWithProviders(<ServiceLineDetails />, {
            withForm: true,
            formProps: { defaultValues: { serviceType: { uid: 'st' } } },
        })
        expect(lastGroupsProps.category).toEqual({ uid: 'c' })
        expect(lastGroupsProps.allowedDetails).toEqual([{ uid: 'p1' }])
    })
})
