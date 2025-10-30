import { Input } from '@/components/form/inputs'
import { InputAmountCurrency } from '@/components/form/inputs/components/InputAmountCurrency.comp'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Divider from '@/components/layout/Divider'
import { message } from '@/i18n/src/messages'
import { SelectSystemComboBox } from '@/modules/shared/form/systemSelect/SelectSystem.combo'

import useOrderLineFormFields from './OrderLineForm.fields'

const messages = message.ordersPage.orderLines

interface OrderLineFormComponentProps {
  isFromCatalogue?: boolean
}

export const OrderLineFormComponent = ({
  isFromCatalogue = false
}: OrderLineFormComponentProps) => {
  const formFields = useOrderLineFormFields(!isFromCatalogue)

  return (
    <Grid>
      <Col md={6} lg={6}>
        <Input {...formFields.name} disabled={isFromCatalogue} />
      </Col>
      <Col md={6} lg={6}>
        <Input {...formFields.catalogueNumber} disabled={isFromCatalogue} />
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
      <Col sm="full">
        <Divider text={messages.formHeadings.systemInfo} />
      </Col>
      <Col md={12} lg={12}>
        <SelectSystemComboBox selectSystemField={formFields.system} />
      </Col>
    </Grid>
  )
}
