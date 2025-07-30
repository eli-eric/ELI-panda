import { sortBy } from 'lodash'
import { useForm } from 'react-hook-form'

import { Button, TableEditButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input, TextArea } from '@/components/form/inputs'
import { InputAmountCurrency } from '@/components/form/inputs/components/InputAmountCurrency.comp'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLine } from '@/modules/orderItem/types/form'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { DetailPropertiesList } from '../form/details/detail-properties.list'
import { useServiceLineFields } from '../form/hooks/useServiceLineFields'

type Props = {
  serviceLine: ServiceLine
}

export const ServiceLineEdit = ({ serviceLine }: Props) => {
  const fields = useServiceLineFields()
  const { setServiceLine } = useServiceLine()
  const { openModal, closeModal } = useModalGlobalStore()

  const formMethods = useForm<ServiceLine>()

  const submit = (data: ServiceLine) => {
    setServiceLine({
      ...data,
      details: Array.isArray(data.details) ? data.details : []
    })
    closeModal('dialog1')
  }

  const openEditModal = () => {
    openModal('dialog1', {
      component: ({ onSubmit }) => (
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
                <InputAmountCurrency
                  amountName={fields.price.name}
                  label={fields.price.name}
                  currencyName={fields.currency.name}
                />
              </Col>
              <Col sm={12}>
                <TextArea {...fields.notes} />
              </Col>
            </Grid>
            <DetailPropertiesList groupMap={detailsMap} disabled={false} />
          </>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                formMethods.reset()
                closeModal('dialog1')
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={onSubmit}>
              Update Service Line
            </Button>
          </div>
        </Form>
      ),
      props: {
        title: 'Edit Service Line',
        size: 'l'
      },
      onSubmit: () => {
        formMethods.handleSubmit(submit)()
        formMethods.reset()
      }
    })
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

          openEditModal()
        }}
      />
    </>
  )
}
