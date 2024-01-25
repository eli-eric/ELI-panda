import classNames from 'classnames'
import { type Dispatch, Fragment, memo, type SetStateAction } from 'react'

import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { SystemsTable } from '@/modules/systems/components/table/Systems.table'

const MemoizedTable = memo(SystemsTable)

interface Props {
  setSelectedSystem: Dispatch<SetStateAction<CodebookType | null>>
  selectedSystem?: CodebookType | null
  tableId: string
}

export const SelectSystemTable = ({ setSelectedSystem, selectedSystem, tableId }: Props) => (
  <Fragment>
    <MemoizedTable
      tableId={tableId}
      hideButtons={true}
      className={'overflow-y-auto relative h-[423px]'}
      settings={{
        enableRowSelection: true
      }}
      getRowProps={row => ({
        onClick: () => {
          setSelectedSystem({ name: row.original.name, uid: row.original.uid })
        },
        className: classNames(selectedSystem?.uid === row.original.uid ? 'bg-primary-200' : '', 'cursor-pointer')
      })}
    />
  </Fragment>
)
