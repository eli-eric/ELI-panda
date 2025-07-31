import {
  Archive,
  BarChart3,
  Building2,
  ChevronDown,
  FlaskConical,
  Gauge,
  MoreHorizontal,
  Package,
  Settings,
  Wrench
} from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

import { useItemsAggregate } from '../../hooks/useItemsAggregate'

interface CatalogueStatisticsProps {
  catalogueItemUid?: string
  variant?: 'modal' | 'page' | 'compact'
  className?: string
}

interface StatisticsCardProps {
  icon: React.ReactNode
  label: string
  value: number
  total: number
  color: string
  variant?: 'modal' | 'page' | 'compact'
  progressColor?: string
}

const StatisticsCard = ({
  icon,
  label,
  value,
  total,
  color,
  variant = 'page',
  progressColor
}: StatisticsCardProps) => {
  const percentage = total ? Math.round((value / total) * 100) : 0
  const isCompact = variant === 'compact'

  return (
    <Card className={cn('relative overflow-hidden', isCompact ? 'p-3' : 'p-4')}>
      <CardContent className={cn('space-y-2', isCompact ? 'p-0' : 'p-0 pt-2')}>
        <div className="flex items-center justify-between">
          <div
            className={cn(
              'flex items-center gap-2',
              isCompact ? 'text-xs' : 'text-sm'
            )}
          >
            <div
              className={cn(
                'flex items-center justify-center rounded-full',
                isCompact ? 'h-6 w-6' : 'h-8 w-8',
                color
              )}
            >
              {icon}
            </div>
            <span className="font-medium text-muted-foreground truncate">
              {label}
            </span>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              'font-mono',
              isCompact ? 'text-xs px-1.5 py-0.5' : 'text-sm'
            )}
          >
            {value}
          </Badge>
        </div>

        {!isCompact && total > 0 && (
          <div className="space-y-1">
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  'absolute left-0 top-0 h-full rounded-full transition-all',
                  progressColor || 'bg-primary'
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{percentage}% of total</span>
              <span>
                {value}/{total}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const getStatTypeConfig = (type: string) => {
  const configs = {
    sparePartsCount: {
      icon: <Wrench className="h-4 w-4" />,
      label: 'Spare Parts',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
      progressColor: 'bg-blue-500'
    },
    inSystemPartsCount: {
      icon: <Settings className="h-4 w-4" />,
      label: 'In System Parts',
      color:
        'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
      progressColor: 'bg-green-500'
    },
    experimentalLoanPoolPartsCount: {
      icon: <FlaskConical className="h-4 w-4" />,
      label: 'Experimental Pool',
      color:
        'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
      progressColor: 'bg-purple-500'
    },
    testAndMeasurementPartsCount: {
      icon: <Gauge className="h-4 w-4" />,
      label: 'Test & Measurement',
      color:
        'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300',
      progressColor: 'bg-orange-500'
    },
    stockItemsCount: {
      icon: <Archive className="h-4 w-4" />,
      label: 'Stock Items',
      color: 'bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300',
      progressColor: 'bg-teal-500'
    },
    othersCount: {
      icon: <MoreHorizontal className="h-4 w-4" />,
      label: 'Others',
      color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
      progressColor: 'bg-gray-500'
    }
  }
  return (
    configs[type as keyof typeof configs] || {
      icon: <Package className="h-4 w-4" />,
      label: type,
      color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
      progressColor: 'bg-gray-500'
    }
  )
}

export const CatalogueStatisticsRedesign = ({
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
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <CardTitle>Physical Items Statistics</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!itemStatistics || itemStatistics.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <CardTitle>Physical Items Statistics</CardTitle>
          </div>
          <CardDescription>
            No statistics available for this item
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Calculate totals across all facilities
  const totals = itemStatistics.reduce(
    (acc, stat) => ({
      total: acc.total + stat.total,
      sparePartsCount: acc.sparePartsCount + stat.sparePartsCount,
      inSystemPartsCount: acc.inSystemPartsCount + stat.inSystemPartsCount,
      experimentalLoanPoolPartsCount:
        acc.experimentalLoanPoolPartsCount +
        stat.experimentalLoanPoolPartsCount,
      testAndMeasurementPartsCount:
        acc.testAndMeasurementPartsCount + stat.testAndMeasurementPartsCount,
      stockItemsCount: acc.stockItemsCount + stat.stockItemsCount,
      othersCount: acc.othersCount + stat.othersCount,
      facilityName: 'All Facilities'
    }),
    {
      total: 0,
      sparePartsCount: 0,
      inSystemPartsCount: 0,
      experimentalLoanPoolPartsCount: 0,
      testAndMeasurementPartsCount: 0,
      stockItemsCount: 0,
      othersCount: 0,
      facilityName: 'All Facilities'
    }
  )

  // Get current data (either totals or specific facility)
  const currentData =
    selectedFacility === 'all'
      ? totals
      : itemStatistics.find(f => f.facilityName === selectedFacility) || totals

  // For progress bars, use totals as reference
  const referenceTotal =
    selectedFacility === 'all' ? totals.total : totals.total

  // Filter out categories with zero values from current data
  const relevantStats = Object.entries(currentData)
    .filter(
      ([key, value]) => key !== 'total' && key !== 'facilityName' && typeof value === 'number' && value > 0
    )
    .map(([key, value]) => ({ key, value: value as number }))

  const isCompact = variant === 'compact'
  const gridCols =
    variant === 'modal'
      ? 'grid-cols-2'
      : variant === 'compact'
        ? 'grid-cols-1'
        : 'grid-cols-3'

  return (
    <Card className={className}>
      <CardHeader className={cn(isCompact && 'pb-3')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle className={cn(isCompact ? 'text-base' : 'text-lg')}>
              Physical Items Statistics
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {/* Facility Selector - always show unless compact */}
            {variant !== 'compact' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Building2 className="h-4 w-4" />
                    {selectedFacility === 'all'
                      ? 'All Facilities'
                      : selectedFacility}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() => setSelectedFacility('all')}
                    className={cn(selectedFacility === 'all' && 'bg-accent')}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    All Facilities
                  </DropdownMenuItem>
                  {itemStatistics.map(facility => (
                    <DropdownMenuItem
                      key={facility.facilityName}
                      onClick={() => setSelectedFacility(facility.facilityName)}
                      className={cn(
                        selectedFacility === facility.facilityName &&
                          'bg-accent'
                      )}
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
              {currentData.total} items
            </Badge>
          </div>
        </div>
        {!isCompact && (
          <CardDescription>
            {selectedFacility === 'all'
              ? `Total across ${itemStatistics.length} facilities`
              : `Statistics for ${selectedFacility} facility`}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Statistics Grid */}
        <div className={cn('grid gap-3', gridCols)}>
          {relevantStats.map(({ key, value }) => {
            const config = getStatTypeConfig(key)
            return (
              <StatisticsCard
                key={key}
                icon={config.icon}
                label={config.label}
                value={value}
                total={referenceTotal}
                color={config.color}
                progressColor={config.progressColor}
                variant={variant}
              />
            )
          })}
        </div>

        {/* Facilities Overview - only show when viewing 'all' and multiple facilities exist */}
        {variant !== 'compact' &&
          selectedFacility === 'all' &&
          itemStatistics.length > 1 && (
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Facilities Overview
              </h4>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {itemStatistics.map((facility, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="flex items-center justify-between p-3 h-auto rounded-lg border hover:bg-accent"
                    onClick={() => setSelectedFacility(facility.facilityName)}
                  >
                    <span className="text-sm font-medium truncate flex-1 text-left">
                      {facility.facilityName}
                    </span>
                    <Badge variant="secondary" className="font-mono ml-2">
                      {facility.total}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  )
}
