import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import useAxios from 'src/hooks/useAxios'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import ModalComponent from 'src/components/ui/modal/modal.comp'
import ModalWarningComponent from 'src/components/ui/modal/warning/modal-warning.comp'
import { ENDPOINTS } from 'src/types/constants/endpoints'
import { ModalButtons } from 'src/types/form'
import FormContext from 'src/store/form.context'

interface Props {
  uid: string
}

const SystemActionIconsComponent = ({ uid }: Props) => {
  const { isEdit, setEdit, setUid } = useContext(FormContext)
  const router = useRouter()
  const disabled = isEdit
  const customClass = `h-5 w-5 ${disabled ? '' : 'hover:text-primary-500 hover:cursor-pointer'}`
  const [modalOpen, setModalOpen] = useState(false)

  const { fetchData } = useAxios({
    url: ENDPOINTS.systemDetail + '/' + uid,
    method: 'delete',
    mutateUrlList: [ENDPOINTS.systemTree]
  })

  const handleEditClick = () => {
    if (!disabled) {
      setUid(uid)
      setEdit(true)
    }
  }
  const handleAddClick = () => {
    if (!disabled) {
      setUid(undefined)
      setEdit(true)
    }
  }

  const handleDeleteClick = () => {
    if (!disabled) {
      setModalOpen(true)
    }
  }

  const confirm = () => {
    fetchData()
    setModalOpen(false)
    router.push({ query: {} })
  }

  const modalButtons: ModalButtons = {
    goNext: {
      text: 'continue',
      onClick: () => confirm()
    },
    goBack: {
      text: 'cancel',
      onClick: () => setModalOpen(false)
    }
  }

  return (
    <div className="flex">
      <PencilSquareIcon onClick={handleEditClick} className={customClass} />
      <TrashIcon onClick={handleDeleteClick} className={customClass} />
      <PlusIcon onClick={handleAddClick} className={customClass} />
      <ModalComponent open={modalOpen} setOpen={setModalOpen} testid="delete-warning-modal" buttons={modalButtons}>
        <ModalWarningComponent title="Warning" message="Are you sure you want to remove this system?" />
      </ModalComponent>
    </div>
  )
}

export default SystemActionIconsComponent
