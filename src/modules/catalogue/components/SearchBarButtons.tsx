import { useRouter } from 'next/router'
import type { UseFormReturn } from 'react-hook-form'
import { mutate } from 'swr'

import { ModalStatisticsButtonLarge } from '@/modules/catalogueItem/components/statistics/CatalogueStatistics.button'
import { SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { CatalogueFilterButtonContainer } from './filters/CatalogueFilterButton.cont'
import { useCategoryUid } from '../hooks/useCategoryUid'

interface SearchBarButtonsProps {
  filterFormMethods: UseFormReturn<any, any, any>
}

export const SearchBarButtons = ({ filterFormMethods }: SearchBarButtonsProps) => {
  const router = useRouter()
  const uid = useCategoryUid()
  const handleRefresh = () => {
    mutate(key => typeof key === 'string' && key.startsWith('/catalogue/items'), undefined, { revalidate: true })
  }
  const handleAdd = () => {
    router.push({ pathname: PATH.CATALOGUE_ITEM, query: uid ? { catalogueUid: uid } : undefined })
  }
  return (
    <SearchBarButtonsComponent handleAdd={handleAdd} handleRefresh={handleRefresh} editRole={ROLE.CATALOGUE_EDIT}>
      <div>
        <ModalStatisticsButtonLarge />
        <CatalogueFilterButtonContainer filterFormMethods={filterFormMethods} />
      </div>
    </SearchBarButtonsComponent>
  )
}
