import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { PlusButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'
import axiosInstance from '@/core/axios/axiosInstance'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { BASE_URL } from '@/types/constants/common'
import { ROLE } from '@/types/constants/roles'
import type { CodebookType } from '@/types/responses/codebook'

const messages = message.common.buttons

interface Props {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<CodebookType[], Error>>
}

function openAddGroupModal(refetch: Props['refetch']) {
  if (typeof window === 'undefined') return // Prevent SSR execution
  
  const { openModal } = useModalGlobalStore.getState()
  
  openModal('dialog1', {
    component: () => <AddGroupModalContent refetch={refetch} />,
    props: {
      title: 'Add Group',
      size: 'm' as const
    }
  })
}

const AddGroupModalContent: FC<Props> = ({ refetch }) => {
  const { closeModal } = useModalGlobalStore()
  const formMethods = useForm()

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance
        .post(BASE_URL + `/system/system-type-group`, formMethods.getValues())
        .then(res => res.data)
      return res.data
    },
    onSuccess: () => {
      refetch()
      closeModal('dialog1')
      formMethods.reset()
      toast.success(`Group was created.`)
    },
    onError: () => {
      toast.error(`Failed to create group.`)
      closeModal('dialog1')
    }
  })

  const handleSubmit = () => {
    mutate()
  }

  return (
    <div className="space-y-4">
      <Form formMethods={formMethods}>
        <Input name="name" label="Name" rounded="rounded-md" />
      </Form>
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={() => closeModal('dialog1')}
          disabled={isPending}
        >
          {messages.cancel}
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? 'Saving...' : messages.save}
        </Button>
      </div>
    </div>
  )
}

export const AddGroupButton: FC<Props> = ({ refetch }) => {
  const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

  return (
    <PlusButton 
      disabled={!canEdit} 
      onClick={() => openAddGroupModal(refetch)} 
    />
  )
}
