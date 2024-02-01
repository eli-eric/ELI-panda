import { Fragment } from 'react'

import ErrorPage from '@/components/error/ErrorPage'
import { classNames } from '@/utils'

import { useCategoryList } from '../../hooks/useCategoryList'
import { CategoryItemComponent } from './CategoryItem.comp'

export const CategoryList = () => {
  const { catalogueCategories, error, loading } = useCategoryList()

  return (
    <Fragment>
      {catalogueCategories?.length !== 0 && (
        <div className={classNames('px-4 py-5 sm:p-6 bg-white dark:bg-gray-800', loading && 'opacity-75')}>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-8">
            {catalogueCategories?.map(category => <CategoryItemComponent key={category.uid} category={category} />)}
          </div>
        </div>
      )}
      {error && <ErrorPage />}
    </Fragment>
  )
}
