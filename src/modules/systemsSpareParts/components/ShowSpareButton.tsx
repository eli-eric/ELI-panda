import type { FC } from 'react'
import { Fragment } from 'react'

import { TableStatsButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { useModal } from '@/hooks/useModal'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'

import { useGetSpareParts, useGetSparePartsFor } from '../hooks/useGetSpareParts'
import { useSparePartsColumns } from './SpareParts.columns'

interface ShowSpareButtonProps {
  tableId: string
  uid: string
  sparesIn: number
  sparesOut: number
}

export const ShowSpareButton: FC<ShowSpareButtonProps> = ({ uid, tableId, sparesIn, sparesOut }) => {
  const setSpareShow = useModal(<SparePartsModal uid={uid} />)
  const setSpareForShow = useModal(<SparePartsForModal uid={uid} />)
  if (tableId === 'spare-parts' && sparesOut === 0) return null
  if (tableId === 'for-system' && sparesIn === 0) return null

  return <TableStatsButton onClick={tableId === 'spare-parts' ? setSpareForShow() : setSpareShow()} />
}

interface SpareModalProps {
  uid: string
}

const SparePartsModal: FC<SpareModalProps> = ({ uid }) => {
  const { spareParts, loading } = useGetSpareParts(uid)
  const sparePartsColumns = useSparePartsColumns({ tableId: 'sparePartsModal' })
  return (
    <Fragment>
      <Heading customText="Spare Parts list:" />
      <PandaTable
        {...{
          tableId: 'sparePartsModal',
          data: spareParts,
          columns: sparePartsColumns,
          loading,
          settings: {
            enableFooter: true
          },
          className: 'relative overflow-x-auto'
        }}
      />
    </Fragment>
  )
}

const SparePartsForModal: FC<SpareModalProps> = ({ uid }) => {
  const { spareParts, loading } = useGetSparePartsFor(uid)
  const sparePartsColumns = useSparePartsColumns({ tableId: 'sparePartsForModal' })
  return (
    <Fragment>
      <Heading customText="Spare Parts For list:" />
      <PandaTable
        {...{
          tableId: 'sparePartsForModal',
          data: spareParts,
          columns: sparePartsColumns,
          loading,
          settings: {
            enableFooter: true
          },
          className: 'relative overflow-x-auto'
        }}
      />
    </Fragment>
  )
}
