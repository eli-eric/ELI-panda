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
    Wrench,
} from 'lucide-react'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { message } from '@/i18n/src/messages'
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
    progressColor,
}: StatisticsCardProps) => {
    const { formatMessage: fm } = useIntl()
    const percentage = total ? Math.round((value / total) * 100) : 0
    const isCompact = variant === 'compact'
    const isMobile = variant === 'modal' // In modals, assume mobile-like behavior

    return (
        <Card
            className={cn('relative overflow-hidden', isCompact ? 'p-2' : isMobile ? 'p-3' : 'p-4')}
        >
            <CardContent className={cn('space-y-2', isCompact ? 'p-0' : 'p-0 pt-1')}>
                {/* Mobile-first layout: stack on very small screens */}
                <div
                    className={cn(
                        'flex flex-col sm:flex-row sm:items-center sm:justify-between',
                        'gap-2 sm:gap-3',
                    )}
                >
                    <div
                        className={cn(
                            'flex items-center gap-2 min-w-0',
                            isCompact ? 'text-xs' : isMobile ? 'text-sm' : 'text-sm',
                        )}
                    >
                        <div
                            className={cn(
                                'flex items-center justify-center rounded-full flex-shrink-0',
                                isCompact ? 'h-6 w-6' : isMobile ? 'h-7 w-7' : 'h-8 w-8',
                                color,
                            )}
                        >
                            {icon}
                        </div>
                        <span
                            className={cn(
                                'font-medium text-muted-foreground min-w-0',
                                isMobile ? 'text-xs sm:text-sm' : 'text-sm',
                            )}
                        >
                            {label}
                        </span>
                    </div>
                    <Badge
                        variant="secondary"
                        className={cn(
                            'font-mono flex-shrink-0 self-start sm:self-center',
                            isCompact
                                ? 'text-xs px-1.5 py-0.5'
                                : isMobile
                                  ? 'text-xs px-2 py-1'
                                  : 'text-sm',
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
                                    progressColor || 'bg-primary',
                                )}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                        <div
                            className={cn(
                                'flex justify-between text-muted-foreground',
                                isMobile ? 'text-xs' : 'text-xs',
                            )}
                        >
                            <span>
                                {percentage}
                                {fm({ id: message.common.ui.ofTotalPercent })}
                            </span>
                            <span className="font-mono">
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
            color: 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300',
            progressColor: 'bg-red-500',
        },
        inSystemPartsCount: {
            icon: <Settings className="h-4 w-4" />,
            label: 'In System Parts',
            color: 'bg-cyan-100 text-cyan-500 dark:bg-cyan-900 dark:text-cyan-300',
            progressColor: 'bg-cyan-500',
        },
        experimentalLoanPoolPartsCount: {
            icon: <FlaskConical className="h-4 w-4" />,
            label: 'Experimental Pool',
            color: 'bg-purple-100 text-purple-500 dark:bg-purple-900 dark:text-purple-300',
            progressColor: 'bg-purple-500',
        },
        testAndMeasurementPartsCount: {
            icon: <Gauge className="h-4 w-4" />,
            label: 'Test & Measurement',
            color: 'bg-teal-100 text-teal-500 dark:bg-teal-900 dark:text-teal-300',
            progressColor: 'bg-teal-500',
        },
        stockItemsCount: {
            icon: <Archive className="h-4 w-4" />,
            label: 'Stock Items',
            color: 'bg-indigo-100 text-indigo-500 dark:bg-indigo-900 dark:text-indigo-300',
            progressColor: 'bg-indigo-500',
        },
        othersCount: {
            icon: <MoreHorizontal className="h-4 w-4" />,
            label: 'Others',
            color: 'bg-amber-100 text-amber-500 dark:bg-amber-900 dark:text-amber-300',
            progressColor: 'bg-amber-500',
        },
    }
    return (
        configs[type as keyof typeof configs] || {
            icon: <Package className="h-4 w-4" />,
            label: type,
            color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
            progressColor: 'bg-gray-500',
        }
    )
}

