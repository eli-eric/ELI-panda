import Link from 'next/link'
import { Fragment, useContext } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { SystemDetailContext } from '@/pages/system/[uid]'
import { PATH } from '@/types/constants/paths'

import { useSubsystemsColumns } from './SubSystems.columns'

export const SubSystemsContainer = () => {
  const columns = useSubsystemsColumns()
  const { systemDetail } = useContext(SystemDetailContext)
  if (!systemDetail?.subSystems || systemDetail.subSystems.length < 1) return null

  return (
    <Fragment>
      <Heading customText="Sub Systems">
        <Link
          href={{
            pathname: PATH.SYSTEM,
            query: {
              parentUid: systemDetail.uid
            }
          }}
        >
          <PlusButton buttonSize="large" primary />
        </Link>
      </Heading>
      <PandaTable
        columns={columns}
        tableId={'subsystems'}
        className={'relative overflow-x-auto mb-0 pb-0'}
        data={systemDetail?.subSystems}
      />
    </Fragment>
  )
}
