import { useSession } from 'next-auth/react'
import { Dispatch, Fragment, SetStateAction, useEffect } from 'react'
import { useCategoryPath } from 'src/hooks/usePath'
import useSWR from 'swr'

import { CatalogueCategoryResponse } from '@/types/responses'

import CategoryItemComponent from './CategoryItem.comp'

interface Props {
  setCatalogueCategoryList: Dispatch<SetStateAction<CatalogueCategoryResponse[] | undefined>>
  setCatalogueParentUid: Dispatch<SetStateAction<string | undefined>>
}

const CategoryListContainer = ({ setCatalogueCategoryList, setCatalogueParentUid }: Props) => {
  const { data: session } = useSession()
  const categoryPath = useCategoryPath()
  /* fetch category list */
  const { data: categoryList } = useSWR<Array<CatalogueCategoryResponse>>(session ? categoryPath : null)

  useEffect(() => {
    setCatalogueCategoryList(categoryList)
  }, [categoryList, setCatalogueCategoryList])

  return (
    <Fragment>
      {categoryList?.length !== 0 && (
        <div id="catalogue-list" className="px-4 py-5 sm:p-6 bg-white">
          {/* Content goes here */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-8">
            {categoryList?.map(category => (
              <CategoryItemComponent
                key={category.code}
                category={category}
                setCatalogueParentUid={setCatalogueParentUid}
              />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default CategoryListContainer
