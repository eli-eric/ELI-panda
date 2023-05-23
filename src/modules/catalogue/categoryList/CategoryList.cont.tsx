import { useSession } from 'next-auth/react'
import { type Dispatch, Fragment, type SetStateAction, useEffect } from 'react'
import { useCategoryPath } from 'src/hooks/usePath'
import useSWR from 'swr'

import type { CatalogueCategoryResponse } from '@/types/responses'

import CategoryItemComponent from './CategoryItem.comp'
import useCategoryList from '../hooks/useCategoryList'

const CategoryListContainer = () => {
  const { categoryList } = useCategoryList()

  return (
    <Fragment>
      {categoryList?.length !== 0 && (
        <div id="category-list" className="px-4 py-5 sm:p-6 bg-white">
          {/* Content goes here */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-8">
            {categoryList?.map((category, index) => (
              <CategoryItemComponent key={category.code + index} category={category} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default CategoryListContainer
