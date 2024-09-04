import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import type { FC } from 'react'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { PlusButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import axiosInstance from '@/core/axios/axiosInstance'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { BASE_URL } from '@/types/constants/common'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'
const messages = message.common.buttons

interface Props {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<CodebookType[], Error>>
}

export const AddGroupButton: FC<Props> = ({ refetch }) => {
  const [open, setOpen] = useState(false)

  const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

  const formMethods = useForm()

  //TODO: bit refactor after big merge
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance
        .post(BASE_URL + `/system/system-type-group`, formMethods.getValues())
        .then(res => res.data)
      return res.data
    },
    onSuccess: () => {
      refetch()
      setOpen(false)
      formMethods.reset()
      toast.success(`Group was created.`)
    },
    onError: () => {
      toast.error(`Failed to create group.`)
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
      <PlusButton primary disabled={!canEdit} onClick={() => setOpen(!open)} />
      <ModalComponent open={open} setOpen={setOpen} buttons={buttons}>
        <Form formMethods={formMethods}>
          <Input name="name" label="Name" rounded="rounded-md" />
        </Form>
      </ModalComponent>
    </Fragment>
  )
}
