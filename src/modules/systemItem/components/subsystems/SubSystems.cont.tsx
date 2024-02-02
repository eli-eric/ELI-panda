import { Fragment, useContext } from 'react'

import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { SystemDetailContext } from '@/pages/system/[uid]'

import { useSubsystemsColumns } from './SubSystems.columns'

export const SubSystemsContainer = () => {
  const columns = useSubsystemsColumns()
  const { systemDetail } = useContext(SystemDetailContext)

  return (
    <Fragment>
      <Heading customText="SubSystems" />
      <PandaTable
        columns={columns}
        tableId={'subsystems'}
        className={'relative overflow-x-auto mb-0 pb-0'}
        data={systemDetail?.subSystems || []}
      />
    </Fragment>
  )
}
