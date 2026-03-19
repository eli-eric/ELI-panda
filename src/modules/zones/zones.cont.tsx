import type { FC } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { ROLE } from '@/types/constants/roles'

import { PaginationV2 as Pagination } from '../shared/table/PaginationV2'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '../shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '../shared/table/pandaTableV2/PandaTableV2'
import { SearchBar, SearchBarButtonsComponent } from '../shared/table/SearchBar'
import { ZoneImportButton } from './components/zone-import.comp'
import { useOpenZoneForm } from './hooks/useOpenZoneForm'
import { useZones } from './hooks/useZones'
import type { Zone } from './types/zone.types'
import { useZoneColumns } from './zones.columns'

export const ZonesContainer: FC = () => {
    const tableId = 'zones'

    const columns = useZoneColumns()
    const { data, refetch, isLoading } = useZones(tableId)

    const { openZoneForm } = useOpenZoneForm({ onSuccess: refetch })

    const tableSettings: PandaTableSettings<Zone> = {
        enableSorting: true,
        manualSorting: true,
        enableColumnReordering: true,
        enableQueryURL: true,
        enableColumnHiding: true,
    }

    const table = usePandaTable<Zone>({
        tableId,
        columns,
        data: data?.data || [],
        settings: tableSettings,
    })

    return (
        <TableLayoutContainer>
            <SearchBar
                tableId={tableId}
                left={
                    <SearchBarButtonsComponent
                        editRole={ROLE.ZONES_EDIT}
                        handleAdd={openZoneForm}
                        handleRefresh={refetch}
                    >
                        <ZoneImportButton onSuccess={refetch} />
                    </SearchBarButtonsComponent>
                }
            />
            <PandaTableV2
                tableId={tableId}
                table={table}
                data={data?.data}
                settings={tableSettings}
                loading={isLoading}
            />
            <Pagination
                tableId={tableId}
                settings={{
                    enableQueryURL: true,
                    total: data?.totalCount,
                }}
            />
        </TableLayoutContainer>
    )
}
