import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'
import { CatalogueItemDetail } from 'src/pages/api/mock-server/catalogue/catalogue-mock-data'

import ItemListColumnTitleComponent from './item-list-column-title.comp'

const messages = message.cataloguePage.itemList.header
interface Props {
  categoryListLength: number | undefined
  details?: CatalogueItemDetail[]
}

const ItemListHeaderComponent = ({ categoryListLength, details }: Props) => {
  const intl = useIntl()
  return (
    <thead className="bg-gray-50">
      <tr>
        <ItemListColumnTitleComponent
          title={intl.formatMessage({ id: messages.name })}
        />
        <ItemListColumnTitleComponent
          title={intl.formatMessage({ id: messages.description })}
        />
        {categoryListLength === 0 &&
          details &&
          details.length !== 0 &&
          details.map((item, index) => (
            <ItemListColumnTitleComponent
              key={item.propertyName + index}
              title={item.propertyName}
            />
          ))}
        {categoryListLength !== 0 && (
          <ItemListColumnTitleComponent
            title={intl.formatMessage({ id: messages.categoryName })}
          />
        )}
        <ItemListColumnTitleComponent
          title={intl.formatMessage({ id: messages.manufactorer })}
        />
        <ItemListColumnTitleComponent
          title={intl.formatMessage({ id: messages.manufacturerNumber })}
        />
        <ItemListColumnTitleComponent
          title={intl.formatMessage({ id: messages.manufacturerUrl })}
        />
      </tr>
    </thead>
  )
}

export default ItemListHeaderComponent
