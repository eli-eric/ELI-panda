import { Wrench } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Table } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import { getFontBySystemLevel } from '../../utils'
import { AssignSparePartButton } from './AssignSparePartsButton'
import { SetMinimalSparesButton } from './SetMinimalSparesButton'
import { useSparePartsColumns } from './SpareParts.columns'

export const SparePartsContainer = () => {
  const columns = useSparePartsColumns()
  const { systemDetail } = useSystemDetail()
  const { control } = useFormContext()

  const sparePartsCoverageSum =
    systemDetail?.sparePartsCoverageSum ||
    systemDetail?.sparePartsConnection.edges.reduce(
      (acc, { coverage }) => coverage || 0 + acc,
      0
    )

  const minSparePartsCount = useWatch({
    control,
    name: 'minimalSpareParstCount'
  })

  const hasData =
    systemDetail?.sparePartsConnection.edges &&
    systemDetail.sparePartsConnection.edges.length > 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="size-6 text-primary" />
            <CardTitle className="flex items-center gap-2">
              Spare Parts
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'text-sm font-medium',
                    minSparePartsCount
                      ? (sparePartsCoverageSum || 0) < minSparePartsCount
                        ? 'text-destructive'
                        : 'text-green-600'
                      : 'text-muted-foreground'
                  )}
                >
                  {systemDetail?.sparePartsCoverageSum?.toFixed(2) || '0'} /{' '}
                  {minSparePartsCount || '0'}
                </span>
                <SetMinimalSparesButton />
              </div>
            </CardTitle>
          </div>
          <AssignSparePartButton />
        </div>
      </CardHeader>
      <CardContent>
        <div className="border border-border rounded-lg">
          {hasData ? (
            <Table<any>
              columns={columns}
              getRowProps={({ original }, index) => ({
                className: cn(
                  original?.physicalItem && 'font-bold',
                  getFontBySystemLevel(original?.systemLevel)
                )
              })}
              data={systemDetail?.sparePartsConnection.edges}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No spare parts assigned yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
