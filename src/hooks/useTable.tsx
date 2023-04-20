import { Fragment } from 'react'

import EmptyResults from '@/components/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import TableComponent from '@/components/table/Table.comp'
import TableRowComponent from '@/components/table/TableRow.comp'
import { TableRowItem } from '@/components/table/TableRowItem.comp'

interface UseTableType<T> {
  data?: T[]
  collums: string[]
  renderRow: (item: T) => JSX.Element
  onClick?: (item: T) => void
  loading?: boolean
  isSelected?: (item: T) => boolean
}

const useTable = <T extends object>({ data, collums, renderRow, onClick, loading, isSelected }: UseTableType<T>) => {
  const noResults = data && data?.length === 0
  const noData = !data && !loading
  const empty = noResults || noData

  const getTable = () => (
    <Fragment>
      <TableComponent tableHeaders={collums} loading={loading} noData={data?.length === 0}>
        {data?.map((item, index) => (
          <TableRowComponent
            key={index}
            index={index}
            onClick={onClick ? () => onClick(item) : undefined}
            className={isSelected ? (isSelected(item) ? 'bg-lime-200' : '') : ''}
          >
            {renderRow(item)}
          </TableRowComponent>
        ))}
      </TableComponent>
      {empty && <EmptyResults />}
      {loading && <ProgressBarComponent />}
    </Fragment>
  )

  return { getTable, TableRowItem }
}

export default useTable
