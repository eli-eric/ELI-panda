import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import ComboboxComponent from '@/components/form/Combobox'
import { Input, InputAmount } from '@/components/form/Input'
import ListBox from '@/components/form/Listbox'
import { useToggle } from '@/components/form/Switch'
import { Col, Grid } from '@/components/grid/Grid'
import Divider from '@/components/layout/Divider'
import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types'
import type { CatalogueItem } from '@/types/responses'

import useOrderLineFormFields from './OrderLineForm.fields'

const messages = message.ordersPage.orderLines.formHeadings

interface Props {
  orderLine?: OrderLineFormType
  catalogueItem?: CatalogueItem
}

const OrderLineFormComponent = ({ catalogueItem, orderLine }: Props) => {
  // const [enabled, setEnabled] = useState(false)
  const { enabled, toggle, Toggle } = useToggle(false)
  const [locationEnable, setLocationEnable] = useState(false)
  const formFields = useOrderLineFormFields(enabled)
  const { setValue, watch } = useFormContext<OrderLineFormType>()
  const system = watch('system')

  useEffect(() => {
    if (!enabled) {
      setValue('name', catalogueItem?.name || orderLine?.name || '')
      setValue('catalogueNumber', catalogueItem?.catalogueNumber || orderLine?.catalogueNumber || '')
      setValue('catalogueUid', catalogueItem?.uid || orderLine?.catalogueUid || '')
    }
  }, [catalogueItem, setValue, orderLine, enabled])

  useEffect(() => {
    if (enabled) {
      setValue('name', '')
      setValue('catalogueNumber', '')
      setValue('catalogueUid', '')
    }
  }, [enabled, setValue])

  useEffect(() => {
    if (system) {
      setLocationEnable(false)
      setValue('location', undefined)
    } else {
      setLocationEnable(true)
    }
  }, [system, setValue])

  return (
    <Grid>
      <Col sm="full">
        <Divider text={messages.itemInfo}>
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
      <Col lg={!orderLine?.id || orderLine?.uid ? 4 : 6} md={6}>
        <InputAmount {...formFields.price} />
      </Col>
      <Col lg={!orderLine?.id || orderLine?.uid ? 4 : 6} md={6}>
        <ListBox {...formFields.itemUsage} position="top" />
      </Col>
      {!orderLine?.id && (
        <Col md={6} lg={4}>
          <Input {...formFields.quantity} defaultValue={1} />
        </Col>
      )}
      {orderLine?.uid && (
        <Col md={6} lg={4}>
          <Input {...formFields.serialNumber} />
        </Col>
      )}
      <Col sm="full">
        <Divider text={messages.systemInfo} />
      </Col>
      <Col md={orderLine?.uid ? 6 : 12} lg={orderLine?.uid ? 6 : 12}>
        <ComboboxComponent {...formFields.system} isObject={true} limit={50} position="top" />
      </Col>
      {orderLine?.uid && (
        <Col md={6} lg={6}>
          <ComboboxComponent
            {...formFields.location}
            isObject
            position="top"
            limit={50}
            disabled={locationEnable}
            className="col-span-3 md:col-span-6"
          />
        </Col>
      )}
    </Grid>
  )
}

export default OrderLineFormComponent
