import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import TooltipComponent from '@/components/tooltip.comp'
import { useEndpoint } from '@/hooks/useEndpoint'
import { PATH } from '@/types/constants/paths'
import { CatalogueItem } from '@/types/responses'
import { Selectable } from '@/types/system'

interface Props {
  item: CatalogueItem
  index: number
  categoryListLength: number | undefined
  selectable?: Selectable
}

const ItemListRow = ({
  item,
  index,
  categoryListLength,
  selectable,
}: Props) => {
  const router = useRouter()
  const { catalogueItemImage } = useEndpoint({ uid: item.uid })
  const categoryPath = PATH.CATALOGUE + '/' + item.categoryPath

  const Name = () => (
    <div className="flex items-center">
      <div className="h-10 w-10 flex-shrink-0">
        <Image
          className="h-10 w-10 rounded-full"
          alt={item.name}
          src={catalogueItemImage}
          width={200}
          height={200}
        />
      </div>
      <div className="ml-4">{item.name}</div>
    </div>
  )

  return (
    <tr
      className={
        (index % 2 === 0 ? undefined : 'bg-gray-100') +
        ` hover:bg-primary-200 ${
          selectable?.selectedItem === item.uid ? 'bg-primary-200' : ''
        }`
      }
    >
      {selectable && (
        <td className="text-sm  sm:pl-6 text-gray-500">
          <div className="ml-3 flex h-5 items-center">
            <input
              id={`side-${item.uid}`}
              name="itemUid"
              type="radio"
              onClick={() => {
                selectable.setItem({ name: item.name, uid: item.uid })
              }}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
            />
          </div>
        </td>
      )}
      <td className="whitespace-nowrap text-sm sm:pl-6 text-blue-500">
        <Link
          href={{ pathname: '/catalogue/item/' + item.uid }}
          passHref
          legacyBehavior={selectable?.isSelectable}
        >
          {selectable ? (
            <a target="_blank">
              <Name />
            </a>
          ) : (
            <Name />
          )}
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
        item.details.map((item, index) => (
          <td
            key={item.propertyName + index}
            className="whitespace-nowrap text-sm  sm:pl-6 text-gray-500"
          >
            {item.value}
          </td>
        ))}
      {categoryListLength !== 0 && (
        <td className="whitespace-nowrap text-sm  sm:pl-6 text-blue-500">
          <Link
            href={{ pathname: categoryPath, query: { ...router.query } }}
            passHref
            legacyBehavior={selectable?.isSelectable}
          >
            {selectable ? (
              <a target="_blank">{item.categoryName} </a>
            ) : (
              item.categoryName
            )}
          </Link>
        </td>
      )}
      <td className="whitespace-nowrap text-sm  sm:pl-6 text-gray-500">
        {item.manufacturer}
      </td>
      <td className="whitespace-nowrap text-sm  sm:pl-6 text-gray-500">
        {item.manufacturerNumber}
      </td>
      <td className="whitespace-nowrap text-sm  sm:pl-6 text-blue-500">
        <a
          target="_blank"
          href={item.manufacturerUrl}
          rel="noopener noreferrer"
        >
          {item.manufacturerUrl}
        </a>
      </td>
    </tr>
  )
}

export default ItemListRow
