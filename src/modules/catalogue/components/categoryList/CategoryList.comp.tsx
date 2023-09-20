import { Fragment } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import ProgressBarComponent from '@/components/progress-bar.comp'

import { useCategoryList } from '../../hooks/useCategoryList'
import { CategoryItemComponent } from './CategoryItem.comp'

export const CategoryList = () => {
  const { categoryList: cg, error, loading, uid } = useCategoryList()

  const categoryList = uid ? cg && cg[0].subCategories : cg

  return (
    <Fragment>
      {categoryList?.length !== 0 && (
        <div className="px-4 py-5 sm:p-6 bg-white">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-8">
            {categoryList?.map((category, index) => (
              <CategoryItemComponent key={category.code + index} category={category} />
            ))}
          </div>
        </div>
      )}
      {error && <ErrorPage />}
      {loading && <ProgressBarComponent />}
    </Fragment>
  )
}
