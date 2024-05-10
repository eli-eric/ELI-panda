import { DeleteButton, EditButton } from '@/components/Buttons'
import { classNames } from '@/utils'
import { Fragment, useState, type FC } from 'react'
import type { SystemTypesResponse } from '../types'
import useWarningModal from '@/hooks/useWarningModal'
import { useForm } from 'react-hook-form'
import type { ModalButtons } from '@/types/form'
import { message } from '@/i18n/src/messages'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/Input'
import {
  useMutation,
  type QueryObserverResult,
  type RefetchOptions
} from '@tanstack/react-query'
import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'
import toast from 'react-hot-toast'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'
const messages = message.common.buttons
interface Props {
  systemType: SystemTypesResponse
  groupUid?: string | null
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SystemTypesResponse[], Error>>
}
export const SystemTypeItem: FC<Props> = ({
  systemType,
  refetch,
  groupUid
}) => {
  const [openEdit, setOpenEdit] = useState(false)
  const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

  const withWarningModal = useWarningModal(
    `Are you sure you want to delete ${systemType.name}?`
  )

  const formMethods = useForm({
    defaultValues: {
      name: systemType.name,
      code: systemType.code,
      mask: systemType.mask
    }
  })

  //TODO: bit refactor after big merge
  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance
        .put(
          BASE_URL +
            `/system/system-type-group/${groupUid}/system-type/${systemType.uid}`,
          formMethods.getValues()
        )
        .then(res => res.data)
      return res.data
    },
    onSuccess: () => {
      refetch()
      setOpenEdit(false)
      toast.success(`${systemType.name} was updated.`)
    }
  })
  const { mutate: deleteType } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance
        .delete(BASE_URL + `/system/system-type/${systemType.uid}`)
        .then(res => res.data)
      return res.data
    },
    onSuccess: () => {
      refetch()
      toast.success(`${systemType.name} was deleted.`)
    }
  })

  const buttons: ModalButtons = {
    goNext: {
      onClick: () => {
        mutate()
      },
      text: messages.save,
      disabled: !canEdit
    },
    goBack: {
      onClick: () => setOpenEdit(false),
      text: messages.cancel
    }
  }
  return (
    <Fragment>
      <li
        className={classNames(
          'py-2 px-4 flex justify-between',
          'cursor-pointer rounded-md',
          'hover:bg-primary-100 dark:hover:bg-primary-400',
          'dark:text-gray-200'
        )}
        key={systemType.uid}
      >
        {systemType.name}
        <div>
          <EditButton
            className="mr-2"
            onClick={() => {
              setOpenEdit(true)
            }}
          />
          {canEdit && (
            <DeleteButton onClick={() => withWarningModal(deleteType)()} />
          )}
        </div>
      </li>
      <ModalComponent open={openEdit} setOpen={setOpenEdit} buttons={buttons}>
        <Form formMethods={formMethods}>
          <Input
            name="name"
            label="Name"
            rounded="rounded-md"
            disabled={!canEdit}
          />
          <Input
            name="code"
            label="Code"
            rounded="rounded-md"
            disabled={!canEdit}
          />
          <Input
            name="mask"
            label="Mask"
            rounded="rounded-md"
            disabled={!canEdit}
          />
        </Form>
      </ModalComponent>
    </Fragment>
  )
}
