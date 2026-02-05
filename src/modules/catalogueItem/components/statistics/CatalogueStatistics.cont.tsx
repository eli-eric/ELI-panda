import { CatalogueStatisticsRedesign } from './CatalogueStatistics.redesign'

interface CatalogueStatisticsProps {
    catalogueItemUid?: string
    variant?: 'modal' | 'page' | 'compact'
    className?: string
}

export const CatalogueStatisticsContainer = ({
    catalogueItemUid,
    variant = 'page',
    className,
}: CatalogueStatisticsProps) => {
    return (
        <CatalogueStatisticsRedesign
            catalogueItemUid={catalogueItemUid}
            variant={variant}
            className={className}
        />
    )
}
