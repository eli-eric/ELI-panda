import { BarChart3, Building2, ChevronDown, Package } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

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
  const { itemStatistics, loading } = useItemsAggregate(catalogueItemUid)
  const [selectedFacility, setSelectedFacility] = useState<string>('all')

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  if (!itemStatistics || itemStatistics.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>No statistics available</CardTitle>
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
            <CardTitle>Physical Items Statistics</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {/* Always show dropdown in modal/page variants */}
            {variant !== 'compact' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Building2 className="h-4 w-4" />
                    {selectedFacility === 'all' ? 'All Facilities' : selectedFacility}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setSelectedFacility('all')}>
                    <Package className="h-4 w-4 mr-2" />
                    All Facilities
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
              {itemStatistics.reduce((acc, s) => acc + s.total, 0)} items
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Found {itemStatistics.length} facilities
        </div>
        
        {/* Debug Info */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Debug Info:</h4>
          <pre className="text-xs bg-muted p-2 rounded overflow-auto">
            {JSON.stringify(itemStatistics, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}