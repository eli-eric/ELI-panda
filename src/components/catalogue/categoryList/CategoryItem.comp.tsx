import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'

import { useCategoryEdit } from '@/hooks/category/useCategoryEdit'
import { useEndpoint } from '@/hooks/useEndpoint'
import { PATH } from '@/types/constants/paths'
import { CatalogueCategoryResponse } from '@/types/responses'

interface Props {
  category: CatalogueCategoryResponse
  setCatalogueParentUid: Dispatch<SetStateAction<string | undefined>>
}

const CategoryItemComponent = ({ category, setCatalogueParentUid }: Props) => {
  const router = useRouter()
  const { catalogueCategoryImage } = useEndpoint({ uid: category.uid })
  const { getEditDeleteButtons } = useCategoryEdit({
    editUid: category.uid,
    catalogueParentPath: category.parentPath,
  })
  const path =
    PATH.CATALOGUE +
    (!category.parentPath ? '/' : '/' + category.parentPath + '/') +
    category.code
  return (
    <div className=" flex-row justify-between relative flex z-10 items-center space-x-3 rounded-lg border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:border-gray-400">
      <Link
        href={{ pathname: path, query: { ...router.query } }}
        key={category.code}
        className=" flex w-full items-center "
      >
        <div className="flex-shrink-0 mx-6 my-5">
          <Image
            className="h-10 w-10 rounded-full object-contain"
            width={200}
            height={200}
            alt={category.code}
            src={catalogueCategoryImage}
          />
        </div>
        <div className="min-w-0 flex-1 mx-6 my-5">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{category.name}</p>
          </div>
        </div>
      </Link>
      {getEditDeleteButtons()}
    </div>
  )
}

export default CategoryItemComponent
