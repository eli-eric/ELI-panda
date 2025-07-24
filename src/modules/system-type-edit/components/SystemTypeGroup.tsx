import {
  type QueryObserverResult,
  type RefetchOptions,
  useMutation
} from '@tanstack/react-query'
import { type FC, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { DeleteButton, EditButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'
import axiosInstance from '@/core/axios/axiosInstance'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { BASE_URL } from '@/types/constants/common'
import { ROLE } from '@/types/constants/roles'
import type { CodebookType } from '@/types/responses/codebook'

const messages = message.common.buttons

interface Props {
  systemTypeGroup: CodebookType
  selectedGroup: string | null
  setSelectedGroup: (value: string) => void
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<CodebookType[], Error>>
}

function openEditSystemTypeGroupModal(systemTypeGroup: CodebookType, refetch: Props['refetch']) {
  if (typeof window === 'undefined') return // Prevent SSR execution
  
  const { openModal } = useModalGlobalStore.getState()
  
  openModal('dialog1', {
    component: () => <EditSystemTypeGroupModalContent systemTypeGroup={systemTypeGroup} refetch={refetch} />,
    props: {
      title: 'Edit System Type Group',
      size: 'm' as const
    }
  })
}

const EditSystemTypeGroupModalContent: FC<{systemTypeGroup: CodebookType, refetch: Props['refetch']}> = ({ systemTypeGroup, refetch }) => {
  const { closeModal } = useModalGlobalStore()
  
  const formMethods = useForm({
    defaultValues: {
      name: systemTypeGroup.name
    }
  })

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance
        .put(
          BASE_URL + `/system/system-type-group/${systemTypeGroup.uid}`,
          formMethods.getValues()
        )
        .then(res => res.data)
      return res.data
    },
    onSuccess: () => {
      refetch()
      closeModal('dialog1')
      toast.success(`${systemTypeGroup.name} was updated.`)
    },
    onError: () => {
      toast.error(`Failed to update ${systemTypeGroup.name}.`)
      closeModal('dialog1')
    }
  })

  const handleSubmit = () => {
    submit()
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

export const SystemTypeGroup: FC<Props> = ({
  systemTypeGroup,
  selectedGroup,
  setSelectedGroup,
  refetch
}) => {
  const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

  const withWarningModal = useWarningModal(
    `Are you sure you want to delete ${systemTypeGroup.name}?`
  )

  return (
    <Fragment>
      <li
        className={cn(
          'cursor-pointer py-2 px-4 rounded-md flex justify-between',
          'hover:bg-orange-100 dark:hover:bg-orange-400',
          systemTypeGroup.uid === selectedGroup &&
            'bg-orange-200 dark:bg-orange-500'
        )}
        onClick={() => setSelectedGroup(systemTypeGroup.uid)}
        key={systemTypeGroup.uid}
      >
        {systemTypeGroup.name}
        {canEdit && (
          <div>
            <EditButton
              className="mr-2"
              onClick={() => {
                openEditSystemTypeGroupModal(systemTypeGroup, refetch)
              }}
            />
            <DeleteButton onClick={() => withWarningModal(() => {})()} />
          </div>
        )}
      </li>
    </Fragment>
  )
}
