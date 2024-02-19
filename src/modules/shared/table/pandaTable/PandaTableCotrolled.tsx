import type { Row, Table } from '@tanstack/react-table'
import { createContext, Fragment } from 'react'

import EmptyResults from '@/components/empty-section/EmptyResults'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { classNames } from '@/utils'

import { TableBody } from './components/TableBody'
import { TableFoot } from './components/TableFoot'
import { TableHead } from './components/TableHead'
import { TableSettings } from './components/TableSettings'
import { defaultPropGetter, type GetRowPropsReturnType, type PandaTableSettings } from './PandaTable'

type PandaTableContextType = {
  settings: PandaTableSettings<any>
  tableId: string
  loading: boolean
}
export const PandaTableContext = createContext<PandaTableContextType>({
  settings: {},
  tableId: '',
  loading: false
})

interface Props {
  settings?: PandaTableSettings<any>
  className?: string
  data: any
  loading: boolean
  getRowProps?: (row: Row<any>) => GetRowPropsReturnType

  tableId: string
  table: Table<any>
}
export const PandaTableControlled = ({
  settings,
  className,
  data,
  table,
  loading,
  tableId,
  getRowProps = defaultPropGetter
}: Props) => {
  const { enableFooter = false, enableColumnHiding = false } = settings || {}

  return (
    <PandaTableContext.Provider
      value={{
        settings: settings || {},
        tableId,
        loading
      }}
    >
      {enableColumnHiding && <TableSettings table={table} />}
      <div className={classNames('h-full flex flex-col border-t border-gray-300 pb-4', className)}>
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <TableHead table={table} />
            {data && (
              <Fragment>
                <TableBody getRowProps={getRowProps} getRowModel={table.getRowModel} />
                {enableFooter && <TableFoot getFooterGroups={table.getFooterGroups} />}
              </Fragment>
            )}
          </table>
          {loading && !data && <ProgressBarComponent />}
          {data?.length === 0 && <EmptyResults />}
        </div>
      </div>
    </PandaTableContext.Provider>
  )
}
