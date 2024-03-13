import classNames from 'classnames'
import type { FC } from 'react'
import { createContext } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { useHoveringId } from '@/store/useHoveringId'

import { getColorBySystemLevel, getFontBySystemLevel } from '../systemItem/utils'
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

  LeftSearchBarElement?: () => JSX.Element
}

export const SystemsComponent: FC<Props> = ({
  enableQueryURL = true,
  enableDragAndDrop,
  tableId = 'systems',
  dropSettings,
  className,
  hideButtons = false,
  LeftSearchBarElement,
  RightSearchBarElement
}: Props) => {
  const { setHoveringId } = useHoveringId()
  return (
    <TableLayoutContainer className={className}>
      <SystemsTable
        hideButtons={hideButtons}
        enableDragAndDrop={enableDragAndDrop}
        tableId={tableId}
        RightSearchBarElement={RightSearchBarElement}
        LeftSearchBarElement={LeftSearchBarElement}
        pageSizeDefault={50}
        className={'relative overflow-scroll scrollbar-style'}
        getRowProps={({ id, original }) => ({
          onMouseEnter: () => {
            setHoveringId(id)
          },
          onMouseLeave: () => {
            setHoveringId(undefined)
          },
          className: classNames(
            original?.physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
            getColorBySystemLevel(original?.systemLevel),
            getFontBySystemLevel(original?.systemLevel)
          ),
          dropSettings
        })}
        settings={{
          enableSorting: true,
          enableColumnHiding: true,
          enableFiltering: true,
          manualFiltering: true,
          enableQueryURL: enableQueryURL,
          enableColumnReordering: false
        }}
      />
    </TableLayoutContainer>
  )
}
