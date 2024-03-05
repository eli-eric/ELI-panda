import { Fragment, useContext } from 'react'

import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { SystemDetailContext } from '@/pages/system/[uid]'

import { useSubsystemsColumns } from '../subsystems/SubSystems.columns'

export const SparePartsContainer = () => {
  const columns = useSubsystemsColumns()
  const { systemDetail } = useContext(SystemDetailContext)

  if (!systemDetail?.spareParts || systemDetail.spareParts.length < 1) return null

  return (
    <Fragment>
      <Heading customText="Spare Parts" />
      <PandaTable
        columns={columns}
        tableId={'subsystems'}
        className={'relative overflow-x-auto mb-0 pb-0'}
        data={systemDetail?.spareParts || []}
      />
    </Fragment>
  )
}
