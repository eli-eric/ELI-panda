import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table/table'
import { message } from '@/i18n/src/messages'

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
  // Use shallow comparison to only re-render when items change
  const serviceLines = useMemo(() => {
    return serviceLinesData || []
  }, [serviceLinesData])

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
          getRowProps: () => ({})
        }}
      />
    </div>
  )
}
