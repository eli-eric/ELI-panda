import Link from 'next/link'
import { Fragment } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui'
import { PATH } from '@/types/constants/paths'
import { cx } from '@/utils'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import { getColorBySystemLevel, getFontBySystemLevel } from '../../utils'
import { useSubSystemsColumns } from './SubSustems.columns'
import type { TableSystem } from './types'

export const SubSystemsContainer = () => {
  const columns = useSubSystemsColumns()
  const { systemDetail } = useSystemDetail()
  if (!systemDetail?.subSystems || systemDetail.subSystems.length < 1)
    return null

  return (
    <Fragment>
      <Heading customText="Sub Systems" showBorder={false}>
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
      <Table<TableSystem>
        columns={columns}
        enableFiltering
        enablePagination
        className={'relative overflow-x-auto mb-0 pb-0'}
        getRowProps={({ physicalItem, systemLevel, statistics }, index) => ({
          className: cx(
            physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
            getColorBySystemLevel(systemLevel || undefined, index),
            getFontBySystemLevel(systemLevel || undefined),
            statistics?.sp_coverage != null &&
              statistics.sp_coverage < 1 &&
              'text-red-500 dark:text-red-500 font-bold'
          )
        })}
        data={systemDetail?.subSystems as TableSystem[]}
      />
    </Fragment>
  )
}
