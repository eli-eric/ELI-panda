import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import DisclosureComponent from '@/components/Disclosure.comp'
import { Input } from '@/components/form/Input'

import type { CatalogueItem } from '../types/responses'

const messages = message.cataloguePage.itemList.header

interface Props {
  item?: CatalogueItem
  groups?: string[]
}

const ItemPropertiesComponent = ({ item, groups }: Props) => {
  const { register } = useFormContext<CatalogueItem>()
  const { formatMessage: fm } = useIntl()

  return (
    <section aria-labelledby="details-heading">
      <div className="px-4 py-5 sm:px-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <Input
            name="categoryName"
            register={register}
            label={fm({ id: messages.categoryName })}
            rounded={'rounded-md'}
          />
          <Input
            name="manufacturer"
            register={register}
            label={fm({ id: messages.manufacturer })}
            rounded={'rounded-md'}
          />
          <Input
            name="manufacturerNumber"
            register={register}
            label={fm({ id: messages.manufacturerNumber })}
            rounded={'rounded-md'}
          />
          <Input
            name="manufacturerUrl"
            register={register}
            label={fm({ id: messages.manufacturerUrl })}
            rounded={'rounded-md'}
          />
        </div>
      </div>
      {item?.details &&
        groups?.map(group => (
          <DisclosureComponent key={group} title={group}>
            <div className="px-4 py-5 sm:px-6">
              <dl key={group} className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                {item.details?.map(
                  detail =>
                    detail.propertyGroup === group && (
                      <Input
                        key={detail.property.uid}
                        name={detail.property.name.toLowerCase().split(' ').join('')}
                        register={register}
                        label={detail.property.name}
                        defaultValue={detail.value || ''}
                        rounded={'rounded-md'}
                      />
                    )
                )}
              </dl>
            </div>
          </DisclosureComponent>
        ))}
    </section>
  )
}

export default ItemPropertiesComponent
