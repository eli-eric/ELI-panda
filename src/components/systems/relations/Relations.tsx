import { Fragment, useState } from 'react'
import { useIntl } from 'react-intl'
import useSWR from 'swr'

import { Button } from '@/components/ui/Buttons'
import DisclosureComponent from '@/components/ui/Disclosure.comp'
import ModalComponent from '@/components/ui/modal/modal.comp'
import ModalWarningComponent from '@/components/ui/modal/warning/modal-warning.comp'
import TableComponent from '@/components/ui/Table.comp'
import { useRelationMapRows } from '@/hooks/systems/relations/useMapRows'
import { useEndpoint } from '@/hooks/useEndpoint'
import { message } from '@/i18n/src/messages'
import { ModalButtons } from '@/types/form'
import { SystemRelationshipResponse } from '@/types/responses'
import { RELATION_TYPE_CODE } from '@/types/system/constants'

import AddRelationForm from './AddRelationForm'

const messages = message.systemsPage.relations

const Relations = ({ uid, systemName }: { uid: string; systemName: string }) => {
  const endpoints = useEndpoint({ uid })
  const { data: relations } = useSWR<SystemRelationshipResponse[]>(endpoints.systemRelationships)
  const [relationUid, setRelationUid] = useState<string | undefined>()
  const intl = useIntl()
  const [openAddRelation, setOpenAddRelation] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [relationTypeCode, setRelationTypeCode] = useState<RELATION_TYPE_CODE>(RELATION_TYPE_CODE.IS_SPARE_FOR)

  const deleteModalButtons: ModalButtons = {
    goNext: {
      text: intl.formatMessage({ id: messages.deleteModal.buttons.continue }),
      onClick: () => {
        setRelationUid(undefined)
        setOpenDelete(false)
      }
    },
    goBack: {
      text: intl.formatMessage({ id: messages.deleteModal.buttons.cancel }),
      onClick: () => {
        setRelationUid(undefined)
        setOpenDelete(false)
      }
    }
  }

  const collumsTitle = Object.keys(messages.tableHeader).map(key =>
    intl.formatMessage({ id: messages.tableHeader[key] })
  )

  const deleteHandler = uid => {
    setOpenDelete(true)
    setRelationUid(uid)
  }
  const data = useRelationMapRows({ relations, onDelete: deleteHandler })

  return (
    <Fragment>
      <DisclosureComponent title={intl.formatMessage({ id: messages.title })}>
        <div className="px-4 sm:px-10 lg:px-4 py-4">
          <Button
            customClass="mb-2"
            onClickAction={() => {
              setRelationTypeCode(RELATION_TYPE_CODE.IS_SPARE_FOR)
              setOpenAddRelation(true)
            }}
            text={intl.formatMessage({ id: messages.buttons.addSpare })}
          />
          {relations && <TableComponent collumsTitle={collumsTitle} data={data} />}
        </div>
      </DisclosureComponent>
      <ModalComponent open={openAddRelation} setOpen={setOpenAddRelation} buttons={{ noButtons: true }}>
        <AddRelationForm setopen={setOpenAddRelation} relationTypeCode={relationTypeCode} systemName={systemName} />
      </ModalComponent>
      <ModalComponent open={openDelete} setOpen={setOpenDelete} buttons={deleteModalButtons}>
        <ModalWarningComponent
          title={intl.formatMessage({ id: messages.deleteModal.title })}
          message={intl.formatMessage({ id: messages.deleteModal.text })}
        />
      </ModalComponent>
    </Fragment>
  )
}

export default Relations
