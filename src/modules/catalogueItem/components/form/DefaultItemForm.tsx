import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import Combobox from '@/components/form/Combobox'
import { Input } from '@/components/form/Input'
import usePermission from '@/hooks/usePermission'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'

import type { CatalogueItem } from '../../types/responses'

const messages = message.cataloguePage.itemList.header

const DefaultItemForm = () => {
  const { register } = useFormContext<CatalogueItem>()
  const { formatMessage: fm } = useIntl()
  const disabled = !usePermission([ROLE.CATALOGUE_EDIT])

  return (
    <div className="px-4 py-5 sm:px-6">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <Input disabled={disabled} name="name" register={register} label={'Name'} rounded={'rounded-md'} />
        <Input
          disabled={disabled}
          name="catalogueNumber"
          register={register}
          label={'Catalogue Number'}
          rounded={'rounded-md'}
        />

        <Combobox
          disabled={disabled}
          name="category"
          customLabel={fm({ id: messages.categoryName })}
          rounded={'rounded-md'}
          codebook={CODEBOOK.CATALOGUE_CATEGORY}
          useFirstRender={false}
        />
        <Combobox
          disabled={disabled}
          name="manufacturer"
          useFirstRender={false}
          customLabel={fm({ id: messages.manufacturer })}
          rounded={'rounded-md'}
          codebook={CODEBOOK.MANUFACTURER}
        />
        <Input
          disabled={disabled}
          name="manufacturerNumber"
          register={register}
          label={fm({ id: messages.manufacturerNumber })}
          rounded={'rounded-md'}
        />
        <Input
          disabled={disabled}
          name="manufacturerUrl"
          register={register}
          label={fm({ id: messages.manufacturerUrl })}
          rounded={'rounded-md'}
        />
      </div>
    </div>
  )
}

export default DefaultItemForm
