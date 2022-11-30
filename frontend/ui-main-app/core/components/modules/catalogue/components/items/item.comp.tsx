import { InformationCircleIcon } from '@heroicons/react/24/outline'
import TooltipComponent from 'core/components/ui/tooltip.comp'
import { BASE_URL } from 'core/types/constants/common'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { PATHS } from 'core/types/constants/paths'
import { CatalogueItem } from 'core/types/responses'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  item: CatalogueItem
  index: number
  categoryListLength: number | undefined
}

const ItemComponent = ({ item, index, categoryListLength }: Props) => {
  const router = useRouter()
  const { search } = router.query
  const path = PATHS.CATALOGUE + '/' + item.categoryPath
  return (
    <tr className={(index % 2 === 0 ? undefined : 'bg-gray-100') + ' ' + 'hover:bg-orange-200'}>
      <td className="whitespace-nowrap py-4 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <Image
              className="h-10 w-10 rounded-full"
              alt={item.name}
              src={BASE_URL + `${ENDPOINTS.catalogueItem}/` + item.uid + '/image'}
              width={200}
              height={200}
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{item.name}</div>
          </div>
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-gray-500 max-w-none">
        {item.description && (
          <TooltipComponent text={item.description}>
            <InformationCircleIcon className="h-8 w-8 flex-shrink-0" />
          </TooltipComponent>
        )}
      </td>
      {categoryListLength === 0 &&
        item.details &&
        item.details.map(item => (
          <td key={item.propertyName} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {item.value}
          </td>
        ))}
      {categoryListLength !== 0 && (
        <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-500">
          <Link href={{ pathname: path, query: search && { search: search } }}>{item.categoryName}</Link>
        </td>
      )}
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.manufacturer}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.manufacturerNumber}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-500">
        <a target="_blank" href={item.manufacturerUrl} rel="noopener noreferrer">
          Link
        </a>
      </td>
    </tr>
  )
}

export default ItemComponent
