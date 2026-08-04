import { useQueryState } from 'next-usequerystate'
import type { FC } from 'react'
import { useCallback, useEffect } from 'react'
import { useIntl } from 'react-intl'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { useResetPaginationOnChange } from '@/hooks/table/usePagination'
import { message } from '@/i18n/src/messages'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import useTableStateStore from '@/store/useTableStateStore'

import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { useSystemLeaves } from '../../hooks/queries/useSystemLeaves'
import { useDeleteSystemAction } from '../../hooks/useDeleteSystemAction'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { LEAVES_TABLE_ID } from '../../types/constants'
import { SystemDetailViewContainer } from '../detail/SystemDetailView.cont'
import { LeavesEmptyState } from './LeavesEmptyState.comp'
import { LeavesPanelHeader } from './LeavesPanelHeader.comp'
import { LeavesTableComponent } from './LeavesTable.comp'
import { LeavesToolbar } from './LeavesToolbar.comp'
import { useLeavesColumns } from './useLeavesColumns'

export const LeavesPanelContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const {
        selectedParentUid,
        selectedLeafUid,
        selectLeaf,
        selectParent,
        directOnly,
        setDirectOnly,
    } = useHierarchyNavigation()
    const { system: parentSystem, isLoading: isParentLoading } = useSystemDetail(selectedParentUid)
    const { leaves, totalCount, isLoading, isInitialLoad } = useSystemLeaves(
        selectedParentUid,
        directOnly,
    )

    const { columns } = useLeavesColumns()
    const { canEdit, handleDeleteSystem } = useDeleteSystemAction()

    const table = usePandaTable({
        tableId: LEAVES_TABLE_ID,
        columns,
        data: leaves,
        settings: {
            enableSorting: true,
            enableColumnHiding: true,
            enableFiltering: true,
            manualFiltering: true,
            enableColumnReordering: false,
        },
    })

    // Sync URL filter params → store on mount (enables persistence across refresh/new tab)
    const [filterQuery] = useQueryState('filter')
    const [pageQuery] = useQueryState('page')
    const { setColumnFilter, setSearch, setSearchValue, setPaginationState } = useTableStateStore()

    // Pagination reset has two halves: selectParent clears ?page when the parent
    // changes; this effect clears zustand paginationState (which useQueryManager
    // prioritises over the URL) whenever the URL has no explicit ?page. That covers
    // both same-mount parent changes and fresh mounts where a previous visit's
    // store entry would otherwise leak. Deep-link reloads with ?page=N keep their page.
    useEffect(() => {
        if (!pageQuery) {
            setPaginationState(LEAVES_TABLE_ID, undefined)
        }
    }, [pageQuery, selectedParentUid, setPaginationState])

    useEffect(() => {
        if (filterQuery) {
            try {
                const parsed = JSON.parse(filterQuery)
                const urlFilters = Array.isArray(parsed) ? parsed : []
                if (urlFilters.length > 0) {
                    setColumnFilter(LEAVES_TABLE_ID, urlFilters)
                }
            } catch {
                // ignore malformed filter query
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { setColumnFilters, storeFilters } = useFormFilterState({
        tableId: LEAVES_TABLE_ID,
        enableQueryUrl: true,
    })
    // Search narrows the result exactly like a column filter does, so the empty state
    // has to account for both or it will blame the wrong thing.
    const activeSearch = useTableStateStore(s => s.instances[LEAVES_TABLE_ID]?.search) ?? ''
    const hasNarrowedQuery = storeFilters.length > 0 || activeSearch.length > 0

    const handleClearNarrowing = useCallback(() => {
        setColumnFilters([])
        setSearch(LEAVES_TABLE_ID, '')
        setSearchValue(LEAVES_TABLE_ID, '')
    }, [setColumnFilters, setSearch, setSearchValue])

    // setDirectOnly drops ?page, but useQueryManager reads the zustand paginationState
    // first and that is only cleared by an effect — one render would otherwise request
    // a page that does not exist in the narrowed set.
    const resetPagination = useResetPaginationOnChange(LEAVES_TABLE_ID)
    const handleDirectOnlyChange = useCallback(
        (next: boolean) => {
            resetPagination()
            setDirectOnly(next)
        },
        [resetPagination, setDirectOnly],
    )

    const handleViewParentDetail = useCallback(() => {
        if (selectedParentUid) {
            selectLeaf(selectedParentUid)
        }
    }, [selectedParentUid, selectLeaf])

    if (selectedLeafUid) {
        return <SystemDetailViewContainer />
    }

    if (!selectedParentUid) {
        return (
            <div
                className="flex items-center justify-center h-full text-muted-foreground text-sm"
                data-testid="system-hierarchy-empty-state"
            >
                {fm({ id: message.systemHierarchy.leaves.selectParent })}
            </div>
        )
    }

    const header = (
        <LeavesPanelHeader
            parentName={parentSystem?.name ?? null}
            parentSystemCode={parentSystem?.systemCode ?? null}
            parentSystemType={parentSystem?.systemType?.name ?? null}
            parentPath={parentSystem?.parentPath ?? null}
            totalCount={totalCount}
            directOnly={directOnly}
            isLoading={isParentLoading}
            onViewParentDetail={handleViewParentDetail}
            onSelectAncestor={selectParent}
        />
    )

    const toolbar = (
        <LeavesToolbar
            tableId={LEAVES_TABLE_ID}
            table={table}
            enableQueryURL={true}
            directOnly={directOnly}
            onDirectOnlyChange={handleDirectOnlyChange}
        />
    )

    const emptyState =
        directOnly || hasNarrowedQuery ? (
            <LeavesEmptyState
                directOnly={directOnly}
                hasNarrowedQuery={hasNarrowedQuery}
                onShowAllLevels={() => handleDirectOnlyChange(false)}
                onClearFilters={handleClearNarrowing}
            />
        ) : undefined

    return (
        <div
            className="flex flex-col h-full overflow-hidden"
            data-testid="system-hierarchy-leaves-panel"
        >
            {header}
            <div className="flex-1 min-h-0 overflow-hidden">
                <LeavesTableComponent
                    data={leaves}
                    totalCount={totalCount}
                    isLoading={isLoading}
                    isInitialLoad={isInitialLoad}
                    onRowClick={selectLeaf}
                    table={table}
                    toolbar={toolbar}
                    emptyState={emptyState}
                    canEdit={canEdit}
                    onDeleteSystem={handleDeleteSystem}
                />
            </div>
        </div>
    )
}
