import { ENDPOINTS } from 'types/constants/endpoints'
import { PATHS } from 'types/constants/paths'
import { CatalogueCategoryResponse } from 'types/responses'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  category: CatalogueCategoryResponse
}

const CategoryItemComponent = ({ category }: Props) => {
  const router = useRouter()
  const { search } = router.query
  const path = PATHS.CATALOGUE + (!category.parentPath ? '/' : '/' + category.parentPath + '/') + category.code

  return (
    <Link
      href={{ pathname: path, query: search && { search: search } }}
      key={category.code}
      className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div className="flex-shrink-0">
        <Image
          className="h-10 w-10 rounded-full"
          width={200}
          height={200}
          alt={category.code}
          src={ENDPOINTS.catalogueCategory + '/' + category.uid + '/image'}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{category.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default CategoryItemComponent
