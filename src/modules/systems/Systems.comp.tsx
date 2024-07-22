import classNames from 'classnames'
import type { FC } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'

import {
  getColorBySystemLevel,
  getFontBySystemLevel
} from '../systemItem/utils'
import { SystemsTable } from './components/table/Systems.table'

interface Props {
  enableQueryURL?: boolean
  enableDragAndDrop?: boolean
  tableId?: string
  dropsettings?: any
  className?: string
  hideButtons?: boolean
  RightSearchBarElement?: () => JSX.Element

  LeftSearchBarElement?: () => JSX.Element
}

export const SystemsComponent: FC<Props> = ({
  enableQueryURL = true,
  enableDragAndDrop,
  tableId = 'systems',
  dropsettings,
  className,
  hideButtons = false,
  LeftSearchBarElement,
  RightSearchBarElement
}: Props) => {
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
        getRowProps={({ original }) => ({
          className: classNames(
            original?.physicalItem &&
              'font-bold text-gray-700 dark:text-gray-200',
            getColorBySystemLevel(original?.systemLevel),
            getFontBySystemLevel(original?.systemLevel)
          ),
          dropsettings
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
