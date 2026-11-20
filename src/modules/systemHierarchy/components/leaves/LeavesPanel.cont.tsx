import type { FC } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { useResetPaginationOnChange } from '@/hooks/table/usePagination'
import { useUrlQueryState } from '@/hooks/useUrlQueryState'
import { message } from '@/i18n/src/messages'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import useTableStateStore from '@/store/useTableStateStore'
import { parseColumnFilterParam } from '@/utils/urlQuery'

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

    const { columns } = useLeavesColumns({ parentUid: selectedParentUid })
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
    const [filterQuery] = useUrlQueryState('filter')
    const [pageQuery] = useUrlQueryState('page')
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

    // Keyed on "have we hydrated yet" rather than on mount: `filterQuery` comes
    // from useUrlQueryState, whose value arrives after the first commit on a
    // server-rendered page. Mount-only works today purely because this panel is
    // loaded via dynamic(..., { ssr: false }) — which is not a dependency worth
    // relying on.
    const hasHydratedFilters = useRef(false)

    useEffect(() => {
        if (hasHydratedFilters.current) return
        const urlFilters = parseColumnFilterParam(filterQuery)
        if (urlFilters.length === 0) return

        hasHydratedFilters.current = true
        setColumnFilter(LEAVES_TABLE_ID, urlFilters)
    }, [filterQuery, setColumnFilter])

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
