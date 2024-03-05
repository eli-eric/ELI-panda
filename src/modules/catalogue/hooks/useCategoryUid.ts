import { useFormFilterState } from '@/hooks/form/useFormFilters'

export const useCategoryUid = () => {
  const tableId = 'catalogueItems'
  const { storeFilters } = useFormFilterState({ tableId, enableQueryUrl: true })
  const filter = storeFilters?.find(filter => filter.id === 'category')
  const uid = (filter?.value as { uid: string })?.uid

  return uid
}
