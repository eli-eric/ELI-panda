import { DeleteButton, EditButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/Input'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import axiosInstance from '@/core/axios/axiosInstance'
import type { CodebookType } from '@/types/responses/codebook'

import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { BASE_URL } from '@/types/constants/common'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'
import { classNames } from '@/utils'
import {
  useMutation,
  type QueryObserverResult,
  type RefetchOptions
} from '@tanstack/react-query'
import { Fragment, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const messages = message.common.buttons

interface Props {
  systemTypeGroup: CodebookType
  selectedGroup: string | null
  setSelectedGroup: (value: string) => void
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<CodebookType[], Error>>
}

export const SystemTypeGroup: FC<Props> = ({
  systemTypeGroup,
  selectedGroup,
  setSelectedGroup,
  refetch
}) => {
  const [openEdit, setOpenEdit] = useState(false)

  const canEdit = usePermission([ROLE.SYSTEM_TYPE_EDIT])

  const withWarningModal = useWarningModal(
    `Are you sure you want to delete ${systemTypeGroup.name}?`
  )

  const formMethods = useForm({
    defaultValues: {
      name: systemTypeGroup.name
    }
  })

  //TODO: bit refactor after big merge
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
      setOpenEdit(false)
      toast.success(`${systemTypeGroup.name} was updated.`)
    },
    onError: () => {
      toast.error(`Failed to update ${systemTypeGroup.name}.`)
      setOpenEdit(false)
    }
  })

  const buttons: ModalButtons = {
    goNext: {
      onClick: () => {
        submit()
      },
      text: messages.save,
      loading: isPending
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
          'cursor-pointer py-2 px-4 rounded-md flex justify-between',
          'hover:bg-primary-100 dark:hover:bg-primary-400',
          systemTypeGroup.uid === selectedGroup &&
            'bg-primary-200 dark:bg-primary-500'
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
                setOpenEdit(true)
              }}
            />
            <DeleteButton onClick={() => withWarningModal(() => {})()} />
          </div>
        )}
      </li>
      <ModalComponent open={openEdit} setOpen={setOpenEdit} buttons={buttons}>
        <Form formMethods={formMethods}>
          <Input name="name" label="Name" rounded="rounded-md" />
        </Form>
      </ModalComponent>
    </Fragment>
  )
}
