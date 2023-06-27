import { memo, useState } from 'react'
import useSWR from 'swr'

import { PlusButton } from '@/components/Buttons'
import ModalComponent from '@/components/modal/modal.comp'
import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import PandaTable from '@/modules/shared/table/Table'

import type { SystemRelationshipResponse } from '../../types/responses'
import { AddRelationForm } from './components/modal/RelationModal'
import { useRelationsColumns } from './components/table/columns'
const MemoizedTable = memo(PandaTable)

const RelationsSection = ({ uid, systemName }: { uid: string; systemName: string }) => {
  const { systemRelationships } = useEndpoint({ uid })
  const { data: relations } = useSWR<SystemRelationshipResponse[]>(systemRelationships, mockFetcher)
  const [openAddRelation, setOpenAddRelation] = useState(false)
  const columns = useRelationsColumns({ systemName, uid })
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
      {relations && systemName && <MemoizedTable data={relations} columns={columns} tableId={'relations'} />}
      <ModalComponent open={openAddRelation} setOpen={setOpenAddRelation} buttons={{ noButtons: true }}>
        <AddRelationForm setopen={setOpenAddRelation} systemName={systemName} />
      </ModalComponent>
    </div>
  )
}

export default RelationsSection
