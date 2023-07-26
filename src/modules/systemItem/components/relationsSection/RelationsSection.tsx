import { memo, useState } from 'react'

import { PlusButton } from '@/components/Buttons'
import ModalComponent from '@/components/modal/modal.comp'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'

import { useRelations } from '../../hooks/useRelations'
import { AddRelationForm } from './components/modal/RelationModal'
import { useRelationsColumns } from './components/table/columns'

const MemoizedTable = memo(PandaTable)

const RelationsSection = ({ systemName }: { systemName?: string }) => {
  const { response: relations } = useRelations()
  const [openAddRelation, setOpenAddRelation] = useState(false)

  const columns = useRelationsColumns({ systemName })

  return (
    <div>
      <PlusButton
        className="mb-2"
        primary
        buttonSize="large"
        onClick={() => {
          setOpenAddRelation(true)
        }}
      />
      {relations && systemName && (
        <MemoizedTable
          data={relations}
          columns={columns}
          tableId={'relations'}
          className={'relative overflow-x-auto'}
        />
      )}
      <ModalComponent open={openAddRelation} setOpen={setOpenAddRelation} buttons={{ noButtons: true }}>
        <AddRelationForm setopen={setOpenAddRelation} systemName={systemName} />
      </ModalComponent>
    </div>
  )
}

export default RelationsSection
