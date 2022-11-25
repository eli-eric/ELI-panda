import { CatalogueItem } from 'core/types/responses'

interface Props {
  item: CatalogueItem
  index: number
}

const ItemComponent = ({ item, index }: Props) => {
  return (
    <tr className={(index % 2 === 0 ? undefined : 'bg-gray-100') + ' ' + 'hover:bg-orange-200'}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            {/* <Image
              className="h-10 w-10 rounded-full"
              alt={item.categoryName}
              src={BASE_URL + `${ENDPOINTS.catalogueCategory}/` + item.uid + '/image'}
              width={200}
              height={200}
            /> */}
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{item.name}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.uid}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.categoryName}</td>

      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.manufacturer}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {item.manufacturerNumber}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-blue-500">
        <a target="_blank" href={item.manufacturerUrl} rel="noopener noreferrer">
          Link
        </a>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-none">
        {item.description}
      </td>
    </tr>
  )
}

export default ItemComponent
