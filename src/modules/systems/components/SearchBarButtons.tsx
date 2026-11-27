import { SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { ROLE } from '@/types/constants/roles'

import { useCreateSystemFromOverview } from '../hooks/useCreateSystemFromOverview'
import { ExportCsvButton } from './ExportCsvButton'
import { SystemFilterButtonContainer } from './filters/SystemsFilterButton.cont'

export const SearchBarButtons = () => {
    const openCreateSystem = useCreateSystemFromOverview()

    const handleOpenDialog = () => {
        void openCreateSystem()
    }

    const handleRefresh = () => {
        //TODO: refetch()???
    }

    return (
        <SearchBarButtonsComponent
            handleAdd={handleOpenDialog}
            handleRefresh={handleRefresh}
            editRole={ROLE.SYSTEM_EDIT}
        >
            <SystemFilterButtonContainer />
            <ExportCsvButton />
        </SearchBarButtonsComponent>
    )
}
