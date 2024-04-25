import Image from 'next/image'

import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useImage } from '@/hooks/fetch/useImage'

import { CategoryButtons } from '../categoryEdit/components/CategoryButtons'
import type { GetCategoriesQuery } from '@/types/gql/graphql'

interface Props {
  category: GetCategoriesQuery['catalogueCategories'][0]
  setCategoryFilter: (value: CodebookType) => void
}

export const CategoryItemComponent = ({
  category,
  setCategoryFilter
}: Props) => {
  const { catalogueCategoryImage } = useEndpoint({ uid: category.uid })
  const image = useImage(catalogueCategoryImage)

  return (
    <div className="flex-row justify-between dark:hover:bg-gray-600 relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:border-gray-400">
      <button
        onClick={() => {
          setCategoryFilter({ uid: category.uid, name: category.name })
        }}
        key={category.code}
        className="flex w-full items-center "
      >
        <div className="flex-shrink-0 mx-6 my-4">
          <Image
            className="h-10 w-10 rounded-sm object-contain"
            width={200}
            height={200}
            alt={category.name}
            src={image}
          />
        </div>
        <div className="min-w-0 flex-1 mx-6 my-4">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
              {category.name}
            </p>
          </div>
        </div>
      </button>
      <CategoryButtons uid={category.uid} />
    </div>
  )
}
