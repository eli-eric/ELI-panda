import { Fragment } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import ProgressBarComponent from '@/components/progress-bar.comp'

import useCategoryList from '../hooks/useCategoryList'
import CategoryItemComponent from './CategoryItem.comp'

const CategoryListContainer = () => {
  const { categoryList, error, loading } = useCategoryList()
  return (
    <Fragment>
      {categoryList?.length !== 0 && (
        <div id="category-list" className="px-4 py-5 sm:p-6 bg-white">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-8">
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

export default CategoryListContainer
