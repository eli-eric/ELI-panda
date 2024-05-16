import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { Tooltip } from '@/components/Tooltip'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { PATH } from '@/types/constants/paths'
import { classNames } from '@/utils'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import { getColorBySystemLevel, getFontBySystemLevel } from '../../utils'
import { useSubSystemsColumns } from './SpareParts.columns'

export const SparePartsContainer = () => {
  const tableId = 'spareParts'
  const columns = useSubSystemsColumns(tableId)
  const { systemDetail } = useSystemDetail()

  const { setFilter } = useFormFilterState({
    tableId: 'for-system',
    enableQueryUrl: false
  })
  const router = useRouter()

  const AssignSparePartButton = () => {
    return (
      <Tooltip content="Redirect to assign Spare Part page">
        <div>
          <PlusButton
            primary
            buttonSize="large"
            onClick={() => {
              setFilter('name')(systemDetail?.name)
              router.push(PATH.SPARE_PARTS)
            }}
          />
        </div>
      </Tooltip>
    )
  }

  return (
    <Fragment>
      <Heading customText="Spare Parts">
        <AssignSparePartButton />
      </Heading>
      {systemDetail?.spareParts && systemDetail.spareParts.length > 0 && (
        <PandaTable
          columns={columns}
          getRowProps={({ original }) => ({
            className: classNames(
              original?.physicalItem &&
                'font-bold text-gray-700 dark:text-gray-200',
              getColorBySystemLevel(original?.systemLevel),
              getFontBySystemLevel(original?.systemLevel)
            )
          })}
          settings={{ enableColumnReordering: false }}
          tableId={tableId}
          className={'relative overflow-x-auto mb-0 pb-0'}
          data={systemDetail?.spareParts}
        />
      )}
    </Fragment>
  )
}
