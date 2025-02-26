import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { TableEditButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import {
  Input,
  InputAmount,
  InputCurrency,
  TextArea
} from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLine } from '@/modules/orderItem/types/form'
import type { ModalButtons } from '@/types/form'

import { DetailPropertiesList } from '../form/details/detail-properties.list'
import { useServiceLineFields } from '../form/hooks/useServiceLineFields'

type Props = {
  serviceLine: ServiceLine
}

export const ServiceLineEdit = ({ serviceLine }: Props) => {
  const [openEditForm, setOpenEditForm] = useState(false)
  const fields = useServiceLineFields()
  const { setServiceLine } = useServiceLine()

  const formMethods = useForm({
    defaultValues: {
      uuid: serviceLine.uuid,
      uid: serviceLine.uid,
      name: serviceLine.name,
      price: serviceLine.price,
      currency: serviceLine.currency,
      serviceType: serviceLine.serviceType,
      notes: serviceLine.notes,
      item: serviceLine.item,
      isDelivered: serviceLine.isDelivered,
      details: serviceLine.details
    }
  })

  const details = formMethods.watch('details')

  const submit = (data: ServiceLine) => {
    console.log('data', data)
    setServiceLine(data)
    setOpenEditForm(false)
  }

  const buttons: ModalButtons = {
    goNext: {
      onClick: () => {
        formMethods.handleSubmit(submit)()
      },
      text: 'Save'
    },
    goBack: {
      onClick: () => {
        setOpenEditForm(false)
      },
      text: 'Cancel'
    }
  }

  return (
    <>
      <TableEditButton
        onClick={() => {
          setOpenEditForm(true)
        }}
      />
      <ModalComponent
        buttons={buttons}
        open={openEditForm}
        setOpen={setOpenEditForm}
      >
        <Form formMethods={formMethods}>
          <>
            <Grid>
              <Col sm={12}>
                <Input {...fields.name} />
              </Col>
              <Col md={8} sm={12}>
                <Listbox {...fields.serviceType} disabled />
              </Col>
              <Col md={4} sm={12}>
                <InputAmount {...fields.price}>
                  <InputCurrency {...fields.currency} />
                </InputAmount>
              </Col>
              <Col sm={12}>
                <TextArea {...fields.notes} />
              </Col>
            </Grid>
            <DetailPropertiesList
              details={{
                details,
                groups: details
                  ?.map(detail => detail.propertyGroup)
                  .filter((value, index, self) => self.indexOf(value) === index)
              }}
              disabled={true}
            />
          </>
        </Form>
      </ModalComponent>
    </>
  )
}
