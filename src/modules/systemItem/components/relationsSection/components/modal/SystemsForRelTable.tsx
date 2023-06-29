import type { ColumnDef } from '@tanstack/react-table'
import classNames from 'classnames'
import { type Dispatch, memo, type SetStateAction, useEffect, useMemo } from 'react'

import { Pagination } from '@/modules/shared/table/Pagination'
import PandaTable from '@/modules/shared/table/pandaTable/PandaTable'
import SearchBar from '@/modules/shared/table/SearchBar'
import { useSubsystemsForRel } from '@/modules/systemItem/hooks/useSubSystemsForRel'
import { useSystemsForRel } from '@/modules/systemItem/hooks/useSystemsForRel'
import { SystemNameCell } from '@/modules/systems/components/table/cells/SystemNameCell'
import type { SystemDetail } from '@/modules/systems/types/responses'
import type { RELATION_TYPE_CODE } from '@/modules/systems-deprecated/types/constants'
import useTableStateStore from '@/store/useTableStateStore'

import type { SelectedSystemForRel } from './SelectRelationForm'

const MemoizedTable = memo(PandaTable)

const useSystemsForRelColumns = (tableId: string) => {
  const { setUid, pending } = useSubsystemsForRel()

  const columns = useMemo(
    (): ColumnDef<SystemDetail, any>[] => [
      {
        header: 'Name',
        accessorKey: 'name',
        id: 'name',
        size: 150,
        cell: props => <SystemNameCell {...props} setUid={setUid} canEdit={false} tableId={tableId} />
      },
      { header: 'systemCode', accessorKey: 'systemCode', id: 'systemCode', size: 200 },
      { header: 'systemAlias', accessorKey: 'systemAlias', id: 'systemAlias', size: 200 },
      {
        header: 'systemType',
        accessorKey: 'systemType',
        id: 'systemType',
        size: 150,
        cell: ({ getValue }) => getValue().name
      },
      { header: 'zone', accessorKey: 'zone', id: 'zone', size: 150, cell: ({ getValue }) => getValue().name },
      {
        header: 'location',
        accessorKey: 'location',
        id: 'location',
        size: 150,
        cell: ({ getValue }) => getValue().name
      },
      { header: 'owner', accessorKey: 'owner', id: 'owner', size: 150, cell: ({ getValue }) => getValue().name }
    ],
    [setUid, tableId]
  )

  return { columns, pending }
}

interface Props {
  relationTypeCode?: RELATION_TYPE_CODE
  setSelectedSystem: Dispatch<SetStateAction<SelectedSystemForRel | undefined>>
  selectedSystem?: SelectedSystemForRel
  tableId: string
}

export const SystemsForRelTable = ({ setSelectedSystem, selectedSystem, tableId }: Props) => {
  const { instances, reset } = useTableStateStore()

  const pagination = instances[tableId]?.pagination

  const { systems, loading } = useSystemsForRel()

  const columns = useSystemsForRelColumns(tableId)
  useEffect(() => {
    setSelectedSystem(undefined)
  }, [pagination, setSelectedSystem, tableId, reset])

  return (
    <div className="flex flex-col min-h-[337px] justify-between">
      <SearchBar
        tableId={tableId}
        useQuery={false}
        onChange={() => {
          setSelectedSystem(undefined)
        }}
      />
      <MemoizedTable
        data={systems?.data}
        columns={columns.columns}
        loading={loading}
        getSubRows={row => row.subSystems}
        tableId={tableId}
        settings={{
          enableRowSelection: true
        }}
        getRowProps={row => ({
          onClick: () => {
            setSelectedSystem({ name: row.original.name, uid: row.original.uid })
          },
          className: classNames(selectedSystem?.uid === row.original.uid ? 'bg-primary-200' : '', 'cursor-pointer')
        })}
        className={'overflow-x-auto'}
      />
      <Pagination tableId={tableId} settings={{ total: systems?.totalCount, pageSizeDefault: 10 }} />
    </div>
  )
}
