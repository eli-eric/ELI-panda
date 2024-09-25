import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Input } from '@/components/form/inputs'
import { Heading } from '@/components/layout/Heading'
import { Tooltip } from '@/components/Tooltip'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import useTableStateStore from '@/store/useTableStateStore'
import { PATH } from '@/types/constants/paths'
import { classNames } from '@/utils'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import { getColorBySystemLevel, getFontBySystemLevel } from '../../utils'
import useSystemEditFormFields from '../form/SystemForm.fields'
import { useSparePartsColumns } from './SpareParts.columns'

export const SparePartsContainer = () => {
  const tableId = 'spareParts'
  const columns = useSparePartsColumns()
  const { systemDetail } = useSystemDetail()

  const fields = useSystemEditFormFields()

  const router = useRouter()

  const { setSearch } = useTableStateStore()
  const AssignSparePartButton = () => {
    return (
      <Tooltip content="Redirect to assign Spare Part page">
        <div>
          <PlusButton
            primary
            buttonSize="large"
            onClick={() => {
              setSearch('for-system', systemDetail?.uid)
              router.push(
                PATH.SPARE_PARTS + `?selectedUid=${systemDetail?.uid}`
              )
            }}
          />
        </div>
      </Tooltip>
    )
  }

  return (
    <Fragment>
      <Heading
        className="mt-4"
        customText="Spare Parts"
        titleNode={
          <div className="flex w-[300px] ml-4 items-center">
            <h3 className="text-lg font-medium whitespace-nowrap mr-2 text-red-500">
              {`${systemDetail?.sparePartsCoverageSum || 'N/A'} out of`}
            </h3>
            <Input className="mb-5" {...fields.minimalSpareParstCount} />
          </div>
        }
      >
        <AssignSparePartButton />
      </Heading>
      {systemDetail?.sparePartsConnection.edges &&
        systemDetail.sparePartsConnection.edges.length > 0 && (
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
            data={systemDetail?.sparePartsConnection.edges}
          />
        )}
    </Fragment>
  )
}
