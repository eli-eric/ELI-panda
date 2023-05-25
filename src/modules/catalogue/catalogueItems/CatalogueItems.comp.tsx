import type { Selectable } from '@/modules/systems/types'
import type { CatalogueItemsResponse } from '@/types/responses'

import ItemListHeaderComponent from './header/item-list-header.comp'
import ItemListRow from './row/item-list-row.comp'

interface Props {
  selectable?: Selectable
  catalogueItems?: CatalogueItemsResponse
}

const CatalogueItemsTable = ({ selectable, catalogueItems }: Props) => (
  <div className="-my-2  sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
      <div className=" shadow ring-1 ring-black ring-opacity-5 ">
        <table className="min-w-full divide-y divide-gray-300">
          <ItemListHeaderComponent isSelectable={selectable?.isSelectable} details={catalogueItems?.data[0]?.details} />
          <tbody className="bg-white">
            {catalogueItems?.data.map((item, index) => (
              <ItemListRow key={index + item.uid} item={item} index={index} selectable={selectable} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

export default CatalogueItemsTable
