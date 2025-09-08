import { Fragment } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table'
import { cn } from '@/lib/utils'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import { getFontBySystemLevel } from '../../utils'
import { AssignSparePartButton } from './AssignSparePartsButton'
import { SetMinimalSparesButton } from './SetMinimalSparesButton'
import { useSparePartsColumns } from './SpareParts.columns'

export const SparePartsContainer = () => {
  const columns = useSparePartsColumns()
  const { systemDetail } = useSystemDetail()
  const { control } = useFormContext()

  const sparePartsCoverageSum =
    systemDetail?.sparePartsCoverageSum ||
    systemDetail?.sparePartsConnection.edges.reduce(
      (acc, { coverage }) => coverage || 0 + acc,
      0
    )

  const minSparePartsCount = useWatch({
    control,
    name: 'minimalSpareParstCount'
  })

  return (
    <Fragment>
      <Heading
        className="mt-4"
        customText="Spare Parts"
        showBorder={false}
        titleNode={
          <div className="flex w-[300px] ml-4 items-center">
            <h3
              className={cn(
                'font-medium whitespace-nowrap mr-4',
                minSparePartsCount
                  ? sparePartsCoverageSum || 0 < minSparePartsCount
                    ? 'text-red-500 dark:text-red-500'
                    : 'text-green-500 dark:text-green-500'
                  : 'text-gray-500 dark:text-gray-300'
              )}
            >
              {`Available ${systemDetail?.sparePartsCoverageSum?.toFixed(2) || '0'} out of ${minSparePartsCount || '0'} required`}
            </h3>
            <SetMinimalSparesButton />
          </div>
        }
      >
        <AssignSparePartButton />
      </Heading>
      {systemDetail?.sparePartsConnection.edges &&
        systemDetail.sparePartsConnection.edges.length > 0 && (
          <Table<any>
            columns={columns}
            getRowProps={({ original }) => ({
              className: cn(
                original?.physicalItem && 'font-bold',
                getFontBySystemLevel(original?.systemLevel)
              )
            })}
            data={systemDetail?.sparePartsConnection.edges}
          />
        )}
    </Fragment>
  )
}
