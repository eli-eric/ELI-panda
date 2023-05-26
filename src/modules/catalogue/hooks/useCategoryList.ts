import useFetch from '@/hooks/fetch/useFetch'
import { useCategoryPath } from '@/modules/catalogue/hooks/usePath'
import type { CatalogueCategoryResponse } from '@/types/responses'

const useCategoryList = () => {
  const categoryPath = useCategoryPath()
  /* fetch category list */
  const { response, loading, error, mutate } = useFetch<Array<CatalogueCategoryResponse>>({
    url: categoryPath,
    config: { suspense: false }
  })
  return { categoryList: response, loading, error, mutate }
}

export default useCategoryList
