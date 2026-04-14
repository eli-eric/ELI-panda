import type { Row } from '@tanstack/react-table'
import { Fragment, memo, useCallback, useEffect, useRef } from 'react'

import { ColumnVisibilityDropdown } from '@/modules/shared/table/ColumnVisibilityDropdown.comp'
import { PaginationV2 as Pagination } from '@/modules/shared/table/PaginationV2'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type {
    GetRowPropsReturnType,
    PandaTableSettings,
} from '@/modules/shared/table/pandaTable/PandaTable'
import {
    PandaTableV2,
    type PandaTableV2Handle,
} from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import { useRecalculate } from '@/modules/systemItem/hooks/useRecalculate'
import type { PageSizeOption } from '@/types/pagination'
import type { SystemDetail } from '@/types/responses/systems'

import { useSystems } from '../../hooks/useSystems'
import { SearchBarButtons } from '../SearchBarButtons'
import { useSystemsColumns } from './useSystemsColumns'

const MemoizedSearchBar = memo(SearchBar)

interface Props {
    tableId: string
    pageSizeDefault?: PageSizeOption
    className?: string
    collapseOnUnMount?: boolean
    hideButtons?: boolean
    enableDragAndDrop?: boolean
    getRowProps?: (row: Row<SystemDetail>) => GetRowPropsReturnType
    settings?: PandaTableSettings<SystemDetail>
    SecondRowElement?: () => JSX.Element
    LeftSearchBarElement?: () => JSX.Element
    isGlobalSearch?: boolean
}

export const SystemsTable = ({
    tableId,
    pageSizeDefault,
    className,
    hideButtons = false,
    getRowProps,
    settings,
    enableDragAndDrop,
    LeftSearchBarElement,
    SecondRowElement,
    collapseOnUnMount,
    isGlobalSearch = false,
}: Props) => {
    const enableQueryURL = Boolean(settings?.enableQueryURL)
    const { systems, loading } = useSystems(tableId, false, pageSizeDefault, enableQueryURL)
    const { columns, pending } = useSystemsColumns({
        tableId,
        hideButtons,
        enableDragAndDrop: enableDragAndDrop,
        enableQueryURL,
    })
    const [recalculate] = useRecalculate({ tableId, enableQueryURL })
    const tableRef = useRef<PandaTableV2Handle>(null)

    useEffect(() => {
        if (systems) {
            recalculate(null)
        }
        // eslint-disable-next-line
    }, [])

    const table = usePandaTable({
        tableId,
        columns,
        data: systems?.data,
        getSubRows: original => original.subSystems ?? [],
        settings: {
            ...settings,
            enableColumnReordering: true,
            defaultColumnOrder: ['miniImageUrl', 'icon', 'name'],
        },
    })

    const onChangeSearch = useCallback(() => {
        table.resetExpanded()
    }, [table])

    useEffect(() => {
        table.setColumnOrder(table.getAllLeafColumns().map(column => column.id))
        return () => {
            if (collapseOnUnMount) {
                table.resetExpanded()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [table])

    // Scroll table to top when page changes
    const handlePageChange = useCallback(() => {
        tableRef.current?.scrollToTop()
    }, [])

    return (
        <Fragment>
            <MemoizedSearchBar
                tableId={tableId}
                useQuery={settings?.enableQueryURL}
                isGlobalSearch={isGlobalSearch}
                left={
                    !hideButtons && !enableDragAndDrop ? (
                        <SearchBarButtons />
                    ) : LeftSearchBarElement ? (
                        <LeftSearchBarElement />
                    ) : undefined
                }
                onChange={onChangeSearch}
                right={<ColumnVisibilityDropdown table={table} />}
                secondRow={SecondRowElement && <SecondRowElement />}
            />
            <PandaTableV2
                ref={tableRef}
                data={systems?.data}
                table={table}
                loading={loading || pending}
                tableId={tableId}
                skeletonRowCount={pageSizeDefault}
                getRowProps={getRowProps}
                settings={{
                    ...settings,
                    enableColumnReordering: true,
                }}
                className={className}
            />
            <Pagination
                tableId={tableId}
                settings={{
                    enableQueryURL: settings?.enableQueryURL,
                    pageSizeDefault: pageSizeDefault,
                    total: systems?.totalCount,
                }}
                onPageChange={handlePageChange}
            />
        </Fragment>
    )
}
