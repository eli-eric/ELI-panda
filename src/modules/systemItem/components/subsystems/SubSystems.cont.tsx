import { Network } from 'lucide-react'
import Link from 'next/link'

import { PlusButton } from '@/components/Buttons'
import { Table } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { PATH } from '@/types/constants/paths'

import { useSystemSubsystems } from '../../hooks/useSubsystems'
import { useSystemDetail } from '../../hooks/useSystemDetail'
import { getFontBySystemLevel } from '../../utils'
import { useSubSystemsColumns } from './SubSustems.columns'
import type { TableSystem } from './types'

export const SubSystemsContainer = () => {
  const columns = useSubSystemsColumns()
  const { subsystems, loading } = useSystemSubsystems()
  const { systemDetail } = useSystemDetail()

  const hasData = subsystems && subsystems.length > 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="size-6 text-primary" />
            <CardTitle>Subsystems</CardTitle>
          </div>
          <Link
            href={{
              pathname: PATH.SYSTEM,
              query: {
                parentUid: systemDetail?.uid
              }
            }}
          >
            <PlusButton />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border border-border rounded-lg">
          {hasData ? (
            <Table<TableSystem>
              columns={columns}
              loading={loading}
              enableFiltering
              enablePagination
              className="relative overflow-x-auto mb-0 pb-0"
              getRowProps={(
                { physicalItem, systemLevel, sp_coverage },
                index
              ) => ({
                className: cn(
                  physicalItem && 'font-bold',
                  getFontBySystemLevel(systemLevel || undefined),
                  sp_coverage != null &&
                    sp_coverage < 1 &&
                    'text-red-500 dark:text-red-500 font-bold'
                )
              })}
              data={subsystems as TableSystem[]}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {loading ? 'Loading subsystems...' : 'No subsystems found'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
