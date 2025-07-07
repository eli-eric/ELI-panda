import { sortBy } from 'lodash'
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
import { message } from '@/i18n/src/messages'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLine } from '@/modules/orderItem/types/form'
import type { ModalButtons } from '@/types/form'

import { DetailPropertiesList } from '../form/details/detail-properties.list'
import { useServiceLineFields } from '../form/hooks/useServiceLineFields'

const messages = message.common.buttons

type Props = {
  serviceLine: ServiceLine
}

export const ServiceLineEdit = ({ serviceLine }: Props) => {
  const [openEditForm, setOpenEditForm] = useState(false)
  const fields = useServiceLineFields()
  const { setServiceLine } = useServiceLine()

  const formMethods = useForm<ServiceLine>()

  const submit = (data: ServiceLine) => {
    setServiceLine({
      ...data,
      details: Array.isArray(data.details) ? data.details : []
    })
    setOpenEditForm(false)
  }

  const buttons: ModalButtons = {
    goNext: {
      onClick: () => {
        formMethods.handleSubmit(submit)()
        formMethods.reset()
      },
      text: messages.save
    },
    goBack: {
      onClick: () => {
        setOpenEditForm(false)
      },
      text: messages.cancel
    }
  }

  const details = formMethods.watch('details') ?? []

  // Transform details array into a Map grouped by propertyGroup with sorted properties
  const detailsMap = Array.isArray(details)
    ? details.reduce((map, detail) => {
        if (!detail?.propertyGroup) return map
        const group = detail.propertyGroup
        if (!map.has(group)) {
          map.set(group, [])
        }
        map.get(group)?.push(detail)
        return map
      }, new Map<string, CatalogueItemDetail[]>())
    : new Map<string, CatalogueItemDetail[]>()

  // Sort properties within each group
  detailsMap.forEach((properties, group) => {
    detailsMap.set(group, sortBy(properties, ['property.name']))
  })

  return (
    <>
      <TableEditButton
        onClick={() => {
          formMethods.setValue('uuid', serviceLine.uuid)
          formMethods.setValue('uid', serviceLine.uid)
          formMethods.setValue('name', serviceLine.name)
          formMethods.setValue('price', serviceLine.price)
          formMethods.setValue('currency', serviceLine.currency)
          formMethods.setValue('serviceType', serviceLine.serviceType)
          formMethods.setValue('notes', serviceLine.notes)
          formMethods.setValue('item', serviceLine.item)
          formMethods.setValue('eun', serviceLine.eun)
          formMethods.setValue('isDelivered', serviceLine.isDelivered)
          formMethods.setValue(
            'details',
            Array.isArray(serviceLine.details) ? serviceLine.details : []
          )

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
            <DetailPropertiesList groupMap={detailsMap} disabled={false} />
          </>
        </Form>
      </ModalComponent>
    </>
  )
}
