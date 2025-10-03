import { Home } from 'lucide-react'
import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import type { CodebookType } from '@/types/responses/codebook'

import { useCategory } from '../../hooks/useCategory'
import { AddCategoryButton } from '../categoryEdit/components/AddCateforyButton'

type CatalogueBreadcrumbsProps = {
  setCategoryFilter: (value: CodebookType | null) => void
}

export const CatalogueBreadcrumbs = ({
  setCategoryFilter
}: CatalogueBreadcrumbsProps) => {
  const { catalogueCategory } = useCategory()

  return (
    <Breadcrumb className="px-4 py-1">
      <BreadcrumbList>
        <BreadcrumbItem>
          <button
            className="text-gray-400 hover:text-gray-500 dark:text-gray-200 dark:hover:text-orange-600"
            onClick={() => setCategoryFilter(null)}
          >
            <Home className="h-4 w-4 shrink-0" />
          </button>
        </BreadcrumbItem>
        {catalogueCategory?.parentPath[0]?.uid &&
          catalogueCategory?.parentPath?.map(
            (path, idx) =>
              path &&
              path.uid &&
              path.name && (
                <Fragment key={path?.uid}>
                  {idx === 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {
                      <button
                        onClick={() =>
                          path.uid && path.name
                            ? setCategoryFilter({
                                uid: path.uid as string,
                                name: path.name as string
                              })
                            : undefined
                        }
                        className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-orange-600"
                      >
                        {path.name}
                      </button>
                    }
                  </BreadcrumbItem>
                  {idx < catalogueCategory.parentPath.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </Fragment>
              )
          )}
        {catalogueCategory && (
          <Fragment>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <button
                onClick={() =>
                  setCategoryFilter({
                    uid: catalogueCategory.uid,
                    name: catalogueCategory.name
                  })
                }
                className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-orange-600"
              >
                {catalogueCategory.name}
              </button>
            </BreadcrumbItem>
          </Fragment>
        )}
        <AddCategoryButton />
      </BreadcrumbList>
    </Breadcrumb>
  )
}
