import { Fragment, useContext } from 'react'

import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { SystemDetailContext } from '@/pages/system/[uid]'

import { useSubsystemsColumns } from '../subsystems/SubSystems.columns'

export const SparePartsFor = () => {
  const columns = useSubsystemsColumns()
  const { systemDetail } = useContext(SystemDetailContext)
  if (!systemDetail?.sparePartsFor || systemDetail.sparePartsFor.length < 1) return null

  return (
    <Fragment>
      <Heading customText="Spare Part For Systems" />
      <PandaTable
        columns={columns}
        tableId={'subsystems'}
        className={'relative overflow-x-auto mb-0 pb-0'}
        data={systemDetail?.sparePartsFor || []}
      />
    </Fragment>
  )
}
