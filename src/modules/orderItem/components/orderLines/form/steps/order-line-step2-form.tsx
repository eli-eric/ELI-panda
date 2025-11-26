import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/form/inputs'
import { InputAmountCurrency } from '@/components/form/inputs/components/InputAmountCurrency.comp'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'

import useOrderLineFormFields from '../OrderLineForm.fields'

export const OrderLineStep2Form = () => {
  const { watch } = useFormContext<OrderLineFormType>()

  // Read from form state to determine if item is from catalogue
  const selectedCatalogueItem = watch('_selectedCatalogueItem')
  const isFromCatalogue = Boolean(selectedCatalogueItem)

  const formFields = useOrderLineFormFields(!isFromCatalogue)

  return (
    <Grid className="pt-2">
      <Col md={6} lg={6}>
        <Input {...formFields.name} disabled={true} />
      </Col>
      <Col md={6} lg={6}>
        <Input {...formFields.catalogueNumber} disabled={true} />
      </Col>
      <Col lg={4} md={6}>
        <InputAmountCurrency
          amountName={formFields.price.name}
          currencyName={formFields.currency.name}
          label={formFields.price.label}
          required={formFields.price.required}
        />
      </Col>
      <Col lg={4} md={6}>
        <Listbox {...formFields.itemUsage} position="top" />
      </Col>
      <Col md={6} lg={4}>
        <Input {...formFields.quantity} />
      </Col>
      <Col md={12} lg={12}>
        <Input {...formFields.serialNumbers} />
      </Col>
    </Grid>
  )
}
