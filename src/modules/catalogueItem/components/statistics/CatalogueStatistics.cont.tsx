import { Table } from '@/components/ui/table'

import { useItemsAggregate } from '../../hooks/useItemsAggregate'
import { useCatalogueStatisticsColumns } from './CatalogueStatistics.columns'

interface CatalogueStatisticsProps {
  catalogueItemUid?: string
}

export const CatalogueStatisticsContainer = ({
  catalogueItemUid
}: CatalogueStatisticsProps) => {
  const { itemStatistics, loading } = useItemsAggregate(catalogueItemUid)
  const columns = useCatalogueStatisticsColumns(itemStatistics)

  return (
    <Table
      data={itemStatistics || []}
      emptyMessage="No statistics available"
      columns={columns}
      loading={loading}
      enableFooter={true}
      className="relative overflow-x-auto"
    />
  )
}
