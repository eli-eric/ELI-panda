import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table/table'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import type { ServiceLine } from '../../types/form'
import { useServiceLinesColumns } from './service-lines.columns'
import { ServiceLinesAddButton } from './service-lines-add-button'

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

  return (
    <div className="pt-4">
      <Heading text={messages.header} showBorder={false}>
        {!disabledEdit && <ServiceLinesAddButton />}
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
            className: cn(
              isDelivered
                ? index % 2 === 0
                  ? 'text-lime-600 dark:text-lime-300 '
                  : 'text-lime-600 dark:text-lime-300 '
                : '',
              'font-bold'
            )
          })
        }}
      />
    </div>
  )
}
