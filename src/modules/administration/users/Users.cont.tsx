import { useRouter } from 'next/router'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { ColumnVisibilityDropdown } from '@/modules/shared/table/ColumnVisibilityDropdown.comp'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '@/modules/shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar, SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useUsersColumns } from './components/User.columns'
import { useUsers } from './hooks/useUsers'
import type { UserListItem } from './utils/filterUsers'

const TABLE_ID = 'users'
const SEARCH_PLACEHOLDER = 'Search name, email, LDAP user, role, team...'

// all users are loaded at once, so sorting and paging run client-side
const TABLE_SETTINGS: PandaTableSettings<UserListItem> = {
    enableSorting: true,
    manualSorting: false,
    enableQueryURL: true,
    enablePagination: true,
    enableColumnHiding: false,
}

export const UsersContainer = () => {
    const router = useRouter()
    const { users, loading, refetch } = useUsers()
    const columns = useUsersColumns()

    const table = usePandaTable<UserListItem>({
        tableId: TABLE_ID,
        columns,
        data: users || [],
        settings: TABLE_SETTINGS,
    })

    return (
        <TableLayoutContainer>
            <SearchBar
                tableId={TABLE_ID}
                placeholder={SEARCH_PLACEHOLDER}
                left={
                    <SearchBarButtonsComponent
                        handleAdd={() => router.push(PATH.ADMIN_USER)}
                        handleRefresh={refetch}
                        editRole={ROLE.ADMIN}
                    />
                }
                right={<ColumnVisibilityDropdown table={table} />}
            />
            <PandaTableV2
                tableId={TABLE_ID}
                table={table}
                data={users}
                settings={TABLE_SETTINGS}
                loading={loading}
                skeletonRowCount={20}
            />
        </TableLayoutContainer>
    )
}
