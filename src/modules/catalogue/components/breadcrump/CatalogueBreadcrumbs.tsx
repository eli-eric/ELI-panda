import { HomeIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

import BreadcrumpContainer from '@/components/Breadcrump/Breadcrump.cont'
import BreadcrumpItem from '@/components/Breadcrump/Breadcrump.item'
import type { CodebookType } from '@/hooks/fetch/useCodebook'

import { useCategory } from '../../hooks/useCategory'
import { useCategoryEdit } from '../../hooks/useCategoryEdit'

type CatalogueBreadcrumbsProps = {
  setCategoryFilter: (value: CodebookType | null) => void
}
export const CatalogueBreadcrumbs = ({ setCategoryFilter }: CatalogueBreadcrumbsProps) => {
  const { getAddButton } = useCategoryEdit({})
  const { catalogueCategory } = useCategory()

  return (
    <BreadcrumpContainer>
      <li className="flex">
        <div className="flex items-center">
          <button
            className="text-gray-400 hover:text-gray-500 dark:text-gray-200 dark:hover:text-primary-600"
            onClick={() => {
              setCategoryFilter(null)
            }}
          >
            <HomeIcon className="h-4 w-4 flex-shrink-0" />
          </button>
        </div>
      </li>
      <Fragment>
        {catalogueCategory?.parentPath[0]?.uid &&
          catalogueCategory?.parentPath?.map((path, i) => (
            <BreadcrumpItem
              key={i}
              name={path?.name as string}
              path={path as CodebookType}
              setCategoryFilter={setCategoryFilter}
            />
          ))}
        {catalogueCategory && (
          <BreadcrumpItem
            name={catalogueCategory?.name}
            setCategoryFilter={setCategoryFilter}
            path={{ uid: catalogueCategory.uid, name: catalogueCategory.name }}
          />
        )}
        {getAddButton()}
      </Fragment>
    </BreadcrumpContainer>
  )
}
