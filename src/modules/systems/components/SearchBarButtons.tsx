import { useSystemCreateSheet } from '@/modules/shared/system/system-create/useSystemCreateSheet'
import { SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { ROLE } from '@/types/constants/roles'

import { ExportCsvButton } from './ExportCsvButton'
import { SystemFilterButtonContainer } from './filters/SystemsFilterButton.cont'

export const SearchBarButtons = () => {
  const openCreateSheet = useSystemCreateSheet({})

  const handleRefresh = () => {
    //TODO: refetch()???
  }

  return (
    <SearchBarButtonsComponent
      handleAdd={openCreateSheet}
      handleRefresh={handleRefresh}
      editRole={ROLE.SYSTEM_EDIT}
    >
      <SystemFilterButtonContainer />
      <ExportCsvButton />
    </SearchBarButtonsComponent>
  )
}
