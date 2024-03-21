import { useRouter } from 'next/router'
import { Fragment, useContext } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { Tooltip } from '@/components/Tooltip'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { SystemDetailContext } from '@/pages/system/[uid]'
import { PATH } from '@/types/constants/paths'
import { classNames } from '@/utils'

import { getColorBySystemLevel, getFontBySystemLevel } from '../../utils'
import { useSubSystemsColumns } from '../spare-parts/SpareParts.columns'

export const SparePartsFor = () => {
  const tableId = 'sparePartFor'
  const columns = useSubSystemsColumns(tableId)
  const { systemDetail } = useContext(SystemDetailContext)
  const router = useRouter()
  const { setFilter } = useFormFilterState({ tableId: 'spare-parts', enableQueryUrl: false })

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
      <Heading customText="Designated spare part for">
        <AssignSparePartButton />
      </Heading>
      {systemDetail?.sparePartsFor && systemDetail.sparePartsFor.length > 0 && (
        <PandaTable
          columns={columns}
          getRowProps={({ original }) => ({
            className: classNames(
              original?.physicalItem && 'font-bold text-gray-700 dark:text-gray-200',
              getColorBySystemLevel(original?.systemLevel),
              getFontBySystemLevel(original?.systemLevel)
            )
          })}
          tableId={tableId}
          settings={{ enableColumnReordering: false }}
          className={'relative overflow-x-auto mb-0 pb-0'}
          data={systemDetail?.sparePartsFor || []}
        />
      )}
    </Fragment>
  )
}
