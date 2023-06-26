import React from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import Combobox from '@/components/form/Combobox'
import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input } from '@/components/form/Input'
import { Col, Grid } from '@/components/grid/Grid'
import usePermission from '@/hooks/usePermission'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'

const messages = message.cataloguePage.itemDetail.form

const DefaultItemForm = () => {
  const { formatMessage: fm } = useIntl()
  const disabled = !usePermission([ROLE.CATALOGUE_EDIT])

  return (
    <Grid className="px-4 py-5 sm:px-6">
      <Col lg={6}>
        <Input disabled={disabled} name="name" label={fm({ id: messages.name.label })} rounded={'rounded-md'} />
      </Col>
      <Col lg={6}>
        <Input
          disabled={disabled}
          name="catalogueNumber"
          label={fm({ id: messages.catalogueNumber.label })}
          rounded={'rounded-md'}
        />
      </Col>
      <Col lg={12}>
        <ComboboxTree
          name="category"
          label={messages.category.label}
          rounded={'rounded-md'}
          codebook={CODEBOOK.CATALOGUE_CATEGORY}
          disabled={disabled}
          useFirstRender={false}
        />
      </Col>
      <Col lg={6}>
        <Combobox
          name="manufacturer"
          label={messages.manufacturer.label}
          rounded={'rounded-md'}
          codebook={CODEBOOK.SUPPLIER}
          disabled={disabled}
          useFirstRender={false}
        />
      </Col>

      <Col lg={6}>
        <Input
          disabled={disabled}
          name="manufacturerUrl"
          label={fm({ id: messages.manuFacturerUrl.label })}
          rounded={'rounded-md'}
        />
      </Col>
    </Grid>
  )
}

export default DefaultItemForm
