import { Input, TextArea } from '@/components/form/inputs'
import { InputAmountCurrency } from '@/components/form/inputs/components/InputAmountCurrency.comp'
import Listbox from '@/components/form/Listbox'
import { useToggle } from '@/components/form/Switch'
import { Col, Grid } from '@/components/grid/Grid'
import Divider from '@/components/layout/Divider'
import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import { SelectSystemComboBox } from '@/modules/shared/form/systemSelect/SelectSystem.combo'
import type { CatalogueItem } from '@/types/responses/catalogue'

import useOrderLineFormFields from './OrderLineForm.fields'

const messages = message.ordersPage.orderLines

interface OrderLineFormComponentProps {
  catalogueItem?: CatalogueItem
  orderLine?: OrderLineFormType
}

export const OrderLineFormComponent = ({
  orderLine
}: OrderLineFormComponentProps) => {
  const { Toggle, enabled, toggle } = useToggle(false)
  const formFields = useOrderLineFormFields(enabled)

  return (
    <Grid>
      <Col sm="full">
        <Divider text={messages.formHeadings.itemInfo}>
          {!orderLine?.uid && (
            <Col sm={1}>
              <Toggle enabled={enabled} onChange={toggle} />
            </Col>
          )}
        </Divider>
      </Col>

      <Col md={6} lg={6}>
        <Input {...formFields.name} />
      </Col>
      <Col md={6} lg={6}>
        <Input {...formFields.catalogueNumber} />
      </Col>
      <Col lg={!orderLine?.uuid || orderLine?.uid ? 4 : 6} md={6}>
        <InputAmountCurrency
          amountName={formFields.price.name}
          currencyName={formFields.currency.name}
          label={formFields.price.label}
          required={formFields.price.required}
        />
      </Col>
      <Col lg={!orderLine?.uuid || orderLine?.uid ? 4 : 6} md={6}>
        <Listbox {...formFields.itemUsage} position="top" />
      </Col>
      {!orderLine?.uuid && (
        <Col md={6} lg={4}>
          <Input {...formFields.quantity} />
        </Col>
      )}
      {!orderLine?.uuid && (
        <Col md={12} lg={12}>
          <Input {...formFields.serialNumbers} />
        </Col>
      )}
      {orderLine?.uid && (
        <Col md={6} lg={4}>
          <Input {...formFields.serialNumber} />
        </Col>
      )}
      <Col sm="full">
        <Divider text={messages.formHeadings.systemInfo} />
      </Col>
      <Col md={orderLine?.uid ? 6 : 12} lg={orderLine?.uid ? 6 : 12}>
        <div className="flex flex-row w-full">
          <div className="flex-1 w-full">
            <SelectSystemComboBox
              selectSystemField={{
                ...formFields.system,
                disabled: !!orderLine?.uid
              }}
            />
          </div>
        </div>
      </Col>
      {orderLine?.uid && (
        <Col md={6} lg={6}>
          <SelectLocationCombo locationField={formFields.location} />
        </Col>
      )}
      {orderLine?.uid && (
        <Col md={6} lg={12}>
          <TextArea {...formFields.notes} />
        </Col>
      )}
    </Grid>
  )
}
