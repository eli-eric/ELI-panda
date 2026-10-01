import type { FC } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { useUrlQueryState } from '@/hooks/useUrlQueryState'
import { message } from '@/i18n/src/messages'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import useTableStateStore from '@/store/useTableStateStore'
import { parseColumnFilterParam } from '@/utils/urlQuery'

import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { useSystemLeaves } from '../../hooks/queries/useSystemLeaves'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { HIERARCHY_VIEWS, LEAVES_TABLE_ID } from '../../types/constants'
import { SystemDetailViewContainer } from '../detail/SystemDetailView.cont'
import { RelationshipGraphContainer } from '../graph/RelationshipGraph.cont'
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
        activeView,
        setActiveView,
    } = useHierarchyNavigation()
    const { system: parentSystem, isLoading: isParentLoading } = useSystemDetail(selectedParentUid)
    const { leaves, totalCount, isLoading } = useSystemLeaves(selectedParentUid)

    const { columns } = useLeavesColumns()

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
    const hasActiveFilters = storeFilters.length > 0

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
            isLoading={isParentLoading}
            onViewParentDetail={handleViewParentDetail}
            onSelectAncestor={selectParent}
            activeView={activeView}
            onViewChange={setActiveView}
        />
    )

    if (activeView === HIERARCHY_VIEWS.GRAPH) {
        return (
            <div
                className="flex flex-col h-full overflow-hidden"
                data-testid="system-hierarchy-leaves-panel"
            >
                {header}
                <div className="flex-1 min-h-0 overflow-hidden">
                    <RelationshipGraphContainer />
                </div>
            </div>
        )
    }

    const toolbar = <LeavesToolbar tableId={LEAVES_TABLE_ID} table={table} enableQueryURL={true} />

    const emptyState = hasActiveFilters ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
            <div className="text-center">
                <p>{fm({ id: message.systemHierarchy.leaves.noLeaves })}</p>
                <Button
                    variant="link"
                    size="sm"
                    className="mt-2"
                    onClick={() => {
                        setColumnFilters([])
                        setSearch(LEAVES_TABLE_ID, '')
                        setSearchValue(LEAVES_TABLE_ID, '')
                    }}
                >
                    {fm({ id: message.common.ui.clearFilters })}
                </Button>
            </div>
        </div>
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
                    onRowClick={selectLeaf}
                    table={table}
                    toolbar={toolbar}
                    emptyState={emptyState}
                />
            </div>
        </div>
    )
}
