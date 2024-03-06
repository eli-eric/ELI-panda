import { memo, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/Buttons'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import useWarningModal from '@/hooks/useWarningModal'
import { classNames } from '@/utils'

import { FilterBadges } from '../shared/form/FilterBadges'
import { Pagination } from '../shared/table/Pagination'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import type { PandaTableSettings } from '../shared/table/pandaTable/PandaTable'
import { PandaTableControlled } from '../shared/table/pandaTable/PandaTableCotrolled'
import { SearchBar } from '../shared/table/SearchBar'
import { getColorBySystemLevel, getFontBySystemLevel } from '../systemItem/utils'
import { SystemFilterButtonContainer } from '../systems/components/filters/SystemsFilterButton.cont'
import { useSystems } from '../systems/hooks/useSystems'
import type { SystemDetail } from '../systems/types/responses'
import { useAssignSpareParts } from './hooks/useAssignSpareParts'
import { useSystemsSparePartsColumns } from './SystemSpareParts.columns'

const FilterMemoized = memo(SystemFilterButtonContainer)
const BadgesMemoized = memo(FilterBadges)

export const SystemsSparePartsContainer = () => {
  const tableId1 = 'spare-parts'
  const tableId2 = 'for-system'

  const sysetms1 = useSystems(tableId1)
  const sysetms2 = useSystems(tableId2)

  const [table1SelectedUids, setTable1SelectedUids] = useState<string[]>([])
  const [table2SelectedUids, setTable2SelectedUids] = useState<string[]>([])

  const columns1 = useSystemsSparePartsColumns({ tableId: tableId1, setSelectedUids: setTable1SelectedUids })
  const columns2 = useSystemsSparePartsColumns({ tableId: tableId2, setSelectedUids: setTable2SelectedUids })

  const tableSettings: PandaTableSettings<SystemDetail> = useMemo(
    () => ({
      enableMultiRowSelection: true,
      enableColumnHiding: true,
      enableColumnReordering: true,
      enableQueryURL: false
    }),
    []
  )

  const table = usePandaTable<SystemDetail>({
    tableId: tableId1,
    data: sysetms1.systems?.data,
    columns: columns1.columns,
    settings: {
      enableRowSelection: row => !table2SelectedUids?.some(uid => row.original.uid === uid),
      ...tableSettings
    },
    getSubRows: row => row.subSystems || []
  })

  const table2 = usePandaTable<SystemDetail>({
    tableId: tableId2,
    data: sysetms2.systems?.data,
    columns: columns2.columns,
    settings: {
      enableRowSelection: row => !table1SelectedUids?.some(uid => row.original.uid === uid),
      ...tableSettings
    },
    getSubRows: row => row.subSystems || []
  })

  const { getSelectedRowModel } = table
  const { getSelectedRowModel: getSelectedRowModel2 } = table2

  const withWarningModal = useWarningModal('Are you sure you want to continue? The system types do not match.')
  const { assignSpareParts, loading } = useAssignSpareParts()

  const saveRelations = () => {
    assignSpareParts({
      variables: { fromSystemIds: table1SelectedUids, toSystemIds: table2SelectedUids },
      onCompleted: data => {
        toast.success(data.createSparePartRelation as string, { duration: 10000 })
        table.resetRowSelection()
        table2.resetRowSelection()
        setTable1SelectedUids([])
        setTable2SelectedUids([])
      },
      onError: erorr => {
        toast.error(erorr.message)
      }
    })
  }

  const handleAssignSpareParts = () => {
    const isSameSystemType = getSelectedRowModel().flatRows.every(
      system =>
        system.original.systemType !== undefined &&
        getSelectedRowModel2().flatRows.some(
          system2 =>
            system2.original.systemType !== undefined &&
            system.original.systemType?.uid === system2.original.systemType?.uid
        )
    )
    if (!isSameSystemType) {
      withWarningModal(saveRelations)()
    } else saveRelations()
  }

  return (
    <div className={classNames('grid grid-cols-2')}>
      <TableLayoutContainer deps={[sysetms1.systems]} className="border-r-4 border-gray-400">
        <SearchBar
          tableId={tableId1}
          useQuery={false}
          left={<FilterMemoized tableId={tableId1} enableQueryURL={false} />}
          right={<BadgesMemoized tableId={tableId1} />}
          onChange={() => table.resetExpanded()}
        />
        <PandaTableControlled
          data={sysetms1.systems?.data}
          tableHeading="Spare Parts"
          tableId={tableId1}
          table={table}
          loading={sysetms1.loading || columns1.pending}
          className={'relative overflow-scroll scrollbar-style'}
          settings={tableSettings}
          getRowProps={({ original }) => ({
            className: classNames(
              original?.physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
              getColorBySystemLevel(original?.systemLevel),
              getFontBySystemLevel(original?.systemLevel)
            )
          })}
        />
        <Pagination
          tableId={tableId1}
          settings={{
            enableQueryURL: false,
            pageSizeDefault: 50,
            total: sysetms1.systems?.totalCount
          }}
        />
      </TableLayoutContainer>
      <TableLayoutContainer deps={[sysetms2.systems]}>
        <SearchBar
          tableId={tableId2}
          useQuery={false}
          left={<FilterMemoized panelSlide="right" tableId={tableId2} enableQueryURL={false} />}
          right={
            <div className="flex">
              <BadgesMemoized tableId={tableId2} />
              <Button
                primary
                disabled={table1SelectedUids.length === 0 || table2SelectedUids.length === 0}
                loading={loading}
                onClick={handleAssignSpareParts}
              >
                Assign Spare Parts
              </Button>
            </div>
          }
          onChange={() => table.resetExpanded()}
        />
        <PandaTableControlled
          data={sysetms2.systems?.data}
          tableHeading="For System"
          tableId={tableId2}
          table={table2}
          loading={sysetms2.loading || columns2.pending}
          className={'relative overflow-scroll scrollbar-style'}
          settings={tableSettings}
          getRowProps={({ original }) => ({
            className: classNames(
              original?.physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
              getColorBySystemLevel(original?.systemLevel),
              getFontBySystemLevel(original?.systemLevel)
            )
          })}
        />
        <Pagination
          tableId={tableId2}
          settings={{
            enableQueryURL: false,
            pageSizeDefault: 50,
            total: sysetms2.systems?.totalCount
          }}
        />
      </TableLayoutContainer>
    </div>
  )
}
