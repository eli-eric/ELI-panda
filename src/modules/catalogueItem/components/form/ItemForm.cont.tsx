import useForm from '@/hooks/form/useForm'

import useItem from '../../hooks/useItem'
import type { CatalogueItem } from '../../types/responses'

const useItemForm = () => {
  const item = useItem()
  const { FormWarningModal, ...formMethods } = useForm<CatalogueItem>({ defaultValues: item.item })

  return {
    FormWarningModal,
    item,
    ...formMethods
  }
}

export default useItemForm
