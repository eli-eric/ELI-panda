import { CheckCircleIcon } from '@heroicons/react/24/outline'
import type { Row } from '@tanstack/react-table'
import { sortBy } from 'lodash'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input, TextArea } from '@/components/form/inputs'
import { InputAmountCurrency } from '@/components/form/inputs/components/InputAmountCurrency.comp'
import Listbox from '@/components/form/Listbox'
import { Toggle } from '@/components/form/Switch'
import { Col, Grid } from '@/components/grid/Grid'
import { Tooltip } from '@/components/Tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { useServiceLineDeliver } from '@/modules/orderItem/hooks/useServiceDelivery'
import { useServiceDeliveryAll } from '@/modules/orderItem/hooks/useServiceDeliveryAll'
import { useServiceLine } from '@/modules/orderItem/hooks/useServiceLine'
import type { ServiceLine } from '@/modules/orderItem/types/form'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { ROLE } from '@/types/constants/roles'
import { createMessageValues } from '@/utils/formatters'

import { DetailPropertiesList } from '../form/details/detail-properties.list'
import { useServiceLineFields } from '../form/hooks/useServiceLineFields'

export const ServiceLineActionButtons = ({
  serviceLine
}: {
  serviceLine: ServiceLine
}) => {
  const { formatMessage } = useIntl()
  const { deleteServiceLine, setServiceLine } = useServiceLine()
  const fields = useServiceLineFields()
  const { openModal, closeModal } = useModalGlobalStore()
  const formMethods = useForm<ServiceLine>()
  const withWarning = useWarningModal(
    formatMessage(
      { id: message.ordersPage.serviceLines.deleteModal.message },
      createMessageValues({ name: serviceLine.name })
    )
  )

  const submit = (data: ServiceLine) => {
    setServiceLine({
      ...data,
      details: Array.isArray(data.details) ? data.details : []
    })
    closeModal('dialog1')
  }

  const openEditModal = () => {
    // Set form values
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

    openModal('dialog1', {
      component: ({ onSubmit }) => {
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
        )
      },
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Service line actions"
          className="h-8 w-8 p-0"
        >
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4}>
        <DropdownMenuItem onClick={openEditModal} className="cursor-pointer">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => withWarning(deleteServiceLine)(serviceLine.uuid)}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const ServiceDeliveryAction = ({
  serviceLine,
  checked
}: {
  serviceLine: ServiceLine
  checked?: boolean
}) => {
  const hasRole = usePermission([ROLE.ORDERS_DELIVERY_EDIT, ROLE.ORDERS_EDIT])
  const { mutate } = useServiceLineDeliver(serviceLine)
  const handleCheck = () => {
    mutate({ isDelivered: !checked })
  }

  return (
    <Fragment>
      {serviceLine.uid && (
        <Fragment>
          {hasRole ? (
            <Toggle onChange={handleCheck} enabled={checked || false} />
          ) : (
            <Toggle enabled={checked || false} onChange={() => {}} />
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export const PriceFooter = ({ rows }: { rows: Row<ServiceLine>[] }) => {
  const total = rows.reduce(
    (sum, { original: { price } }) => sum + (price || 0),
    0
  )
  const totalCurrencyRows = rows.filter(
    ({ original: { currency } }) => currency != undefined
  )
  const totalCurrency =
    totalCurrencyRows.length > 0 ? totalCurrencyRows[0].original.currency : ''
  return (
    <Fragment>
      {rows.length > 0 && (
        <div className="flex flex-col whitespace-nowrap py-1">
          <span className="font-medium">{`${parseFloat(total.toFixed(2))} ${totalCurrency}`}</span>
        </div>
      )}
    </Fragment>
  )
}

export const DeliveredAllButton = () => {
  const { handleDelivery, isPending } = useServiceDeliveryAll()

  const hasRole = usePermission([ROLE.ORDERS_DELIVERY_EDIT, ROLE.ORDERS_EDIT])

  const handleClick = () => {
    handleDelivery()
  }
  return (
    <Tooltip content="Mark All as Delivered">
      <Button
        disabled={isPending || !hasRole}
        className="flex justify-center items-center p-1 h-7 min-h-0 w-7"
        onClick={handleClick}
      >
        <CheckCircleIcon className="h-5 w-5" />
      </Button>
    </Tooltip>
  )
}
