import { message } from 'core/i18n/src/messages'
import { CatalogueItem } from 'core/types/responses'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import DisclosureComponent from '../disclosure/disclosure.comp'

const messages = message.cataloguePage.itemList.header

interface ItemPropertyProps {
  title: string
  text: string
  link?: boolean
}

const ItemProperty = ({ title, text, link }: ItemPropertyProps) => {
  return (
    <div className="sm:col-span-1">
      <dt className="text-sm font-medium text-gray-500">
        <FormattedMessage id={title} />
      </dt>
      <dd className={`mt-1 text-sm ${link ? 'text-blue-500' : 'text-gray-900'}`}>
        {link ? (
          <a href={text} target="_blank" rel="noreferrer">
            {text}
          </a>
        ) : (
          text
        )}
      </dd>
    </div>
  )
}

interface Props {
  item: CatalogueItem
  groups: string[]
}

const ItemPropertiesComponent = ({ item, groups }: Props) => {
  return (
    <section aria-labelledby="details-heading" className="mt-12">
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <ItemProperty text={item.uid} title={messages.uid} />
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
