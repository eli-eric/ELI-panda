import { useRouter } from 'next/router'

import { SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useSystems } from '../hooks/useSystems'
import { useSystemsRefresh } from '../utils'
import { SystemFilterButtonContainer } from './filters/SystemsFilterButton.cont'

export const SearchBarButtons = () => {
  const { refetch } = useSystems('systems')
  const router = useRouter()

  const systemsRefresh = useSystemsRefresh('systems')

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
