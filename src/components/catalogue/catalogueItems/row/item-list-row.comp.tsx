import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import TooltipComponent from '@/components/ui/tooltip.comp'
import { ENDPOINTS } from '@/types/constants/endpoints'
import { PATH } from '@/types/constants/paths'
import { CatalogueItem } from '@/types/responses'

interface Props {
  item: CatalogueItem
  index: number
  categoryListLength: number | undefined
}

const ItemListRow = ({ item, index, categoryListLength }: Props) => {
  const router = useRouter()
  const { search } = router.query
  const categoryPath = PATH.CATALOGUE + '/' + item.categoryPath
  const path = ENDPOINTS.catalogueItem + '/' + item.uid + '/image'

  return (
    <tr className={(index % 2 === 0 ? undefined : 'bg-gray-100') + ' hover:bg-primary-200'}>
      <td className="whitespace-nowrap text-sm sm:pl-6 text-blue-500">
        <Link href={'/catalogue/item/' + item.uid}>
          <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
              <Image className="h-10 w-10 rounded-full" alt={item.name} src={path} width={200} height={200} />
            </div>
            <div className="ml-4">{item.name}</div>
          </div>
        </Link>
      </td>
      <td className="text-sm  sm:pl-6 text-gray-500">
        {item.description && (
          <TooltipComponent text={item.description}>
            <InformationCircleIcon className="h-8 w-8 flex-shrink-0" />
          </TooltipComponent>
        )}
      </td>
      {categoryListLength === 0 &&
        item.details &&
        item.details.map(item => (
          <td key={item.propertyName} className="whitespace-nowrap text-sm  sm:pl-6 text-gray-500">
            {item.value}
          </td>
        ))}
      {categoryListLength !== 0 && (
        <td className="whitespace-nowrap text-sm  sm:pl-6 text-blue-500">
          <Link href={{ pathname: categoryPath, query: search && { search: search } }}>{item.categoryName}</Link>
        </td>
      )}
      <td className="whitespace-nowrap text-sm  sm:pl-6 text-gray-500">{item.manufacturer}</td>
      <td className="whitespace-nowrap text-sm  sm:pl-6 text-gray-500">{item.manufacturerNumber}</td>
      <td className="whitespace-nowrap text-sm  sm:pl-6 text-blue-500">
        <a target="_blank" href={item.manufacturerUrl} rel="noopener noreferrer">
          {item.manufacturerUrl}
        </a>
      </td>
    </tr>
  )
}

export default ItemListRow
