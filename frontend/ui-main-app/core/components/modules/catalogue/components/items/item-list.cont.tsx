import { CatalogueItem } from 'core/types/responses'

import ItemComponent from './item.comp'
import ItemListHeaderComponent from './item-list-header.comp'

interface Props {
  itemList?: Array<CatalogueItem>
  categoryListLength: number | undefined
}

const ItemListContainer = ({ itemList, categoryListLength }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className=" shadow ring-1 ring-black ring-opacity-5 ">
            <table className="min-w-full divide-y divide-gray-300">
              <ItemListHeaderComponent
                categoryListLength={categoryListLength}
                details={itemList && itemList[0].details}
              />
              {itemList && (
                <tbody className="bg-white">
                  {itemList.map((item, index) => (
                    <ItemComponent key={index} item={item} index={index} categoryListLength={categoryListLength} />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemListContainer
