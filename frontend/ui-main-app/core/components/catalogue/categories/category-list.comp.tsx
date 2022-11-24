import { Category } from 'core/types/responses'
import { Fragment } from 'react'

import CategoryItemComponent from './category-item.comp'

interface Props {
  categoryList: Array<Category>
}

const CategoryListComponent = ({ categoryList }: Props) => {
  return (
    <Fragment>
      {categoryList.length !== 0 && (
        <div className="px-4 py-5 sm:p-6">
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
