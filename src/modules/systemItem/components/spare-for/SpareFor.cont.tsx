import { Target } from 'lucide-react'
import { useRouter } from 'next/router'

import { PlusButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { cn } from '@/lib/utils'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { PATH } from '@/types/constants/paths'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import { getFontBySystemLevel } from '../../utils'
import { useSpareForColumns } from './SpareFor.columns'

export const SparePartsFor = () => {
  const tableId = 'sparePartFor'
  const columns = useSpareForColumns(tableId)

  const { systemDetail } = useSystemDetail()
  const router = useRouter()
  const { setFilter } = useFormFilterState({
    tableId: 'spare-parts',
    enableQueryUrl: false
  })

  const AssignSparePartButton = () => {
    return (
      <Tooltip content="Redirect to assign Spare Part page">
        <div>
          <PlusButton
            onClick={() => {
              setFilter('name')(systemDetail?.name)
              router.push(PATH.SPARE_PARTS)
            }}
          />
        </div>
      </Tooltip>
    )
  }

  const hasData =
    systemDetail?.sparePartsFor && systemDetail.sparePartsFor.length > 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="size-6 text-primary" />
            <CardTitle>Designated Spare Part For</CardTitle>
          </div>
          <AssignSparePartButton />
        </div>
      </CardHeader>
      <CardContent>
        <div className="border border-border rounded-lg">
          {hasData ? (
            <PandaTable
              columns={columns}
              getRowProps={({ original }) => ({
                className: cn(
                  original?.physicalItem && 'font-bold',
                  getFontBySystemLevel(original?.systemLevel)
                )
              })}
              tableId={tableId}
              settings={{ enableColumnReordering: false }}
              className="relative overflow-x-auto mb-0 pb-0"
              data={systemDetail?.sparePartsFor || []}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              This system is not designated as a spare part for any other systems
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
