import { useRouter } from 'next/router'
import { Fragment, useContext } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { SystemDetailContext } from '@/pages/system/[uid]'
import { PATH } from '@/types/constants/paths'

import { useSubsystemsColumns } from '../subsystems/SubSystems.columns'

export const SparePartsContainer = () => {
  const columns = useSubsystemsColumns()
  const { systemDetail } = useContext(SystemDetailContext)

  const { setFilter } = useFormFilterState({ tableId: 'for-system', enableQueryUrl: false })
  const router = useRouter()

  const AssignSparePartButton = () => {
    return (
      <PlusButton
        primary
        onClick={() => {
          setFilter('name')(systemDetail?.name)
          router.push(PATH.SPARE_PARTS)
        }}
      />
    )
  }

  const Test = () => {
    return (
      <div>
        <span>test333</span>
      </div>
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
          tableId={'subsystems'}
          className={'relative overflow-x-auto mb-0 pb-0'}
          data={systemDetail?.spareParts}
        />
      )}
    </Fragment>
  )
}
