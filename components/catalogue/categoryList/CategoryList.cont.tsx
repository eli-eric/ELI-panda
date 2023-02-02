import ModalComponent from 'components/ui/modal/modal.comp'
import { useCategoryPath } from 'hooks/usePath'
import { useSession } from 'next-auth/react'
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import useSWR from 'swr'
import { CatalogueCategoryResponse } from 'types/responses'

import TestEditModal from '../categoryEditForm/TestEdit'
import CategoryItemComponent from './CategoryItem.comp'

interface Props {
  setCatalogueCategoryList: Dispatch<SetStateAction<CatalogueCategoryResponse[] | undefined>>
}

const CategoryListContainer = ({ setCatalogueCategoryList }: Props) => {
  const { data: session } = useSession()
  const [open, setopen] = useState(false)
  const categoryPath = useCategoryPath()
  /* fetch category list */
  const { data: categoryList } = useSWR<Array<CatalogueCategoryResponse>>(session ? categoryPath : null)

  useEffect(() => {
    setCatalogueCategoryList(categoryList)
  }, [categoryList])

  return (
    <Fragment>
      {categoryList?.length !== 0 && (
        <div id="catalogue-list" className="px-4 py-5 sm:p-6 bg-white">
          {/* Content goes here */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-8">
            {categoryList?.map(category => (
              <CategoryItemComponent key={category.code} category={category} />
            ))}
            <button
              onClick={() => {
                setopen(true)
              }}
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
              <div className="flex-shrink-0"></div>
              <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">New Category +</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
      <ModalComponent open={open} setOpen={setopen} testid="catalogueEdit">
        <TestEditModal />
      </ModalComponent>
    </Fragment>
  )
}

export default CategoryListContainer
