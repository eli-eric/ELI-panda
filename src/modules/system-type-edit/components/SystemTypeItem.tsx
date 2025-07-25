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
import Listbox from '@/components/form/Listbox'
import { Button } from '@/components/ui/button'
import axiosInstance from '@/core/axios/axiosInstance'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { CODEBOOK } from '@/types/constants/codebook'
import { BASE_URL } from '@/types/constants/common'
import { ROLE } from '@/types/constants/roles'

import type { SystemTypesResponse } from '../types'

const messages = message.common.buttons

interface Props {
  systemType: SystemTypesResponse
  groupUid?: string | null
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<SystemTypesResponse[], Error>>
}

function openEditSystemTypeModal(
  systemType: SystemTypesResponse,
  groupUid: string | null | undefined,
  refetch: Props['refetch']
) {
  if (typeof window === 'undefined') return // Prevent SSR execution

  const { openModal } = useModalGlobalStore.getState()

  openModal('dialog1', {
    component: () => (
      <EditSystemTypeModalContent
        systemType={systemType}
        groupUid={groupUid}
        refetch={refetch}
      />
    ),
    props: {
      title: 'Edit System Type',
      size: 'm' as const
    }
  })
}

const EditSystemTypeModalContent: FC<{
  systemType: SystemTypesResponse
  groupUid: string | null | undefined
  refetch: Props['refetch']
}> = ({ systemType, groupUid, refetch }) => {
  const { closeModal } = useModalGlobalStore()
  const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

  const formMethods = useForm({
    defaultValues: {
      name: systemType.name,
      code: systemType.code,
      mask: systemType.mask,
      systemAttribute: systemType.systemAttribute
    }
  })

  const { mutate, isPending } = useMutation({
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
      closeModal('dialog1')
      toast.success(`${systemType.name} was updated.`)
    },
    onError: () => {
      toast.error(`Failed to update ${systemType.name}.`)
      closeModal('dialog1')
    }
  })

  const handleSubmit = () => {
    mutate()
  }

  return (
    <div className="space-y-4">
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
        <Listbox
          name="systemAttribute"
          codebook={CODEBOOK.SYSTEM_ATTRIBUTE}
          rounded="rounded-md"
          customLabel="System Attribute"
          disabled={!canEdit}
          emptyOption="Select System Attribute"
        />
      </Form>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => closeModal('dialog1')}
          disabled={isPending}
        >
          {messages.cancel}
        </Button>
        <Button onClick={handleSubmit} disabled={isPending || !canEdit}>
          {isPending ? 'Saving...' : messages.save}
        </Button>
      </div>
    </div>
  )
}

export const SystemTypeItem: FC<Props> = ({
  systemType,
  refetch,
  groupUid
}) => {
  const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

  const withWarningModal = useWarningModal(
    `Are you sure you want to delete ${systemType.name}?`
  )

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

  return (
    <Fragment>
      <li
        className={cn(
          'py-2 px-4 flex justify-between',
          'cursor-pointer rounded-md',
          'hover:bg-orange-100 dark:hover:bg-orange-400',
          'dark:text-gray-200'
        )}
        key={systemType.uid}
      >
        {systemType.name}
        <div>
          <EditButton
            className="mr-2"
            onClick={() => {
              openEditSystemTypeModal(systemType, groupUid, refetch)
            }}
          />
          {canEdit && (
            <DeleteButton onClick={() => withWarningModal(deleteType)()} />
          )}
        </div>
      </li>
    </Fragment>
  )
}
