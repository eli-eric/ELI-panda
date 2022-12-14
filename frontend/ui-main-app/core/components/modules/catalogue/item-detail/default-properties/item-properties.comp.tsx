import ItemProperty from 'core/components/modules/shared/item-property.comp'
import { message } from 'core/i18n/src/messages'
import { CatalogueItem } from 'core/types/responses'
import React from 'react'

import DisclosureComponent from '../disclosure/disclosure.comp'

const messages = message.cataloguePage.itemList.header

interface Props {
  item: CatalogueItem
  groups: string[]
}

const ItemPropertiesComponent = ({ item, groups }: Props) => {
  return (
    <section aria-labelledby="details-heading" className="mt-12">
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <ItemProperty text={item.categoryName} title={messages.categoryName} />
          <ItemProperty text={item.manufacturer} title={messages.manufactorer} />
          <ItemProperty text={item.manufacturerNumber} title={messages.manufacturerNumber} />
          <ItemProperty text={item.manufacturerUrl} title={messages.manufacturerUrl} link={true} />
        </dl>
      </div>
      <DisclosureComponent item={item} groups={groups} />
    </section>
  )
}

export default ItemPropertiesComponent
