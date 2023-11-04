import { useRouter } from 'next/router'

import { SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useSystems } from '../hooks/useSystems'
import { systemsRefresh } from '../utils'

export const SearchBarButtons = () => {
  const { mutate: systemsMutate } = useSystems('systems')
  const router = useRouter()

  const handleRefresh = () => {
    systemsMutate(systemsRefresh, { revalidate: false })
  }
  const handleAdd = () => {
    router.push(PATH.SYSTEM)
  }

  return <SearchBarButtonsComponent handleAdd={handleAdd} handleRefresh={handleRefresh} editRole={ROLE.SYSTEM_EDIT} />
}
