import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'
import axiosInstance from '@/core/axios/axiosInstance'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { BASE_URL } from '@/types/constants/common'
import { ROLE } from '@/types/constants/roles'
import type { CodebookType } from '@/types/responses/codebook'

const messages = message.common.buttons

interface Props {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<CodebookType[], Error>>
}

let currentAddGroupModalId: string | undefined

function openAddGroupModal(refetch: Props['refetch']) {
  if (typeof window === 'undefined') return // Prevent SSR execution

  const { openModal } = useDynamicModalStore.getState()

  currentAddGroupModalId = openModal('dialog', {
    id: 'add-system-type-group',
    component: () => <AddGroupModalContent refetch={refetch} />,
    props: {
      title: 'Add Group',
      size: 'm' as const
    }
  })
  return currentAddGroupModalId
}

const AddGroupModalContent: FC<Props> = ({ refetch }) => {
  const { closeModal } = useDynamicModalStore()
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
      if (currentAddGroupModalId) {
        closeModal(currentAddGroupModalId)
      }
      formMethods.reset()
      toast.success(`Group was created.`)
    },
    onError: () => {
      toast.error(`Failed to create group.`)
      if (currentAddGroupModalId) {
        closeModal(currentAddGroupModalId)
      }
    }
  })

  const handleSubmit = () => {
    mutate()
  }

  return (
    <div className="space-y-4 pt-2">
      <Form formMethods={formMethods}>
        <Input name="name" label="Name" rounded="rounded-md" />
      </Form>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() =>
            currentAddGroupModalId && closeModal(currentAddGroupModalId)
          }
          disabled={isPending}
        >
          <FormattedMessage id={messages.cancel} defaultMessage={'Cancel'} />
        </Button>
        <Button onClick={handleSubmit} disabled={isPending}>
          <FormattedMessage id={messages.save} defaultMessage={'Save'} />
        </Button>
      </div>
    </div>
  )
}

export const AddGroupButton: FC<Props> = ({ refetch }) => {
  const { formatMessage: fm } = useIntl()
  const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={!canEdit}
      onClick={() => openAddGroupModal(refetch)}
      className="gap-2"
    >
      <Plus className="h-4 w-4" />
      {fm({ id: message.common.systemTypeEdit.addGroup })}
    </Button>
  )
}
