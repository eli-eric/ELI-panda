import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Button } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { Tooltip } from '@/components/Tooltip'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import useTableStateStore from '@/store/useTableStateStore'
import { PATH } from '@/types/constants/paths'
import { classNames } from '@/utils'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import { getColorBySystemLevel, getFontBySystemLevel } from '../../utils'
import { SetMinimalSparesButton } from './SetMinimalSparesButton'
import { useSparePartsColumns } from './SpareParts.columns'

export const SparePartsContainer = () => {
  const tableId = 'spareParts'
  const columns = useSparePartsColumns()
  const { systemDetail } = useSystemDetail()
  const { control } = useFormContext()

  const minSparePartsCount = useWatch({
    control,
    name: 'minimalSpareParstCount'
  })

  const router = useRouter()

  const { setSearch } = useTableStateStore()
  const AssignSparePartButton = () => {
    return (
      <Tooltip content="Redirect to assign Spare Part page">
        <div>
          <Button
            primary
            buttonSize="large"
            onClick={() => {
              setSearch('for-system', systemDetail?.uid)
              router.push(
                PATH.SPARE_PARTS + `?selectedUid=${systemDetail?.uid}`
              )
            }}
          >
            Assign Spare Parts
          </Button>
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
            <h3
              className={classNames(
                'font-medium whitespace-nowrap mr-4',
                systemDetail?.sparePartsCoverageSum && minSparePartsCount
                  ? systemDetail?.sparePartsCoverageSum < minSparePartsCount
                    ? 'text-red-500 dark:text-red-500'
                    : 'text-green-500 dark:text-green-500'
                  : 'text-gray-500 dark:text-gray-300'
              )}
            >
              {`Available ${systemDetail?.sparePartsCoverageSum || '0'} out of ${minSparePartsCount || '0'} required`}
            </h3>
            <SetMinimalSparesButton />
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
