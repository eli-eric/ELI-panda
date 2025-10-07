import { useRouter } from 'next/router'
import type { UseFormReturn } from 'react-hook-form'

import { ModalStatisticsButtonLarge } from '@/modules/catalogueItem/components/statistics/CatalogueStatistics.button'
import { SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useCatalogueItems } from '../hooks/useCatalogueItems'
import { useCategoryUid } from '../hooks/useCategoryUid'
import { CatalogueFilterButtonContainer } from './filters/CatalogueFilterButton.cont'

interface SearchBarButtonsProps {
  filterFormMethods: UseFormReturn<any, any, any>
}

export const SearchBarButtons = ({
  filterFormMethods
}: SearchBarButtonsProps) => {
  const router = useRouter()
  const uid = useCategoryUid()
  const { refetch } = useCatalogueItems()
  const handleRefresh = () => {
    refetch()
  }
  const handleAdd = () => {
    router.push({
      pathname: PATH.CATALOGUE_ITEM,
      query: uid ? { categoryUid: uid } : undefined
    })
  }
  return (
    <SearchBarButtonsComponent
      handleAdd={handleAdd}
      handleRefresh={handleRefresh}
      editRole={ROLE.CATALOGUE_EDIT}
    >
      <div className="flex gap-1">
        <ModalStatisticsButtonLarge />
        <CatalogueFilterButtonContainer filterFormMethods={filterFormMethods} />
      </div>
    </SearchBarButtonsComponent>
  )
}
