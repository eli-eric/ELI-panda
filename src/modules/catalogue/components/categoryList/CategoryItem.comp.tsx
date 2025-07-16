import Image from 'next/image'

import { cn } from '@/lib/utils'
import { FALLBACK_IMAGE } from '@/types/constants/general'
import type { GetCategoriesQuery } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

import { CategoryButtons } from '../categoryEdit/components/CategoryButtons'

interface Props {
  category: GetCategoriesQuery['catalogueCategories'][0]
  setCategoryFilter: (value: CodebookType) => void
}

export const CategoryItemComponent = ({
  category,
  setCategoryFilter
}: Props) => {
  const image = category?.miniImageUrl?.split(';')[0]
  return (
    <div
      className={cn(
        'flex-row justify-between dark:hover:bg-gray-600 relative flex items-center space-x-3 rounded-lg',
        'transform transition-transform duration-300 ease-in-out hover:-translate-y-1',
        'dark:bg-gray-700 dark:shadow-black shadow-md hover:shadow-2xl focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2',
        'group hover:z-50'
      )}
    >
      <button
        onClick={() => {
          setCategoryFilter({ uid: category.uid, name: category.name })
        }}
        key={category.code}
        className="flex w-full items-center "
      >
        <div className="shrink-0 mx-6 my-4">
          <Image
            className={cn('h-10 w-10 rounded-sm object-contain')}
            width={200}
            height={200}
            alt={category.name}
            src={image || FALLBACK_IMAGE.url}
          />
        </div>
        <div className="min-w-0 flex-1 mx-6 my-4">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-xs font-medium text-gray-900 dark:text-gray-200">
              {category.name}
            </p>
          </div>
        </div>
      </button>
      <div className={cn('opacity-0', 'group-hover:opacity-100')}>
        <CategoryButtons uid={category.uid} />
      </div>
    </div>
  )
}
