import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'

interface OrdersTableProps {
  seettings: any
  getRowProps: any
  columns: any
  data: any
  loading: boolean
  tableId: string
}

export const OrdersTable = ({
  seettings,
  getRowProps,
  columns,
  data,
  loading,
  tableId
}: OrdersTableProps) => (
  <PandaTable
    {...{
      settings: seettings,
      getRowProps,
      columns,
      tableId,
      data,
      loading,
      className: 'relative overflow-x-auto'
    }}
  />
)
