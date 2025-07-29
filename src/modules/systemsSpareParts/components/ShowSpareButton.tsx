import type { FC } from 'react'
import { Fragment } from 'react'

import { TableStatsButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { Tooltip } from '@/components/Tooltip'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import {
  useGetSpareParts,
  useGetSparePartsFor
} from '../hooks/useGetSpareParts'
import { useSparePartsColumns } from './SpareParts.columns'

interface ShowSpareButtonProps {
  tableId: string
  uid: string
  sparesIn?: number
  sparesOut?: number
}

const SparePartsModal: FC<ShowSpareButtonProps> = ({ uid }) => {
  const { spareParts, loading } = useGetSpareParts(uid)
  const sparePartsColumns = useSparePartsColumns({ tableId: 'sparePartsModal' })
  return (
    <Fragment>
      <Heading customText="Spare Parts:" />
      <PandaTable
        {...{
          tableId: 'sparePartsModal',
          data: spareParts,
          columns: sparePartsColumns,
          loading,
          className: 'relative overflow-x-auto'
        }}
      />
    </Fragment>
  )
}

const SparePartsForModal: FC<ShowSpareButtonProps> = ({ uid }) => {
  const { spareParts, loading } = useGetSparePartsFor(uid)
  const sparePartsColumns = useSparePartsColumns({
    tableId: 'sparePartsForModal'
  })
  return (
    <Fragment>
      <Heading customText="Spare Part for Systems:" />
      <PandaTable
        {...{
          tableId: 'sparePartsForModal',
          data: spareParts,
          columns: sparePartsColumns,
          loading,
          className: 'relative overflow-x-auto'
        }}
      />
    </Fragment>
  )
}

export const ShowSpareButton: FC<ShowSpareButtonProps> = ({
  uid,
  tableId,
  sparesIn,
  sparesOut
}) => {
  const openModal = useModalGlobalStore(state => state.openModal)
  const handleSpareShow = () =>
    openModal('dialog1', {
      component: SparePartsModal,
      props: { tableId, uid }
    })
  const handleSpareForShow = () =>
    openModal('dialog1', {
      component: SparePartsForModal,
      props: { tableId, uid }
    })

  const isSparePartsTable =
    tableId === 'spare-parts' && (sparesOut === 0 || !sparesOut)
  const isForSystemTable =
    tableId === 'for-system' && (sparesIn === 0 || !sparesIn)
  const isSystemsTable = tableId === 'systems'

  if (isSparePartsTable || isForSystemTable) return null

  if (isSystemsTable) {
    const hasSparesIn = sparesIn && sparesIn > 0
    const hasSparesOut = sparesOut && sparesOut > 0

    if (hasSparesIn && hasSparesOut) {
      return (
        <div className="flex items-center">
          <Tooltip content="Spare Parts">
            <div className="flex items-center">
              <TableStatsButton onClick={handleSpareShow} />
            </div>
          </Tooltip>
          <Tooltip content="Spare Part for Systems">
            <div className="flex items-center">
              <TableStatsButton onClick={handleSpareForShow} />
            </div>
          </Tooltip>
        </div>
      )
    } else if (hasSparesIn) {
      return <TableStatsButton onClick={handleSpareShow} />
    } else if (hasSparesOut) {
      return <TableStatsButton onClick={handleSpareForShow} />
    } else {
      return null
    }
  }

  return (
    <TableStatsButton
      onClick={tableId === 'spare-parts' ? handleSpareForShow : handleSpareShow}
    />
  )
}
