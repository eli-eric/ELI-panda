import type { ColumnDef } from '@tanstack/react-table'
import type { FC, PropsWithChildren } from 'react'
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

const FooterBold: FC<PropsWithChildren> = ({ children }) => (
    <div className="font-bold text-right w-full">{children}</div>
)

export const useCatalogueStatisticsColumns = (itemStatistics?: CatalogueStatistics[]) => {
    const columns = useMemo((): ColumnDef<CatalogueStatistics, any>[] => {
        const itemUsageColumns: ColumnDef<CatalogueStatistics, any>[] = []

        const sparePartsCountTotal = itemStatistics?.reduce(
            (acc, row) => acc + row.sparePartsCount,
            0,
        )
        if (sparePartsCountTotal && sparePartsCountTotal > 0) {
            itemUsageColumns.push({
                header: 'Spare parts',
                id: 'sparePartsCount',
                accessorFn: ({ sparePartsCount }) => sparePartsCount,
                size: 70,
                meta: { className: 'text-right' },
                footer: () => <FooterBold>{sparePartsCountTotal}</FooterBold>,
            })
        }

        const inSystemPartsCountTotal = itemStatistics?.reduce(
            (acc, row) => acc + row.inSystemPartsCount,
            0,
        )
        if (inSystemPartsCountTotal && inSystemPartsCountTotal > 0) {
            itemUsageColumns.push({
                header: 'In system parts',
                id: 'inSystemPartsCount',
                accessorFn: ({ inSystemPartsCount }) => inSystemPartsCount,
                size: 90,
                meta: { className: 'text-right' },
                footer: () => <FooterBold>{inSystemPartsCountTotal}</FooterBold>,
            })
        }

        const experimentalLoanPoolPartsCountTotal = itemStatistics?.reduce(
            (acc, row) => acc + row.experimentalLoanPoolPartsCount,
            0,
        )
        if (experimentalLoanPoolPartsCountTotal && experimentalLoanPoolPartsCountTotal > 0) {
            itemUsageColumns.push({
                header: 'Experimental loan pool parts',
                id: 'experimentalLoanPoolPartsCount',
                accessorFn: ({ experimentalLoanPoolPartsCount }) => experimentalLoanPoolPartsCount,
                meta: { className: 'text-right' },
                footer: () => <FooterBold>{experimentalLoanPoolPartsCountTotal}</FooterBold>,
            })
        }

        const testAndMeasurementPartsCountTotal = itemStatistics?.reduce(
            (acc, row) => acc + row.testAndMeasurementPartsCount,
            0,
        )
        if (testAndMeasurementPartsCountTotal && testAndMeasurementPartsCountTotal > 0) {
            itemUsageColumns.push({
                header: 'Test and measurement parts',
                id: 'testAndMeasurementPartsCount',
                meta: { className: 'text-right' },
                accessorFn: ({ testAndMeasurementPartsCount }) => testAndMeasurementPartsCount,
                footer: () => <FooterBold>{testAndMeasurementPartsCountTotal}</FooterBold>,
            })
        }

        const stockItemsCountTotal = itemStatistics?.reduce(
            (acc, row) => acc + row.stockItemsCount,
            0,
        )
        if (stockItemsCountTotal && stockItemsCountTotal > 0) {
            itemUsageColumns.push({
                header: 'Stock items',
                id: 'stockItemsCount',
                meta: { className: 'text-right' },
                accessorFn: ({ stockItemsCount }) => stockItemsCount,
                size: 70,
                footer: () => <FooterBold>{stockItemsCountTotal}</FooterBold>,
            })
        }

        const othersCountTotal = itemStatistics?.reduce((acc, row) => acc + row.othersCount, 0)
        if (othersCountTotal && othersCountTotal > 0) {
            itemUsageColumns.push({
                header: 'Others',
                id: 'othersCount',
                accessorFn: ({ othersCount }) => othersCount,
                size: 50,
                meta: { className: 'text-right' },
                footer: () => <FooterBold>{othersCountTotal}</FooterBold>,
            })
        }

        const columns: ColumnDef<CatalogueStatistics, any>[] = [
            {
                header: 'Facility name',
                id: 'facililityName',
                accessorFn: ({ facilityName }) => facilityName,
                size: 100,
            },
            {
                header: 'Total',
                id: 'total',
                accessorFn: ({ total }) => total,
                size: 50,
                meta: { className: 'text-right' },

                footer: props => {
                    const sum = props.table
                        .getRowModel()
                        .rows.reduce((acc, row) => acc + row.original.total, 0)
                    return <FooterBold>{sum}</FooterBold>
                },
            },
        ]

        if (itemUsageColumns.length > 0) {
            columns.push({
                header: 'Item usage',
                columns: itemUsageColumns,
            })
        }

        return columns
    }, [itemStatistics])

    return columns
}
