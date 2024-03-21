import Link from 'next/link'
import { Fragment, useContext } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { SystemDetailContext } from '@/pages/system/[uid]'
import { PATH } from '@/types/constants/paths'
import { classNames } from '@/utils'

import { getColorBySystemLevel, getFontBySystemLevel } from '../../utils'
import { useSubSystemsColumns } from '../spare-parts/SpareParts.columns'

export const SubSystemsContainer = () => {
  const tableId = 'subsystems'
  const columns = useSubSystemsColumns(tableId)
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
        tableId={tableId}
        className={'relative overflow-x-auto mb-0 pb-0'}
        settings={{ enableColumnReordering: false }}
        getRowProps={({ original }) => ({
          className: classNames(
            original?.physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
            getColorBySystemLevel(original?.systemLevel),
            getFontBySystemLevel(original?.systemLevel)
          )
        })}
        data={systemDetail?.subSystems}
      />
    </Fragment>
  )
}
