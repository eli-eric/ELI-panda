import { Selectable } from '@/components/systems/catalogueItem/CatalogueItemsTable'
import { CatalogueItemsResponse } from '@/types/responses'

import ItemListHeaderComponent from './header/item-list-header.comp'
import ItemListRow from './row/item-list-row.comp'

interface Props {
  catalogueItems?: CatalogueItemsResponse
  categoryListLength?: number
  selectable?: Selectable
}

const CatalogueItemsComponent = ({
  categoryListLength,
  catalogueItems,
  selectable,
}: Props) => {
  return (
    <div className="-my-2  sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className=" shadow ring-1 ring-black ring-opacity-5 ">
          <table className="min-w-full divide-y divide-gray-300">
            <ItemListHeaderComponent
              categoryListLength={categoryListLength}
              isSelectable={selectable?.isSelectable}
              details={catalogueItems?.data[0]?.details}
            />
            <tbody className="bg-white">
              {catalogueItems?.data.map((item, index) => (
                <ItemListRow
                  key={index + item.uid}
                  item={item}
                  index={index}
                  selectable={selectable}
                  categoryListLength={categoryListLength}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CatalogueItemsComponent
