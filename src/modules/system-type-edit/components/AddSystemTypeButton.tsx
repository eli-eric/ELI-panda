import { PlusButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/Input'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import axiosInstance from '@/core/axios/axiosInstance'
import { message } from '@/i18n/src/messages'
import { BASE_URL } from '@/types/constants/common'
import type { ModalButtons } from '@/types/form'
import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { Fragment, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import type { SystemTypesResponse } from '../types'
import toast from 'react-hot-toast'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'
const messages = message.common.buttons

interface Props {
  selectedGroup: string | null
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SystemTypesResponse[], Error>>
}
export const AddSystemTypeButton: FC<Props> = ({ selectedGroup, refetch }) => {
  const [open, setOpen] = useState(false)
  const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

  const formMethods = useForm()

  //TODO: bit refactor after big merge
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance
        .post(
          BASE_URL + `/system/system-type-group/${selectedGroup}/system-type`,
          formMethods.getValues()
        )
        .then(res => res.data)
      return res.data
    },
    onSuccess: () => {
      refetch()
      setOpen(false)
      formMethods.reset()
      toast.success(`System Type was created.`)
    },
    onError: () => {
      toast.error(`Failed to create SystemType.`)
      setOpen(false)
    }
  })

  const buttons: ModalButtons = {
    goNext: {
      onClick: () => mutate(),
      text: messages.save,
      loading: isPending
    },
    goBack: {
      onClick: () => setOpen(false),
      text: messages.cancel,
      loading: isPending
    }
  }
  return (
    <Fragment>
      <PlusButton
        primary
        disabled={!selectedGroup || !canEdit}
        onClick={() => setOpen(!open)}
      />
      <ModalComponent open={open} setOpen={setOpen} buttons={buttons}>
        <Form formMethods={formMethods}>
          <Input name="name" label="Name" rounded="rounded-md" />
          <Input name="code" label="Code" rounded="rounded-md" />
          <Input name="mask" label="Mask" rounded="rounded-md" />
        </Form>
      </ModalComponent>
    </Fragment>
  )
}
