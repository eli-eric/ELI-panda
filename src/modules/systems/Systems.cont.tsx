import classNames from 'classnames'
import type { FC } from 'react'
import { createContext, useState } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import { SystemsTable } from './components/table/Systems.table'

interface SystemsContextType {
  isHoveringId: number | undefined | string
}

export const SystemsContext = createContext<SystemsContextType>({ isHoveringId: undefined })

interface Props {
  enableQueryURL?: boolean
  enableDragAndDrop?: boolean
  tableId?: string
  dropSettings?: any
  className?: string
  hideButtons?: boolean
  RightSearchBarElement?: () => JSX.Element
}

export const SystemsContainer: FC<Props> = ({
  enableQueryURL = true,
  enableDragAndDrop,
  tableId = 'systems',
  dropSettings,
  className,
  hideButtons = false,
  RightSearchBarElement
}: Props) => {
  const [isHoveringId, setIsHoveringId] = useState<number | undefined | string>()

  return (
    <SystemsContext.Provider value={{ isHoveringId: isHoveringId }}>
      <TableLayoutContainer className={className}>
        <SystemsTable
          hideButtons={hideButtons}
          enableDragAndDrop={enableDragAndDrop}
          tableId={tableId}
          RightSearchBarElement={RightSearchBarElement}
          pageSizeDefault={50}
          className={'relative overflow-scroll scrollbar-style'}
          getRowProps={({ id, original }) => ({
            onMouseEnter: () => {
              setIsHoveringId(id)
            },
            onMouseLeave: () => {
              setIsHoveringId(undefined)
            },
            className: classNames(original?.physicalItem && 'font-bold text-gray-700'),
            dropSettings
          })}
          settings={{
            enableSorting: true,
            enableColumnHiding: true,
            enableQueryURL: enableQueryURL,
            enableColumnReordering: true
          }}
        />
      </TableLayoutContainer>
    </SystemsContext.Provider>
  )
}
