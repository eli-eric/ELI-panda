import { useRouter } from 'next/router'
import { mutate } from 'swr'

import { SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

export const SearchBarButtons = () => {
  const router = useRouter()
  const handleRefresh = () => {
    mutate(key => typeof key === 'string' && key.startsWith('/catalogue/items'), undefined, { revalidate: true })
  }
  const handleAdd = () => {
    router.push(PATH.CATALOGUE_ITEM)
  }
  return (
    <SearchBarButtonsComponent handleAdd={handleAdd} handleRefresh={handleRefresh} editRole={ROLE.CATALOGUE_EDIT} />
  )
}
