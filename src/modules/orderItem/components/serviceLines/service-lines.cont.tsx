import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table/table'
import { message } from '@/i18n/src/messages'

import { useServiceLineContext } from '../../context'
import type { ServiceLine } from '../../types/form'
import { useServiceLinesColumns } from './service-lines.columns'
import { ServiceLinesAddButton } from './service-lines-add-button'

const messages = message.ordersPage.serviceLines

interface ServiceLinesTableProps {
  disabledEdit?: boolean
}

export const ServiceLinesContainer = ({
  disabledEdit
}: ServiceLinesTableProps) => {
  const { fields } = useServiceLineContext()
  const columns = useServiceLinesColumns()

  return (
    <div className="pt-4">
      <Heading text={messages.header} showBorder={false}>
        {!disabledEdit && <ServiceLinesAddButton />}
      </Heading>
      <Table<ServiceLine>
        data={fields}
        className="relative overflow-x-auto"
        columns={columns}
        enablePagination
        enableFiltering
        enableFooter
        enablePinning
        rowClassName="group/row"
        getRowProps={() => ({})}
      />
    </div>
  )
}
