import type { FC } from 'react'

import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'

import { SERVICES_ID } from '../../types/constants'
import { useServicesColumns } from './services.columns'

export const ServicesTable: FC = () => {
  const columns = useServicesColumns()

  const table = usePandaTable({ tableId: SERVICES_ID, columns })

  return <PandaTableV2 tableId={SERVICES_ID} table={table} />
}
