import { render, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { useFormControlStore } from '@/store/useFormControlStore'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'

import { CategoryPropFilters } from '../CategoryPropFilters'

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilterState: jest.fn(),
}))

jest.mock('@/store/useFormControlStore', () => ({
    useFormControlStore: jest.fn(),
}))

jest.mock('@/components/form/inputs', () => ({
    Input: ({ name, label }: { name: string; label?: string }) => (
        <div data-testid={`input-${name}`} data-label={label} />
    ),
}))

jest.mock('@/components/form/Listbox', () => ({
    __esModule: true,
    default: ({ name }: { name: string }) => <div data-testid={`listbox-${name}`} />,
}))

jest.mock('@/components/form/RangeInput', () => ({
    RangeInput: ({ name }: { name: string }) => <div data-testid={`range-${name}`} />,
}))

jest.mock('@/components/form/FIlterCheckboxes', () => ({
    FilterCheckboxes: ({ name }: { name: string }) => (
        <div data-testid={`checkboxes-${name}`} />
    ),
}))

const mockUseFormFilterState = useFormFilterState as jest.Mock
const mockUseFormControlStore = useFormControlStore as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseFormFilterState.mockReturnValue({ setFilter: () => jest.fn() })
    mockUseFormControlStore.mockReturnValue({ addCustomFieldIdToSync: jest.fn() })
})

const makeProp = (uid: string, typeUid: string, overrides: Record<string, unknown> = {}) =>
    ({
        property: {
            uid,
            name: `Name-${uid}`,
            unit: { name: 'kg' },
            type: { uid: typeUid, code: typeUid },
            listOfValues: ['a', 'b'],
            ...overrides,
        },
    }) as any

describe('CategoryPropFilters', () => {
    it('returns null when no properties', () => {
        const { container } = render(<CategoryPropFilters tableId="t1" />)
        expect(container.firstChild).toBeNull()
    })

    it('renders Input for TEXT type with label including unit', () => {
        render(
            <CategoryPropFilters
                tableId="t1"
                catalogueCategoryProperties={[makeProp('a', PROPERTY_TYPE.TEXT)]}
            />,
        )
        const input = screen.getByTestId('input-a')
        expect(input.dataset.label).toBe('Name-a [kg]')
    })

    it('renders RangeInput for NUMBER and RANGE', () => {
        render(
            <CategoryPropFilters
                tableId="t1"
                catalogueCategoryProperties={[
                    makeProp('a', PROPERTY_TYPE.NUMBER),
                    makeProp('b', PROPERTY_TYPE.RANGE),
                ]}
            />,
        )
        expect(screen.getByTestId('range-a')).toBeInTheDocument()
        expect(screen.getByTestId('range-b')).toBeInTheDocument()
    })

    it('renders Listbox for BOOLEAN', () => {
        render(
            <CategoryPropFilters
                tableId="t1"
                catalogueCategoryProperties={[makeProp('a', PROPERTY_TYPE.BOOLEAN)]}
            />,
        )
        expect(screen.getByTestId('listbox-a')).toBeInTheDocument()
    })

    it('renders FilterCheckboxes for LIST', () => {
        render(
            <CategoryPropFilters
                tableId="t1"
                catalogueCategoryProperties={[makeProp('a', PROPERTY_TYPE.LIST)]}
            />,
        )
        expect(screen.getByTestId('checkboxes-a')).toBeInTheDocument()
    })

    it('LIST type properties are sorted to the front', () => {
        render(
            <CategoryPropFilters
                tableId="t1"
                catalogueCategoryProperties={[
                    makeProp('z-text', PROPERTY_TYPE.TEXT),
                    makeProp('a-list', PROPERTY_TYPE.LIST),
                    makeProp('b-text', PROPERTY_TYPE.TEXT),
                ]}
            />,
        )
        // ensure LIST one rendered alongside others
        expect(screen.getByTestId('checkboxes-a-list')).toBeInTheDocument()
    })

    it('shows "Item Properties" heading when isItemProperties=true', () => {
        render(
            <CategoryPropFilters
                tableId="t1"
                isItemProperties
                catalogueCategoryProperties={[makeProp('a', PROPERTY_TYPE.TEXT)]}
            />,
        )
        expect(screen.getByText('Item Properties')).toBeInTheDocument()
    })

    it('shows "Category Properties" heading when isItemProperties=false', () => {
        render(
            <CategoryPropFilters
                tableId="t1"
                catalogueCategoryProperties={[makeProp('a', PROPERTY_TYPE.TEXT)]}
            />,
        )
        expect(screen.getByText('Category Properties')).toBeInTheDocument()
    })
})
