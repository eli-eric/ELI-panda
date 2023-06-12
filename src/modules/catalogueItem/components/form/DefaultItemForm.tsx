import React from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import Combobox from '@/components/form/Combobox'
import { Input } from '@/components/form/Input'
import usePermission from '@/hooks/usePermission'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'

const messages = message.cataloguePage.itemDetail.form

const DefaultItemForm = () => {
  const { formatMessage: fm } = useIntl()
  const disabled = !usePermission([ROLE.CATALOGUE_EDIT])

  return (
    <div className="px-4 py-5 sm:px-6">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <Input disabled={disabled} name="name" label={fm({ id: messages.name.label })} rounded={'rounded-md'} />
        <Input
          disabled={disabled}
          name="catalogueNumber"
          label={fm({ id: messages.catalogueNumber.label })}
          rounded={'rounded-md'}
        />

        <Combobox
          name="category"
          label={messages.category.label}
          rounded={'rounded-md'}
          codebook={CODEBOOK.CATALOGUE_CATEGORY}
          disabled={disabled}
          useFirstRender={false}
        />
        <Combobox
          name="manufacturer"
          label={messages.manufacturer.label}
          rounded={'rounded-md'}
          codebook={CODEBOOK.MANUFACTURER}
          disabled={disabled}
          useFirstRender={false}
        />
        <Input
          disabled={disabled}
          name="manufacturerNumber"
          label={fm({ id: messages.manufacturerNumber.label })}
          rounded={'rounded-md'}
        />
        <Input
          disabled={disabled}
          name="manufacturerUrl"
          label={fm({ id: messages.manuFacturerUrl.label })}
          rounded={'rounded-md'}
        />
      </div>
    </div>
  )
}

export default DefaultItemForm
