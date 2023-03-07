import React from 'react'
import ItemPropertyTitle from 'src/components/item-property/item-property-title.comp'
import ItemPropertyValue from 'src/components/item-property/item-property-value.comp'
import { message } from 'src/i18n/src/messages'

import DisclosureComponent from '@/components/Disclosure.comp'
import { CatalogueItem } from '@/types/responses'

const messages = message.cataloguePage.itemList.header

interface Props {
  item?: CatalogueItem
  groups: string[]
  description?: string
}

const ItemPropertiesComponent = ({ item, groups }: Props) => (
  <section aria-labelledby="details-heading">
    <div className="px-4 py-5 sm:px-6">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <ItemPropertyTitle title={messages.categoryName}>
          <ItemPropertyValue text={item?.categoryName} />{' '}
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.manufactorer}>
          <ItemPropertyValue text={item?.manufacturer} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.manufacturerNumber}>
          <ItemPropertyValue text={item?.manufacturerNumber} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.manufacturerUrl}>
          <ItemPropertyValue text={item?.manufacturerUrl} link={true} />
        </ItemPropertyTitle>
      </dl>
    </div>
    {item?.details &&
      groups.map(group => (
        <DisclosureComponent key={group} title={group}>
          <div
            key={group}
            className=" prose prose-sm border-t border-gray-200 px-4 py-5 sm:px-6"
          >
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {item.details?.map(detail => {
                if (detail.propertyGroup !== group) {
                  return
                }
                return (
                  <div key={detail.propertyName} className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-400">
                      {detail.propertyName}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {(detail.value === '' || detail.value === null
                        ? 'N/A'
                        : detail.value) +
                        (detail.propertyUnit !== null
                          ? ` ${detail.propertyUnit}`
                          : '')}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </DisclosureComponent>
      ))}
  </section>
)

export default ItemPropertiesComponent
