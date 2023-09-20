import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useImage } from '@/hooks/fetch/useImage'
import { PATH } from '@/types/constants/paths'

import type { CatalogueCategory } from '../../types/responses'

interface Props {
  category: CatalogueCategory
}

export const CategoryItemComponent = ({ category }: Props) => {
  const router = useRouter()
  const { catalogueCategoryImage } = useEndpoint({ uid: category.uid })
  const image = useImage(catalogueCategoryImage)

  //TODO: clean up
  /*  const { getEditButtons } = useCategoryEdit({
    editUid: category.uid
    catalogueParentPath: category.parentPath
  }) */
  const path = PATH.CATALOGUE + '/' + category.uid
  return (
    <div className="flex-row justify-between relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:border-gray-400">
      <Link
        href={{
          pathname: path,
          query: router.query.search && { search: router.query.search }
        }}
        key={category.code}
        className="flex w-full items-center "
      >
        <div className="flex-shrink-0 mx-6 my-4">
          <Image
            className="h-10 w-10 rounded-sm object-contain"
            width={200}
            height={200}
            alt={category.code}
            src={image}
          />
        </div>
        <div className="min-w-0 flex-1 mx-6 my-4">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{category.name}</p>
          </div>
        </div>
      </Link>
      {/* {getEditButtons()} */}
    </div>
  )
}
