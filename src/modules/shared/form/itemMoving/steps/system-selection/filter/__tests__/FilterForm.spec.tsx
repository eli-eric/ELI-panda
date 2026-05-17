import { render, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { useSystemsFilterFields } from '@/modules/systems/components/filters/form/SystemsFilter.fields'

import { FilterForm } from '../FilterForm'

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilterState: jest.fn(),
}))

jest.mock('@/modules/systems/components/filters/form/SystemsFilter.fields', () => ({
    useSystemsFilterFields: jest.fn(),
}))

jest.mock('@/modules/shared/form/systemSelect/SelectSystem.combo', () => ({
    SelectSystemComboBox: () => <div data-testid="system-select-combo" />,
}))

jest.mock('@/modules/shared/form/systemType/SelectSystemType.combo', () => ({
    SystemTypeComboBox: () => <div data-testid="system-type-combo" />,
}))

jest.mock('@/modules/shared/form/location/SelectLocation.combo', () => ({
    SelectLocationCombo: () => <div data-testid="location-combo" />,
}))

jest.mock('@/components/form/Combobox', () => ({
    __esModule: true,
    default: ({ name }: { name: string }) => <div data-testid={`combobox-${name}`} />,
}))

jest.mock('@/components/form/inputs', () => ({
    Input: ({ name }: { name: string }) => <div data-testid={`input-${name}`} />,
}))

const mockUseFormFilterState = useFormFilterState as jest.Mock
const mockUseSystemsFilterFields = useSystemsFilterFields as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseFormFilterState.mockReturnValue({ setFilter: () => jest.fn() })
    mockUseSystemsFilterFields.mockReturnValue({
        parentSystem: { name: 'parentSystem' },
        name: { name: 'name' },
        systemType: { name: 'systemType' },
        systemCode: { name: 'systemCode' },
        zone: { name: 'zone' },
        location: { name: 'location' },
    } as any)
})

describe('itemMoving FilterForm', () => {
    it('renders all filter fields', () => {
        render(<FilterForm tableId="t1" enableQueryUrl />)
        expect(screen.getByTestId('system-select-combo')).toBeInTheDocument()
        expect(screen.getByTestId('input-name')).toBeInTheDocument()
        expect(screen.getByTestId('system-type-combo')).toBeInTheDocument()
        expect(screen.getByTestId('input-systemCode')).toBeInTheDocument()
        expect(screen.getByTestId('combobox-zone')).toBeInTheDocument()
        expect(screen.getByTestId('location-combo')).toBeInTheDocument()
    })

    it('passes tableId + enableQueryUrl to useFormFilterState', () => {
        render(<FilterForm tableId="my-table" enableQueryUrl={false} />)
        expect(mockUseFormFilterState).toHaveBeenCalledWith({
            tableId: 'my-table',
            enableQueryUrl: false,
        })
    })
})
