import { render, screen } from '@testing-library/react'

import { usePandaTable } from '../../../table/pandaTable/hooks/usePandaTable'
import { CatalogueItemSelectTable } from '../CatalogueItemSelect.table'

jest.mock('../CatalogueItemSelect.columns', () => ({
    useCatalogueItemSelectColumns: () => [],
}))

jest.mock('../../../table/pandaTable/hooks/usePandaTable', () => ({
    usePandaTable: jest.fn(),
}))

let lastTableProps: any = null
jest.mock('../../../table/pandaTableV2/PandaTableV2', () => ({
    __esModule: true,
    PandaTableV2: (props: any) => {
        lastTableProps = props
        return <div data-testid="panda" data-loading={String(!!props.loading)} />
    },
}))

const mockUsePandaTable = usePandaTable as jest.Mock

let setColumnVisibility: jest.Mock
let setColumnOrder: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setColumnVisibility = jest.fn()
    setColumnOrder = jest.fn()
    mockUsePandaTable.mockReturnValue({
        setColumnVisibility,
        setColumnOrder,
        getAllLeafColumns: () => [{ id: 'selection' }, { id: 'name' }],
    })
    lastTableProps = null
})

describe('CatalogueItemSelectTable', () => {
    it('hides categoryName when categoryList is empty', () => {
        render(
            <CatalogueItemSelectTable
                tableId="t1"
                onItemToggle={jest.fn()}
                pinnedData={[]}
                categoryList={[]}
            />,
        )
        expect(setColumnVisibility).toHaveBeenCalledWith({ categoryName: false })
    })

    it('shows categoryName when categoryList has entries', () => {
        render(
            <CatalogueItemSelectTable
                tableId="t1"
                onItemToggle={jest.fn()}
                pinnedData={[]}
                categoryList={[{ uid: 'c1' }] as any}
            />,
        )
        expect(setColumnVisibility).toHaveBeenCalledWith({ categoryName: true })
    })

    it('always calls setColumnOrder with leaf columns', () => {
        render(
            <CatalogueItemSelectTable
                tableId="t1"
                onItemToggle={jest.fn()}
                pinnedData={[]}
            />,
        )
        expect(setColumnOrder).toHaveBeenCalledWith(['selection', 'name'])
    })

    it('forwards loading + data to PandaTableV2', () => {
        const pinned = [{ uid: 'a' }] as any
        render(
            <CatalogueItemSelectTable
                tableId="t1"
                onItemToggle={jest.fn()}
                pinnedData={pinned}
                loading
            />,
        )
        expect(lastTableProps.loading).toBe(true)
        expect(lastTableProps.data).toBe(pinned)
    })
})
