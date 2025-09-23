import { memo, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/Buttons'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import useQueryManager from '@/hooks/useQueryManager'
import useWarningModal from '@/hooks/useWarningModal'
import { cn } from '@/lib/utils'
import type { SystemDetail } from '@/types/responses/systems'

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
import { useAssignSpareParts } from './hooks/useAssignSpareParts'
import { useSparesStore } from './store/useSparesStore'
import { useSystemsSparePartsColumns } from './SystemSpareParts.columns'

const FilterMemoized = memo(SystemFilterButtonContainer)

export const SystemsSparePartsContainer = () => {
  const tableId1 = 'spare-parts'
  const tableId2 = 'for-system'

  const sysetms1 = useSystems(tableId1)
  const sysetms2 = useSystems(tableId2)

  const [table1SelectedUids, setTable1SelectedUids] = useState<string[]>([])
  const [table2SelectedUids, setTable2SelectedUids] = useState<string[]>([])

  const { selectedUidForSystem, setSelectedUidForSystem } = useSparesStore()

  const {
    query: { search }
  } = useQueryManager(tableId2)

  const [, setRowSelection] = useRowSelection(tableId2)

  const columns1 = useSystemsSparePartsColumns({
    tableId: tableId1,
    setSelectedUids: setTable1SelectedUids
  })
  const columns2 = useSystemsSparePartsColumns({
    tableId: tableId2,
    setSelectedUids: setTable2SelectedUids
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

  const table = usePandaTable<SystemDetail>({
    tableId: tableId1,
    data: sysetms1.systems?.data,
    columns: columns1.columns,
    settings: {
      enableRowSelection: row =>
        !table2SelectedUids?.some(uid => row.original.uid === uid),
      ...tableSettings
    },
    getSubRows: row => row.subSystems || []
  })

  const table2 = usePandaTable<SystemDetail>({
    tableId: tableId2,
    data: sysetms2.systems?.data,
    columns: columns2.columns,
    settings: {
      enableRowSelection: row =>
        !table1SelectedUids?.some(uid => row.original.uid === uid),
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
  const { assignSpareParts, loading } = useAssignSpareParts()

  const [recalculate1] = useRecalculate({ tableId: tableId1 })
  const [recalculate2] = useRecalculate({ tableId: tableId2 })

  const saveRelations = () => {
    if (loading) {
      return
    }

    assignSpareParts(
      {
        fromSystemIds: table1SelectedUids,
        toSystemIds: table2SelectedUids
      },
      {
        onSuccess: () => {
          table.resetRowSelection()
          table2.resetRowSelection()
          setTable1SelectedUids([])
          setTable2SelectedUids([])
          recalculate1(null)
          recalculate2(null)
        },
        onError: erorr => {
          toast.error(erorr.message)
        }
      }
    )
  }

  const handleAssignSpareParts = () => {
    // Prevent multiple calls while mutation is already running
    if (loading) {
      return
    }

    const isSameSystemType =
      getSelectedRowModel().flatRows.every(
        system =>
          system.original.systemType !== undefined &&
          getSelectedRowModel2().flatRows.some(
            system2 =>
              system2.original.systemType !== undefined &&
              system.original.systemType?.uid ===
                system2.original.systemType?.uid
          )
      ) &&
      getSelectedRowModel().flatRows.some(
        system => system.original.systemType !== undefined
      ) &&
      getSelectedRowModel2().flatRows.some(
        system2 => system2.original.systemType !== undefined
      )

    const isSamePartNumber =
      getSelectedRowModel().flatRows.every(
        system =>
          system.original.physicalItem?.catalogueItem?.catalogueNumber !==
            undefined &&
          getSelectedRowModel2().flatRows.some(
            system2 =>
              system2.original.physicalItem?.catalogueItem?.catalogueNumber !==
                undefined &&
              system.original.physicalItem?.catalogueItem?.catalogueNumber ===
                system2.original.physicalItem?.catalogueItem?.catalogueNumber
          )
      ) &&
      getSelectedRowModel().flatRows.some(
        system =>
          system.original.physicalItem?.catalogueItem?.catalogueNumber !==
          undefined
      ) &&
      getSelectedRowModel2().flatRows.some(
        system2 =>
          system2.original.physicalItem?.catalogueItem?.catalogueNumber !==
          undefined
      )

    if (!isSamePartNumber && !isSameSystemType) {
      withWarningModal(
        saveRelations,
        ' Are you sure you want to continue? The Part Numbers and System Types do not match.'
      )()
      return
    }
    if (!isSamePartNumber) {
      withWarningModal(
        saveRelations,
        "'Are you sure you want to continue? The Part Numbers do not match."
      )()
      return
    }
    if (!isSameSystemType) {
      withWarningModal(saveRelations)()
      return
    }

    saveRelations()
  }

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
    <div className={cn('grid grid-cols-2')}>
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
          tableHeading="Spare Parts"
          tableId={tableId1}
          table={table}
          loading={sysetms1.loading || columns1.pending}
          className={'relative overflow-scroll scrollbar-style'}
          settings={tableSettings}
          getRowProps={({ original }) => ({
            className: cn(
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
                disabled={
                  table1SelectedUids.length === 0 ||
                  table2SelectedUids.length === 0
                }
                loading={loading}
                onClick={handleAssignSpareParts}
              >
                Assign Spare Parts
              </Button>
            </div>
          }
          onChange={() => table.resetExpanded()}
        />
        <PandaTableV2
          data={sysetms2.systems?.data}
          tableHeading="For System"
          tableId={tableId2}
          table={table2}
          loading={sysetms2.loading || columns2.pending}
          className={'relative overflow-scroll scrollbar-style'}
          settings={tableSettings}
          getRowProps={({ original }) => ({
            className: cn(
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

export default SystemsSparePartsContainer
