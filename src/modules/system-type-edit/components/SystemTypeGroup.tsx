import { DeleteButton, EditButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/Input'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'
import { classNames } from '@/utils'
import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { Fragment, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'

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
  setSelectedGroup
}) => {
  const [openEdit, setOpenEdit] = useState(false)

  const withWarningModal = useWarningModal(
    `Are you sure you want to delete ${systemTypeGroup.name}?`
  )

  const formMethods = useForm({
    defaultValues: {
      name: systemTypeGroup.name
    }
  })

  const { submit, loading } = useSubmit({
    endpoint: `/system/system-type-group/${systemTypeGroup.uid}`,
    method: 'put',
    onSuccess: () => {
      setOpenEdit(false)
    }
  })

  const buttons: ModalButtons = {
    goNext: {
      onClick: () => {
        submit(formMethods.getValues())
      },
      text: messages.save,
      loading
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
        <div>
          <EditButton
            className="mr-2"
            onClick={() => {
              setOpenEdit(true)
            }}
          />
          <DeleteButton onClick={() => withWarningModal(() => {})()} />
        </div>
      </li>
      <ModalComponent open={openEdit} setOpen={setOpenEdit} buttons={buttons}>
        <Form formMethods={formMethods}>
          <Input name="name" label="Name" rounded="rounded-md" />
        </Form>
      </ModalComponent>
    </Fragment>
  )
}
