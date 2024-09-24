import Link from 'next/link'
import { Fragment } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { PATH } from '@/types/constants/paths'
import { classNames } from '@/utils'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import { getColorBySystemLevel, getFontBySystemLevel } from '../../utils'
import { useSubSystemsColumns } from './SubSustems.columns'

export const SubSystemsContainer = () => {
  const tableId = 'subsystems'
  const columns = useSubSystemsColumns()
  const { systemDetail } = useSystemDetail()
  if (!systemDetail?.subSystems || systemDetail.subSystems.length < 1)
    return null

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
      <div className="max-h-[500px] overflow-auto min-h-0">
        <PandaTable
          columns={columns}
          tableId={tableId}
          className={'relative overflow-x-auto mb-0 pb-0'}
          settings={{ enableColumnReordering: false }}
          getRowProps={({ original }) => ({
            className: classNames(
              original?.physicalItem &&
                'font-bold text-gray-700 dark:text-gray-200',
              getColorBySystemLevel(original?.systemLevel),
              getFontBySystemLevel(original?.systemLevel),
              original?.sp_coverage != null &&
                original.sp_coverage < 1 &&
                'text-red-500 dark:text-red-500 font-bold'
            )
          })}
          data={systemDetail?.subSystems}
        />
      </div>
    </Fragment>
  )
}
