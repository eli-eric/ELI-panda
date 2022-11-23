import { Fragment } from 'react'
import { Category } from 'types/responses'

import CategoryComponent from './category.comp'

interface Props {
  categoryList: Array<Category>
}

const CategoryListComponent = ({ categoryList }: Props) => {
  return (
    <Fragment>
      {categoryList.length !== 0 && (
        <div className="px-4 py-5 sm:p-6">
          {/* Content goes here */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {categoryList.map(category => (
              <CategoryComponent key={category.code} category={category} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default CategoryListComponent
