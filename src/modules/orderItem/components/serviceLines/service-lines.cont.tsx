import { useCallback, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table/table'
import { message } from '@/i18n/src/messages'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import type { ServiceLine } from '../../types/form'
import { ServiceLineWizard } from './form/service-line.wizz'
import { useServiceLinesColumns } from './service-lines.columns'

const messages = message.ordersPage.serviceLines

interface OrderLinesTableProps {
  disabledEdit?: boolean
}

export const ServiceLinesContainer = ({
  disabledEdit
}: OrderLinesTableProps) => {
  const { control } = useFormContext()

  const serviceLinesData = useWatch({ control, name: 'serviceLines' })

  // Memoize data to prevent unnecessary re-renders
  // Use JSON.stringify to ensure the memoized value only changes when the actual data content changes
  const serviceLines = useMemo(
    () => serviceLinesData || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(serviceLinesData)]
  )

  // Memoize columns to prevent unnecessary re-renders
  const serviceLinesColumns = useServiceLinesColumns()
  const { openModal, closeModal } = useModalGlobalStore()

  // Use useCallback for handleAddServiceLine
  const handleAddServiceLine = useCallback(() => {
    openModal('dialog1', {
      component: () => (
        <ServiceLineWizard setOpen={() => closeModal('dialog1')} />
      ),
      props: {
        title: 'Add Service Line',
        size: 'xl'
      }
    })
  }, [openModal, closeModal])

  return (
    <div className="pt-4">
      <Heading text={messages.header} showBorder={false}>
        {!disabledEdit && (
          <div className="flex items-center mr-2">
            <PlusButton
              type="button"
              onClick={handleAddServiceLine}
              className="mb-2"
            />
          </div>
        )}
      </Heading>
      <Table<ServiceLine>
        {...{
          data: serviceLines,
          className: 'relative overflow-x-auto',
          columns: serviceLinesColumns,
          enablePagination: true,
          enableFiltering: true,
          enableFooter: true,
          enablePinning: true,
          rowClassName: 'group/row',
          getRowProps: ({ isDelivered }, index: number) => ({
            className: isDelivered
              ? index % 2 === 0
                ? 'bg-green-200 dark:bg-green-800'
                : 'bg-green-100 dark:bg-green-700'
              : undefined
          })
        }}
      />
    </div>
  )
}
