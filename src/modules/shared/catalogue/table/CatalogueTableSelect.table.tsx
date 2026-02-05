import type { Row } from '@tanstack/react-table'
import { createContext, useEffect } from 'react'

import { RadioGroup } from '@/components/ui/radio-group'
import type { GetCategoriesQuery } from '@/types/gql/graphql'
import type { CatalogueItemsResponse } from '@/types/responses/catalogue'
import type { CodebookType } from '@/types/responses/codebook'

import { usePandaTable } from '../../table/pandaTable/hooks/usePandaTable'
import type { GetRowPropsReturnType } from '../../table/pandaTable/PandaTable'
import { PandaTableV2 } from '../../table/pandaTableV2/PandaTableV2'
import { useCatalogueTableSelectColumns } from './CatalogueTableSelect.columns'

interface CatalogueTableSelectProps {
    hideButtons?: boolean
    enableQueryURL?: boolean
    tableId?: string
    catalogueItems?: CatalogueItemsResponse
    categoryList?: GetCategoriesQuery['catalogueCategories']
    loading?: boolean
    enableFiltering?: boolean
    setCategoryFilter?: (value: CodebookType) => void
    getRowProps?: (row: Row<any>) => GetRowPropsReturnType
    selectedItemUid?: string
    onSelectionChange?: (uid: string) => void
}

export const CatalogueTableSelectContext = createContext<{
    isHoveringId: number | undefined | string
}>({
    isHoveringId: undefined,
})

export const CatalogueTableSelectComponent = ({
    hideButtons,
    enableQueryURL = true,
    tableId = 'catalogueItemsModal',
    catalogueItems,
    getRowProps,
    categoryList,
    loading,
    setCategoryFilter,
    selectedItemUid,
    onSelectionChange,
}: CatalogueTableSelectProps) => {
    const columns = useCatalogueTableSelectColumns({
        tableId,
        hideButtons,
        catalogueItems,
        setCategoryFilter,
        selectedItemUid,
    })

    const table = usePandaTable({
        tableId,
        columns,
        data: catalogueItems?.data,
        settings: {
            enableSorting: true,
            enableQueryURL: true,
            enableColumnHiding: true,
            enableColumnReordering: true,
            manualSorting: true,
            defaultColumnOrder: ['selection', 'name'],
        },
    })

    useEffect(() => {
        table.setColumnVisibility({
            categoryName: categoryList?.length !== 0,
        })
        table.setColumnOrder(table.getAllLeafColumns().map(column => column.id))
    }, [categoryList, columns, table])

    return (
        <RadioGroup value={selectedItemUid} onValueChange={onSelectionChange} className="w-full">
            <PandaTableV2
                table={table}
                loading={loading}
                tableId={tableId}
                getRowProps={getRowProps}
                data={catalogueItems?.data}
                className={'relative overflow-y-scroll scrollbar-style text-sm'}
                settings={{
                    enableQueryURL,
                    defaultColumnOrder: ['selection', 'name'],
                    enableColumnHiding: false,
                    enableColumnReordering: false,
                    enableSorting: false,
                    manualSorting: false,
                }}
            />
        </RadioGroup>
    )
}
