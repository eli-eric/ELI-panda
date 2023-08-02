import classNames from 'classnames'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import { SystemsTable } from '../systems/components/table/Systems.table'
import type { SystemDetail } from '../systems/types/responses'

export const SystemsMovingContainer = () => {
  const onDropHandler = (item: SystemDetail, original: SystemDetail) => {
    console.log('onDropHandler', item, original)
  }

  return (
    <div className="grid grid-cols-2">
      <TableLayoutContainer className="border">
        <SystemsTable
          hideButtons={true}
          enableDragAndDrop={true}
          tableId={'systems-from'}
          pageSizeDefault={50}
          className={'relative overflow-scroll'}
          getRowProps={({ original }) => ({
            className: classNames(original?.physicalItem && 'font-bold text-gray-700'),
            dropSettings: { onDropHandler: onDropHandler, accept: 'system' }
          })}
          settings={{
            enableSorting: true,
            enableColumnHiding: true,
            enableQueryURL: false,
            enableColumnReordering: true
          }}
        />
      </TableLayoutContainer>
      <TableLayoutContainer className="border">
        <SystemsTable
          hideButtons={true}
          enableDragAndDrop={true}
          tableId={'systems-to'}
          pageSizeDefault={50}
          className={'relative overflow-scroll'}
          getRowProps={({ original }) => ({
            className: classNames(original?.physicalItem && 'font-bold text-gray-700'),
            dropSettings: { onDropHandler: onDropHandler, accept: 'system' }
          })}
          settings={{
            enableSorting: true,
            enableColumnHiding: true,
            enableQueryURL: false,
            enableColumnReordering: true
          }}
        />
      </TableLayoutContainer>
    </div>
  )
}
