import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/Buttons'
import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
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
import { useSystemsSparePartsColumns } from './SystemSpareParts.columns'

export const SystemsSparePartsContainer = () => {
  const tableId1 = 'SpareParts'
  const tableId2 = 'SpareFor'

  const sysetms1 = useSystems(tableId1)
  const sysetms2 = useSystems(tableId2)

  const columns1 = useSystemsSparePartsColumns({ tableId: tableId1 })
  const columns2 = useSystemsSparePartsColumns({ tableId: tableId2 })

  const [selectedSystemType, setSelectedSystemType] = useState<CodebookType | undefined>()

  const tableSettings: PandaTableSettings<SystemDetail> = useMemo(
    () => ({
      enableRowSelection: row =>
        !row.original.systemType
          ? false
          : !selectedSystemType
            ? true
            : row.original.systemType?.uid === selectedSystemType?.uid
              ? true
              : false,
      enableMultiRowSelection: true,
      enableColumnHiding: true,
      enableColumnReordering: true,
      enableQueryURL: false
    }),
    [selectedSystemType]
  )

  const table2 = usePandaTable<SystemDetail>({
    tableId: tableId2,
    data: sysetms2.systems?.data,
    columns: columns2.columns,
    settings: tableSettings,
    getSubRows: row => row.subSystems || []
  })
  const table = usePandaTable<SystemDetail>({
    tableId: tableId1,
    data: sysetms1.systems?.data,
    columns: columns1.columns,
    settings: tableSettings,
    getSubRows: row => row.subSystems || []
  })

  const firstSelectedSystemType =
    table.getSelectedRowModel().flatRows[0]?.original?.systemType ||
    table2.getSelectedRowModel().flatRows[0]?.original.systemType

  useEffect(() => {
    if (firstSelectedSystemType) {
      setSelectedSystemType(firstSelectedSystemType)
    } else {
      setSelectedSystemType(undefined)
    }
  }, [firstSelectedSystemType, setSelectedSystemType])

  return (
    <div className={classNames('grid grid-cols-2')}>
      <TableLayoutContainer deps={[sysetms1.systems]} className="border-r-4 border-gray-400">
        <SearchBar
          tableId={tableId1}
          useQuery={false}
          left={<SystemFilterButtonContainer tableId={tableId1} enableQueryURL={false} />}
          right={<FilterBadges tableId={tableId1} />}
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
          left={<SystemFilterButtonContainer tableId={tableId2} enableQueryURL={false} />}
          right={
            <div className="flex">
              <FilterBadges tableId={tableId2} />
              <Button primary>Assign Spare Parts</Button>
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
