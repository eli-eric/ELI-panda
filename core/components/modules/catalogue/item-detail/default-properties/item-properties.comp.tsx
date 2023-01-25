import ItemPropertyTitle from 'core/components/modules/shared/item-property/item-property-title.comp'
import ItemPropertyValue from 'core/components/modules/shared/item-property/item-property-value.comp'
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
          <ItemPropertyTitle title={messages.categoryName}>
            <ItemPropertyValue text={item.categoryName} />{' '}
          </ItemPropertyTitle>
          <ItemPropertyTitle title={messages.manufactorer}>
            <ItemPropertyValue text={item.manufacturer} />
          </ItemPropertyTitle>
          <ItemPropertyTitle title={messages.manufacturerNumber}>
            <ItemPropertyValue text={item.manufacturerNumber} />
          </ItemPropertyTitle>
          <ItemPropertyTitle title={messages.manufacturerUrl}>
            <ItemPropertyValue text={item.manufacturerUrl} link={true} />
          </ItemPropertyTitle>
        </dl>
      </div>
      <DisclosureComponent item={item} groups={groups} />
    </section>
  )
}

export default ItemPropertiesComponent