export const CatalogueStatisticsRedesign = ({
    catalogueItemUid,
    variant = 'page',
    className,
}: CatalogueStatisticsProps) => {
    const { formatMessage: fm } = useIntl()
    const { itemStatistics, loading } = useItemsAggregate(catalogueItemUid)
    const [selectedFacility, setSelectedFacility] = useState<string>('all')

    if (loading) {
        return (
            <Card className={className}>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        <CardTitle>
                            {fm({ id: message.common.ui.physicalItemsStatistics })}
                        </CardTitle>
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
                        <CardTitle>
                            {fm({ id: message.common.ui.physicalItemsStatistics })}
                        </CardTitle>
                    </div>
                    <CardDescription>
                        {fm({ id: message.common.ui.noStatisticsAvailableForItem })}
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
                acc.experimentalLoanPoolPartsCount + stat.experimentalLoanPoolPartsCount,
            testAndMeasurementPartsCount:
                acc.testAndMeasurementPartsCount + stat.testAndMeasurementPartsCount,
            stockItemsCount: acc.stockItemsCount + stat.stockItemsCount,
            othersCount: acc.othersCount + stat.othersCount,
            facilityName: 'All Facilities',
        }),
        {
            total: 0,
            sparePartsCount: 0,
            inSystemPartsCount: 0,
            experimentalLoanPoolPartsCount: 0,
            testAndMeasurementPartsCount: 0,
            stockItemsCount: 0,
            othersCount: 0,
            facilityName: 'All Facilities',
        },
    )

    // Get current data (either totals or specific facility)
    const currentData =
        selectedFacility === 'all'
            ? totals
            : itemStatistics.find(f => f.facilityName === selectedFacility) || totals

    // For progress bars, use totals as reference
    const referenceTotal = selectedFacility === 'all' ? totals.total : totals.total

    // Filter out categories with zero values from current data
    const relevantStats = Object.entries(currentData)
        .filter(
            ([key, value]) =>
                key !== 'total' && key !== 'facilityName' && typeof value === 'number' && value > 0,
        )
        .map(([key, value]) => ({ key, value: value as number }))

    const isCompact = variant === 'compact'
    const gridCols =
        variant === 'modal'
            ? 'grid-cols-1 sm:grid-cols-2'
            : variant === 'compact'
              ? 'grid-cols-1'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

    return (
        <Card className={className}>
            <CardHeader className={cn(isCompact && 'pb-3', 'pb-4')}>
                {/* Mobile-first header layout */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Title row - always full width on mobile */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                            <CardTitle
                                className={cn(
                                    'truncate',
                                    isCompact ? 'text-sm' : 'text-base sm:text-lg',
                                )}
                            >
                                {fm({ id: message.common.ui.physicalItemsStatistics })}
                            </CardTitle>
                        </div>
                        {/* Items badge - always visible */}
                        <Badge
                            variant="outline"
                            className="font-mono flex-shrink-0 text-xs sm:text-sm"
                        >
                            <Package className="h-3 w-3 mr-1" />
                            {currentData.total}
                        </Badge>
                    </div>

                    {/* Controls row - stack on mobile */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        {/* Description */}
                        {!isCompact && (
                            <CardDescription className="text-xs sm:text-sm order-2 sm:order-1">
                                {selectedFacility === 'all'
                                    ? `Total across ${itemStatistics.length} facilities`
                                    : `Statistics for ${selectedFacility} facility`}
                            </CardDescription>
                        )}

                        {/* Facility Selector - full width on mobile */}
                        {variant !== 'compact' && (
                            <div className="order-1 sm:order-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full sm:w-auto justify-between sm:justify-center gap-2"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Building2 className="h-4 w-4" />
                                                <span className="truncate max-w-[120px] sm:max-w-none">
                                                    {selectedFacility === 'all'
                                                        ? fm({
                                                              id: message.common.ui.allFacilities,
                                                          })
                                                        : selectedFacility}
                                                </span>
                                            </div>
                                            <ChevronDown className="h-4 w-4 flex-shrink-0" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuItem
                                            onClick={() => setSelectedFacility('all')}
                                            className={cn(
                                                selectedFacility === 'all' && 'bg-accent',
                                            )}
                                        >
                                            <Package className="h-4 w-4 mr-2" />
                                            {fm({ id: message.common.ui.allFacilities })}
                                        </DropdownMenuItem>
                                        {itemStatistics.map(facility => (
                                            <DropdownMenuItem
                                                key={facility.facilityName}
                                                onClick={() =>
                                                    setSelectedFacility(facility.facilityName)
                                                }
                                                className={cn(
                                                    selectedFacility === facility.facilityName &&
                                                        'bg-accent',
                                                )}
                                            >
                                                <Building2 className="h-4 w-4 mr-2" />
                                                {facility.facilityName}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}
                    </div>
                </div>
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
                                {fm({ id: message.common.ui.facilitiesOverview })}
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
