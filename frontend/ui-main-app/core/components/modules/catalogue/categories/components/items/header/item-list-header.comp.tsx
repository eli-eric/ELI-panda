import { CatalogueItemDetail } from 'pages/api/mock-server/catalogue/catalogue-mock-data'

import ItemListColumnHeaderComponent from './item-list-column-header.comp'

interface Props {
  categoryListLength: number | undefined
  details?: CatalogueItemDetail[]
}

const ItemListHeaderComponent = ({ categoryListLength, details }: Props) => {
  return (
    <thead className="bg-gray-50 ">
      <tr>
        <ItemListColumnHeaderComponent title="Name" />
        <ItemListColumnHeaderComponent title="Description" />
        {categoryListLength === 0 &&
          details &&
          details.length !== 0 &&
          details.map(item => <ItemListColumnHeaderComponent key={item.propertyName} title={item.propertyName} />)}
        {categoryListLength !== 0 && <ItemListColumnHeaderComponent title="Category Name" />}
        <ItemListColumnHeaderComponent title="Manufacturer" />
        <ItemListColumnHeaderComponent title="Manufacturer Number" />
        <ItemListColumnHeaderComponent title="Manufacturer Url" />
      </tr>
    </thead>
  )
}

export default ItemListHeaderComponent
