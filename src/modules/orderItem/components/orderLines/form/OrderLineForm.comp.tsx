import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import Combobox from '@/components/form/Combobox'
import { Input, InputAmount, InputCurrency, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { useToggle } from '@/components/form/Switch'
import { Col, Grid } from '@/components/grid/Grid'
import Divider from '@/components/layout/Divider'
import type { CodebookFilter } from '@/hooks/fetch/useCodebook'
import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { SelectSystemComboBox } from '@/modules/shared/form/systemSelect/SelectSystem.combo'
import type { CatalogueItem } from '@/types/responses'

import useOrderLineFormFields from './OrderLineForm.fields'

const messages = message.ordersPage.orderLines

interface Props {
  orderLine?: OrderLineFormType
  catalogueItem?: CatalogueItem
}

const OrderLineFormComponent = ({ catalogueItem, orderLine }: Props) => {
  const { enabled, toggle, Toggle } = useToggle(false)
  const [locationEnable, setLocationEnable] = useState(false)
  const formFields = useOrderLineFormFields(enabled)
  const { setValue, watch, unregister } = useFormContext<OrderLineFormType>()
  const system = watch('system')
  const technologicalUnitToogle = useToggle(true)
  const { Toggle: TechUnitToogle, enabled: techUnitEnabled } = technologicalUnitToogle
  const [techUnitFilter, setTechUnitFilter] = useState<CodebookFilter[] | undefined>(undefined)

  const techUnitToogle = enable => {
    technologicalUnitToogle.toggle()
    setTechUnitFilter([{ key: 'technologicalUnits', value: enable }])
    toast.success('Technological unit filter is' + ' ' + enable)
  }

  // set default value
  useEffect(() => {
    if (!enabled) {
      setValue('name', catalogueItem?.name || orderLine?.name || '')
      setValue('catalogueNumber', catalogueItem?.catalogueNumber || orderLine?.catalogueNumber || '')
      setValue('catalogueUid', catalogueItem?.uid || orderLine?.catalogueUid || '')
    }
  }, [catalogueItem, orderLine, enabled, setValue])

  // clear values on toggle
  useEffect(() => {
    if (enabled) {
      setValue('name', '')
      setValue('catalogueNumber', '')
      setValue('catalogueUid', '')
    }
  }, [enabled, setValue])

  // set location enable on system change
  useEffect(() => {
    if (system) {
      setLocationEnable(false)
      unregister('location')
    } else {
      setLocationEnable(true)
    }
  }, [system, unregister])

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
        <InputAmount {...formFields.price}>
          <InputCurrency {...formFields.currency} />
        </InputAmount>
      </Col>
      <Col lg={!orderLine?.uuid || orderLine?.uid ? 4 : 6} md={6}>
        <Listbox {...formFields.itemUsage} position="top" />
      </Col>
      {!orderLine?.uuid && (
        <Col md={6} lg={4}>
          <Input {...formFields.quantity} />
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
          {/*  <Tooltip content="Show only technological units">
            <div className="self-end mr-2 mb-1 flex-none">
              <TechUnitToogle onChange={techUnitToogle} enabled={techUnitEnabled} />
            </div>
          </Tooltip> */}
          <div className="flex-1 w-full">
            <SelectSystemComboBox selectSystemField={formFields.system} />
          </div>
        </div>
      </Col>
      {orderLine?.uid && (
        <Col md={6} lg={6}>
          <Combobox {...formFields.location} position="top" limit={50} disabled={locationEnable} />
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

export default OrderLineFormComponent
