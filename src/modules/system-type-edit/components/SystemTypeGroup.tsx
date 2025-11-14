import {
  type QueryObserverResult,
  type RefetchOptions,
  useMutation
} from '@tanstack/react-query'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import axiosInstance from '@/core/axios/axiosInstance'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
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

// Store modalId in closure for EditSystemTypeGroupModalContent to access
let currentEditGroupModalId: string | undefined

function openEditSystemTypeGroupModal(
  systemTypeGroup: CodebookType,
  refetch: Props['refetch']
) {
  if (typeof window === 'undefined') return // Prevent SSR execution

  const { openModal } = useDynamicModalStore.getState()

  currentEditGroupModalId = openModal('dialog', {
    id: `edit-system-type-group-${systemTypeGroup.uid}`,
    component: () => (
      <EditSystemTypeGroupModalContent
        systemTypeGroup={systemTypeGroup}
        refetch={refetch}
      />
    ),
    props: {
      title: 'Edit System Type Group',
      size: 'm' as const
    }
  })

  return currentEditGroupModalId
}

const EditSystemTypeGroupModalContent: FC<{
  systemTypeGroup: CodebookType
  refetch: Props['refetch']
}> = ({ systemTypeGroup, refetch }) => {
  const { closeModal } = useDynamicModalStore()

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
      if (currentEditGroupModalId) {
        closeModal(currentEditGroupModalId)
      }
      toast.success(`${systemTypeGroup.name} was updated.`)
    },
    onError: () => {
      toast.error(`Failed to update ${systemTypeGroup.name}.`)
      if (currentEditGroupModalId) {
        closeModal(currentEditGroupModalId)
      }
    }
  })

  const handleSubmit = () => {
    submit()
  }

  return (
    <div className="space-y-4 pt-2">
      <Form formMethods={formMethods}>
        <Input name="name" label="Name" rounded="rounded-md" />
      </Form>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => {
            if (currentEditGroupModalId) {
              closeModal(currentEditGroupModalId)
            }
          }}
          disabled={isPending}
        >
          <FormattedMessage id={messages.cancel} defaultMessage="Cancel" />
        </Button>
        <Button onClick={handleSubmit} disabled={isPending}>
          <FormattedMessage id={messages.save} defaultMessage="Save" />
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
  const { formatMessage: fm } = useIntl()
  const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

  const withWarningModal = useWarningModal(
    `Are you sure you want to delete ${systemTypeGroup.name}?`
  )

  return (
    <div
      className={cn(
        'group cursor-pointer p-3 rounded-lg transition-all duration-200',
        'border border-transparent hover:border-border hover:bg-accent/50',
        'flex items-center justify-between',
        systemTypeGroup.uid === selectedGroup &&
          'bg-primary/10 border-primary text-primary font-medium'
      )}
      onClick={() => setSelectedGroup(systemTypeGroup.uid)}
    >
      <span className="truncate pr-2">{systemTypeGroup.name}</span>
      {canEdit && (
        <div className="flex items-center pl-2">
          <div className="self-center h-6 w-px bg-muted mx-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Group actions"
                className="h-8 w-8 p-0"
                onClick={e => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={4}>
              <DropdownMenuItem
                onClick={e => {
                  e.stopPropagation()
                  openEditSystemTypeGroupModal(systemTypeGroup, refetch)
                }}
                className="cursor-pointer"
              >
                <Edit className="h-4 w-4 mr-2" />
                {fm({ id: message.common.systemTypeEdit.editGroup })}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={e => {
                  e.stopPropagation()
                  withWarningModal(() => {})()
                }}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {fm({ id: message.common.systemTypeEdit.deleteGroup })}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  )
}
