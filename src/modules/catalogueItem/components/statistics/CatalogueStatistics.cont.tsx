import { Fragment } from 'react'

import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'

import { useItemsAggregate } from '../../hooks/useItemsAggregate'
import { useCatalogueStatisticsColumns } from './CatalogueStatistics.columns'

interface CatalogueStatisticsProps {
  catalogueItemUid?: string
}

export const CatalogueStatisticsContainer = ({
  catalogueItemUid
}: CatalogueStatisticsProps) => {
  const tableId = 'catalogueStatistics'
  const { itemStatistics, loading } = useItemsAggregate(catalogueItemUid)
  const columns = useCatalogueStatisticsColumns(itemStatistics)

  return (
    <Fragment>
      <Heading customText="Statistics: Physical Items Inventory" />
      {itemStatistics && itemStatistics.length === 0 ? (
        <div className="flex justify-center items-center h-16">
          <span className="text-2xl text-gray-500">
            No statistics available
          </span>
        </div>
      ) : (
        <PandaTable
          {...{
            tableId,
            data: itemStatistics,
            columns: columns,
            loading,
            settings: {
              enableFooter: true
            },
            className: 'relative overflow-x-auto'
          }}
        />
      )}
    </Fragment>
  )
}
