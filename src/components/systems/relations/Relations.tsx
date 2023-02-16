import { Fragment, useState } from 'react'
import { useIntl } from 'react-intl'
import useSWR from 'swr'

import { Button } from '@/components/ui/Buttons'
import DisclosureComponent from '@/components/ui/Disclosure.comp'
import ModalComponent from '@/components/ui/modal/modal.comp'
import ModalWarningComponent from '@/components/ui/modal/warning/modal-warning.comp'
import TableComponent from '@/components/ui/Table.comp'
import { useRelationMapRows } from '@/hooks/systems/relations/useMapRows'
import { message } from '@/i18n/src/messages'
import { ENDPOINTS } from '@/types/constants/endpoints'
import { ModalButtons } from '@/types/form'
import { SystemRelationship } from '@/types/system'

import AddRelationForm from './AddRelationForm'

const messages = message.systemsPage.relations

const Relations = ({ uid }: { uid: string }) => {
  const { data: relations } = useSWR<SystemRelationship[]>(ENDPOINTS.systemDetail + '/' + uid + '/relationship')
  const [relationUid, setRelationUid] = useState<string | undefined>()
  const intl = useIntl()
  const [openAddRelation, setOpenAddRelation] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const deleteModalButtons: ModalButtons = {
    goNext: {
      text: intl.formatMessage({ id: messages.deleteModal.buttons.continue }),
      onClick: () => {
        setRelationUid(undefined)
        setOpenDelete(false)
        console.log(relationUid)
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

  const adddRelModalButtons: ModalButtons = {
    goNext: {
      text: 'continue',
      onClick: () => {
        setOpenAddRelation(false)
      }
    },
    goBack: {
      text: 'cancel',
      onClick: () => {
        setOpenAddRelation(false)
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
        <div className="px-4 sm:px-20 lg:px-20">
          <Button
            customClass="mb-2"
            onClickAction={() => {
              setOpenAddRelation(true)
            }}
            text={intl.formatMessage({ id: messages.buttons.newRelation })}
          />
          {relations && <TableComponent collumsTitle={collumsTitle} data={data} />}
        </div>
      </DisclosureComponent>
      <ModalComponent open={openAddRelation} setOpen={setOpenAddRelation} buttons={adddRelModalButtons}>
        <AddRelationForm setopen={setOpenAddRelation} />
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
