import { memo, useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/Buttons'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import useQueryManager from '@/hooks/useQueryManager'
import useWarningModal from '@/hooks/useWarningModal'
import type { SystemDetail } from '@/types/responses/systems'
import { classNames } from '@/utils'

import { FilterBadges } from '../shared/form/FilterBadges'
import { Pagination } from '../shared/table/Pagination'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import { useRowSelection } from '../shared/table/pandaTable/hooks/useRowSelection'
import type { PandaTableSettings } from '../shared/table/pandaTable/PandaTable'
import { PandaTableV2 } from '../shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '../shared/table/SearchBar'
import { useRecalculate } from '../systemItem/hooks/useRecalculate'
import {
  getColorBySystemLevel,
  getFontBySystemLevel
} from '../systemItem/utils'
import { SystemFilterButtonContainer } from '../systems/components/filters/SystemsFilterButton.cont'
import { useSystems } from '../systems/hooks/useSystems'
import { useSparesStore } from '../systemsSpareParts/store/useSparesStore'
import { useMoveSystemsColumns } from './move-systems.columns'

const FilterMemoized = memo(SystemFilterButtonContainer)

export const SystemsMultiMoveContainer = () => {
  const tableId1 = 'destination-systems'
  const tableId2 = 'source-systems'

  const sysetms1 = useSystems(tableId1)
  const sysetms2 = useSystems(tableId2)

  const [table1SelectedUids, setTable1SelectedUids] = useState<string[]>([])
  const [table2SelectedUids, setTable2SelectedUids] = useState<string[]>([])

  const { selectedUidForSystem, setSelectedUidForSystem } = useSparesStore()

  const {
    query: { search }
  } = useQueryManager(tableId2)

  const [, setRowSelection] = useRowSelection(tableId2)

  const columns1 = useMoveSystemsColumns({
    tableId: tableId1,
    setSelectedUids: setTable1SelectedUids,
    isDestination: true
  })
  const columns2 = useMoveSystemsColumns({
    tableId: tableId2,
    setSelectedUids: setTable2SelectedUids,
    isDestination: false
  })

  const tableSettings: PandaTableSettings<SystemDetail> = useMemo(
    () => ({
      enableMultiRowSelection: true,
      enableColumnHiding: true,
      enableColumnReordering: false,
      enableQueryURL: false
    }),
    []
  )

  const canSelectMovingSystem = (system: SystemDetail) => {
    const isSelectedSameDestination = table1SelectedUids.some(
      uid => system.uid === uid
    )
    const isSelectedParent = system.parentPath?.some(path =>
      table2SelectedUids.includes(path?.uid)
    )

    if (isSelectedSameDestination) {
      return false
    }

    if (isSelectedParent) {
      return false
    }

    return true
  }

  const canSelectDestinationSystem = (system: SystemDetail) => {
    const isSelectedSameMoving = table2SelectedUids.some(
      uid => system.uid === uid
    )
    if (isSelectedSameMoving) {
      return false
    }

    return table1SelectedUids.length
      ? table1SelectedUids.includes(system.uid)
      : true
  }

  const table = usePandaTable<SystemDetail>({
    tableId: tableId1,
    data: sysetms1.systems?.data,
    columns: columns1.columns,
    settings: {
      enableRowSelection: row => canSelectDestinationSystem(row.original),
      ...tableSettings
    },
    getSubRows: row => row.subSystems || []
  })

  const table2 = usePandaTable<SystemDetail>({
    tableId: tableId2,
    data: sysetms2.systems?.data,
    columns: columns2.columns,
    settings: {
      enableRowSelection: row => canSelectMovingSystem(row.original),
      ...tableSettings
    },
    getSubRows: row => row.subSystems || []
  })

  useEffect(() => {
    table.setColumnOrder(['icon', 'select'])
    table2.setColumnOrder(['icon', 'select'])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { getSelectedRowModel } = table
  const { getSelectedRowModel: getSelectedRowModel2 } = table2

  const withWarningModal = useWarningModal(
    'Are you sure you want to continue? The system types do not match.'
  )

  const submit = () => {
    console.log('submit')
  }

  const [recalculate1] = useRecalculate({ tableId: tableId1 })
  const [recalculate2] = useRecalculate({ tableId: tableId2 })

  useEffect(() => {
    if (selectedUidForSystem && selectedUidForSystem === search) {
      setTable2SelectedUids([selectedUidForSystem])
      setRowSelection({ 0: true })
    } else {
      setTable2SelectedUids([])
      setRowSelection({})
      setSelectedUidForSystem(undefined)
    }
    return () => setSelectedUidForSystem(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classNames('grid grid-cols-2')}>
      <TableLayoutContainer
        deps={[sysetms1.systems]}
        className="border-r-4 border-gray-400"
      >
        <SearchBar
          tableId={tableId1}
          useQuery={false}
          left={<FilterMemoized tableId={tableId1} enableQueryURL={false} />}
          right={<FilterBadges enableQueryURL={false} tableId={tableId1} />}
          onChange={() => table.resetExpanded()}
        />
        <PandaTableV2
          data={sysetms1.systems?.data}
          tableHeading="Destination System"
          tableId={tableId1}
          table={table}
          loading={sysetms1.loading || columns1.pending}
          className={'relative overflow-scroll scrollbar-style'}
          settings={tableSettings}
          getRowProps={({ original }) => ({
            className: classNames(
              original?.physicalItem &&
                'font-bold text-gray-700 dark:text-gray-200',
              getColorBySystemLevel(original?.systemLevel),
              getFontBySystemLevel(original?.systemLevel),
              original?.physicalItem &&
                'font-bold text-gray-700 dark:text-gray-200',
              original?.statistics?.sp_coverage != null &&
                original.statistics.sp_coverage < 1 &&
                'text-red-500 dark:text-red-500 font-bold'
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
          left={
            <FilterMemoized
              panelSlide="right"
              tableId={tableId2}
              enableQueryURL={false}
            />
          }
          right={
            <div className="flex">
              <FilterBadges enableQueryURL={false} tableId={tableId2} />
              <Button
                primary
                disabled={
                  table1SelectedUids.length === 0 ||
                  table2SelectedUids.length === 0
                }
                loading={false}
                onClick={submit}
              >
                Move Systems
              </Button>
            </div>
          }
          onChange={() => table.resetExpanded()}
        />
        <PandaTableV2
          data={sysetms2.systems?.data}
          tableHeading="Moving Systems"
          tableId={tableId2}
          table={table2}
          loading={sysetms2.loading || columns2.pending}
          className={'relative overflow-scroll scrollbar-style'}
          settings={tableSettings}
          getRowProps={({ original }) => ({
            className: classNames(
              original?.physicalItem &&
                'font-bold text-gray-700 dark:text-gray-200',
              getColorBySystemLevel(original?.systemLevel),
              getFontBySystemLevel(original?.systemLevel),
              original?.physicalItem &&
                'font-bold text-gray-700 dark:text-gray-200',
              original?.statistics?.sp_coverage != null &&
                original.statistics.sp_coverage < 1 &&
                'text-red-500 dark:text-red-500 font-bold'
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
