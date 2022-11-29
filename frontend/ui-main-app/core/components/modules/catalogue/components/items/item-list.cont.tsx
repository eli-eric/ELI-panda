import { CatalogueItem } from 'core/types/responses'

import ItemComponent from './item.comp'
import ItemListHeaderComponent from './item-list-header.comp'

interface Props {
  itemList: Array<CatalogueItem>
}

const ItemListContainer = ({ itemList }: Props) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <ItemListHeaderComponent />
              <tbody className="bg-white">
                {itemList.map((item, index) => (
                  <ItemComponent key={index} item={item} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemListContainer
