import { fireEvent, render, screen } from '@testing-library/react'

import { useCatalogueItems } from '@/modules/catalogue/hooks/useCatalogueItems'
import { useCategoryList } from '@/modules/catalogue/hooks/useCategoryList'

import { CatalogueItemSelect } from '../CatalogueItemSelect'
import { usePinnedCatalogueData } from '../hooks/usePinnedCatalogueData'

jest.mock('@/modules/catalogue/hooks/useCatalogueItems', () => ({
    useCatalogueItems: jest.fn(),
}))

jest.mock('@/modules/catalogue/hooks/useCategoryList', () => ({
    useCategoryList: jest.fn(),
}))

jest.mock('../hooks/usePinnedCatalogueData', () => ({
    usePinnedCatalogueData: jest.fn(),
}))

let lastTableProps: any = null
jest.mock('../CatalogueItemSelect.table', () => ({
    CatalogueItemSelectTable: (props: any) => {
        lastTableProps = props
        return <div data-testid="select-table" />
    },
}))

jest.mock('../filter/CatalogueSelectFilterButton', () => ({
    CatalogueSelectFilterButton: () => <div data-testid="filter-btn" />,
}))

jest.mock('../../../form/FilterBadges', () => ({
    FilterBadges: () => <div data-testid="filter-badges" />,
}))

jest.mock('../../../table/PaginationV2', () => ({
    PaginationV2: ({ settings }: { settings: any }) => (
        <div data-testid="pagination" data-total={settings.total ?? 0} />
    ),
}))

jest.mock('../../../table/SearchBar', () => ({
    SearchBar: ({ left }: { left: React.ReactNode }) => (
        <div data-testid="search-bar">{left}</div>
    ),
}))

const mockUseCatalogueItems = useCatalogueItems as jest.Mock
const mockUseCategoryList = useCategoryList as jest.Mock
const mockUsePinnedCatalogueData = usePinnedCatalogueData as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseCategoryList.mockReturnValue({ catalogueCategories: [] })
    mockUsePinnedCatalogueData.mockReturnValue([])
    lastTableProps = null
})

describe('CatalogueItemSelect', () => {
    it('renders SearchBar with filter button, badges, table, pagination', () => {
        mockUseCatalogueItems.mockReturnValue({
            catalogueItems: { data: [], totalCount: 0 },
            loading: false,
        })
        render(<CatalogueItemSelect tableId="t1" onSelect={jest.fn()} />)
        expect(screen.getByTestId('search-bar')).toBeInTheDocument()
        expect(screen.getByTestId('filter-btn')).toBeInTheDocument()
        expect(screen.getByTestId('filter-badges')).toBeInTheDocument()
        expect(screen.getByTestId('select-table')).toBeInTheDocument()
        expect(screen.getByTestId('pagination')).toBeInTheDocument()
    })

    it('passes totalCount to pagination', () => {
        mockUseCatalogueItems.mockReturnValue({
            catalogueItems: { data: [], totalCount: 42 },
            loading: false,
        })
        render(<CatalogueItemSelect tableId="t1" onSelect={jest.fn()} />)
        expect(screen.getByTestId('pagination').dataset.total).toBe('42')
    })

    it('selects new item when none selected', () => {
        mockUseCatalogueItems.mockReturnValue({
            catalogueItems: { data: [], totalCount: 0 },
            loading: false,
        })
        const onSelect = jest.fn()
        render(<CatalogueItemSelect tableId="t1" onSelect={onSelect} />)
        const item = { uid: 'i-1', name: 'X' } as any
        lastTableProps.onItemToggle(item)
        expect(onSelect).toHaveBeenCalledWith(item)
    })

    it('deselects when toggling same uid', () => {
        mockUseCatalogueItems.mockReturnValue({
            catalogueItems: { data: [], totalCount: 0 },
            loading: false,
        })
        const onSelect = jest.fn()
        const selectedItem = { uid: 'i-1' } as any
        render(
            <CatalogueItemSelect
                tableId="t1"
                onSelect={onSelect}
                selectedItem={selectedItem}
            />,
        )
        lastTableProps.onItemToggle({ uid: 'i-1' })
        expect(onSelect).toHaveBeenCalledWith(undefined)
    })

    it('row click invokes handleItemToggle via getRowProps', () => {
        mockUseCatalogueItems.mockReturnValue({
            catalogueItems: { data: [], totalCount: 0 },
            loading: false,
        })
        const onSelect = jest.fn()
        render(<CatalogueItemSelect tableId="t1" onSelect={onSelect} />)
        const rowProps = lastTableProps.getRowProps({
            original: { uid: 'i-9' },
        })
        rowProps.onClick()
        expect(onSelect).toHaveBeenCalledWith({ uid: 'i-9' })
    })

    it('selected row gets highlight className', () => {
        mockUseCatalogueItems.mockReturnValue({
            catalogueItems: { data: [], totalCount: 0 },
            loading: false,
        })
        render(
            <CatalogueItemSelect
                tableId="t1"
                onSelect={jest.fn()}
                selectedItem={{ uid: 'sel' } as any}
            />,
        )
        const props = lastTableProps.getRowProps({ original: { uid: 'sel' } })
        expect(props.className).toContain('bg-orange-50')
    })
})
