import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

export type CatalogueStatistics = {
  facilityName: string
  total: number
  sparePartsCount: number
  inSystemPartsCount: number
  experimentalLoanPoolPartsCount: number
  testAndMeasurementPartsCount: number
  stockItemsCount: number
  othersCount: number
}

export const useCatalogueStatisticsColumns = (itemStatistics?: CatalogueStatistics[]) => {
  const columns = useMemo((): ColumnDef<CatalogueStatistics, any>[] => {
    const itemUsageColumns: ColumnDef<CatalogueStatistics, any>[] = []

    const sparePartsCountTotal = itemStatistics?.reduce(
      (acc, row) => (row.sparePartsCount ? acc + row.sparePartsCount : 0),
      0
    )
    if (sparePartsCountTotal && sparePartsCountTotal > 0) {
      itemUsageColumns.push({
        header: 'Spare parts',
        id: 'sparePartsCount',
        accessorFn: ({ sparePartsCount }) => sparePartsCount,
        size: 70,
        footer: () => <span>{sparePartsCountTotal}</span>
      })
    }
    const inSystemPartsCountTotal = itemStatistics?.reduce(
      (acc, row) => (row.inSystemPartsCount ? acc + row.inSystemPartsCount : 0),
      0
    )
    if (inSystemPartsCountTotal && inSystemPartsCountTotal > 0) {
      itemUsageColumns.push({
        header: 'In system parts',
        id: 'inSystemPartsCount',
        accessorFn: ({ inSystemPartsCount }) => inSystemPartsCount,
        size: 90,
        footer: () => <span>{inSystemPartsCountTotal}</span>
      })
    }
    const experimentalLoanPoolPartsCountTotal = itemStatistics?.reduce(
      (acc, row) => acc + row.experimentalLoanPoolPartsCount,
      0
    )
    if (experimentalLoanPoolPartsCountTotal && experimentalLoanPoolPartsCountTotal > 0) {
      itemUsageColumns.push({
        header: 'Experimental loan pool parts',
        id: 'experimentalLoanPoolPartsCount',
        accessorFn: ({ experimentalLoanPoolPartsCount }) => experimentalLoanPoolPartsCount,
        footer: () => <span>{experimentalLoanPoolPartsCountTotal}</span>
      })
    }
    const testAndMeasurementPartsCountTotal = itemStatistics?.reduce(
      (acc, row) => acc + row.testAndMeasurementPartsCount,
      0
    )
    if (testAndMeasurementPartsCountTotal && testAndMeasurementPartsCountTotal > 0) {
      itemUsageColumns.push({
        header: 'Test and measurement parts',
        id: 'testAndMeasurementPartsCount',
        accessorFn: ({ testAndMeasurementPartsCount }) => testAndMeasurementPartsCount,
        footer: () => <span>{testAndMeasurementPartsCountTotal}</span>
      })
    }
    const stockItemsCountTotal = itemStatistics?.reduce(
      (acc, row) => (row.stockItemsCount ? acc + row.stockItemsCount : 0),
      0
    )
    if (stockItemsCountTotal && stockItemsCountTotal > 0) {
      itemUsageColumns.push({
        header: 'Stock items',
        id: 'stockItemsCount',
        accessorFn: ({ stockItemsCount }) => stockItemsCount,
        size: 70,
        footer: () => <span>{stockItemsCountTotal}</span>
      })
    }
    const othersCountTotal = itemStatistics?.reduce((acc, row) => acc + row.othersCount, 0)
    if (othersCountTotal && othersCountTotal > 0) {
      itemUsageColumns.push({
        header: 'Others',
        id: 'othersCount',
        accessorFn: ({ othersCount }) => othersCount,
        size: 50,
        footer: () => <span>{othersCountTotal}</span>
      })
    }

    const columns: ColumnDef<CatalogueStatistics, any>[] = [
      {
        header: 'Facility name',
        id: 'facililityName',
        accessorFn: ({ facilityName }) => facilityName,
        size: 100
      },
      {
        header: 'Total',
        id: 'total',
        accessorFn: ({ total }) => total,
        size: 50,
        footer: props => {
          const sum = props.table.getRowModel().rows.reduce((acc, row) => acc + row.original.total, 0)
          return <span>{sum}</span>
        }
      }
    ]

    if (itemUsageColumns.length > 0) {
      columns.push({
        header: 'Item usage',
        columns: itemUsageColumns
      })
    }

    return columns
  }, [itemStatistics])

  return columns
}
