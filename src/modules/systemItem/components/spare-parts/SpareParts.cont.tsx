import { Fragment } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { classNames } from '@/utils'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import { getColorBySystemLevel, getFontBySystemLevel } from '../../utils'
import { AssignSparePartButton } from './AssignSparePartsButton'
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
