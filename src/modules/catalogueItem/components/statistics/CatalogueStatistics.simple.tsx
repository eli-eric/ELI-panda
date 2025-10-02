import { BarChart3, Building2, ChevronDown, Package } from 'lucide-react'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { message } from '@/i18n/src/messages'

import { useItemsAggregate } from '../../hooks/useItemsAggregate'

interface CatalogueStatisticsProps {
  catalogueItemUid?: string
  variant?: 'modal' | 'page' | 'compact'
  className?: string
}

export const CatalogueStatisticsSimple = ({
  catalogueItemUid,
  variant = 'page',
  className
}: CatalogueStatisticsProps) => {
  const { formatMessage: fm } = useIntl()
  const { itemStatistics, loading } = useItemsAggregate(catalogueItemUid)
  const [selectedFacility, setSelectedFacility] = useState<string>('all')

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{fm({ id: message.common.ui.loading })}</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (!itemStatistics || itemStatistics.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>
            {fm({ id: message.common.ui.noStatisticsAvailable })}
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>
              {fm({ id: message.common.ui.physicalItemsStatistics })}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {/* Always show dropdown in modal/page variants */}
            {variant !== 'compact' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Building2 className="h-4 w-4" />
                    {selectedFacility === 'all'
                      ? fm({ id: message.common.ui.allFacilities })
                      : selectedFacility}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setSelectedFacility('all')}>
                    <Package className="h-4 w-4 mr-2" />
                    {fm({ id: message.common.ui.allFacilities })}
                  </DropdownMenuItem>
                  {itemStatistics.map((facility, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => setSelectedFacility(facility.facilityName)}
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      {facility.facilityName}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Badge variant="outline" className="font-mono">
              <Package className="h-3 w-3 mr-1" />
              {fm(
                { id: message.common.ui.itemsCount },
                { count: itemStatistics.reduce((acc, s) => acc + s.total, 0) }
              )}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          {fm(
            { id: message.common.ui.foundFacilities },
            { count: itemStatistics.length }
          )}
        </div>

        {/* Debug Info */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">{fm({ id: message.common.ui.debugInfo })}</h4>
          <pre className="text-xs bg-muted p-2 rounded overflow-auto">
            {JSON.stringify(itemStatistics, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
