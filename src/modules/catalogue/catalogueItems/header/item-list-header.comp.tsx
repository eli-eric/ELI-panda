import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'
import type { CatalogueItemDetail } from 'src/pages/api/mock-server/catalogue/catalogue-mock-data'

import ItemListColumnTitleComponent from '../../../../components/table/item-list-column-title.comp'
import useCategoryList from '../../hooks/useCategoryList'

const messages = message.cataloguePage.itemList.header
interface Props {
  details?: CatalogueItemDetail[]
  isSelectable?: boolean
}

const ItemListHeaderComponent = ({ details, isSelectable }: Props) => {
  const { categoryList } = useCategoryList()

  const intl = useIntl()
  return (
    <thead className="bg-gray-50">
      <tr>
        {isSelectable && <ItemListColumnTitleComponent title={intl.formatMessage({ id: messages.select })} />}
        <ItemListColumnTitleComponent title={intl.formatMessage({ id: messages.name })} />
        <ItemListColumnTitleComponent title={intl.formatMessage({ id: messages.description })} />
        {categoryList.length === 0 &&
          details &&
          details.length !== 0 &&
          details.map((item, index) => (
            <ItemListColumnTitleComponent key={item.propertyName + index} title={item.propertyName} />
          ))}
        {categoryList.length !== 0 && (
          <ItemListColumnTitleComponent title={intl.formatMessage({ id: messages.categoryName })} />
        )}
        <ItemListColumnTitleComponent title={intl.formatMessage({ id: messages.manufactorer })} />
        <ItemListColumnTitleComponent title={intl.formatMessage({ id: messages.manufacturerNumber })} />
        <ItemListColumnTitleComponent title={intl.formatMessage({ id: messages.manufacturerUrl })} />
      </tr>
    </thead>
  )
}

export default ItemListHeaderComponent
