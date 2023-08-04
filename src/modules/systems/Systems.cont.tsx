import classNames from 'classnames'
import type { FC } from 'react'
import { createContext, useState } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import { SystemsTable } from './components/table/Systems.table'

interface SystemsContextType {
  isHoveringId: number | undefined | string
}

export const SystemsContext = createContext<SystemsContextType>({ isHoveringId: undefined })

export const SystemsContainer: FC = () => {
  const [isHoveringId, setIsHoveringId] = useState<number | undefined | string>()

  return (
    <SystemsContext.Provider value={{ isHoveringId: isHoveringId }}>
      <TableLayoutContainer>
        <SystemsTable
          hideButtons={false}
          tableId={'systems'}
          pageSizeDefault={50}
          className={'relative overflow-scroll'}
          getRowProps={({ id, original }) => ({
            onMouseEnter: () => {
              setIsHoveringId(id)
            },
            onMouseLeave: () => {
              setIsHoveringId(undefined)
            },
            className: classNames(original?.physicalItem && 'font-bold text-gray-700')
          })}
          settings={{
            enableSorting: true,
            enableColumnHiding: true,
            enableQueryURL: true,
            enableColumnReordering: true
          }}
        />
      </TableLayoutContainer>
    </SystemsContext.Provider>
  )
}
