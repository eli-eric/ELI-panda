import { CatalogueCategoryResponse } from 'types/responses'
import { Fragment } from 'react'

import CategoryItemComponent from './category-item.comp'

interface Props {
  categoryList?: Array<CatalogueCategoryResponse>
}

const CategoryListComponent = ({ categoryList }: Props) => {
  return (
    <Fragment>
      {categoryList && categoryList.length !== 0 && (
        <div id="catalogue-list" className="px-4 py-5 sm:p-6 bg-white">
          {/* Content goes here */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-8">
            {categoryList.map(category => (
              <CategoryItemComponent key={category.code} category={category} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default CategoryListComponent
