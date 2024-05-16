import { useRouter } from 'next/router'

import { SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { SystemFilterButtonContainer } from './filters/SystemsFilterButton.cont'

export const SearchBarButtons = () => {
  const router = useRouter()

  const handleRefresh = () => {
    //TODO: refetch()???
  }
  const handleAdd = () => {
    router.push(PATH.SYSTEM)
  }

  return (
    <SearchBarButtonsComponent
      handleAdd={handleAdd}
      handleRefresh={handleRefresh}
      editRole={ROLE.SYSTEM_EDIT}
    >
      <SystemFilterButtonContainer />
    </SearchBarButtonsComponent>
  )
}
