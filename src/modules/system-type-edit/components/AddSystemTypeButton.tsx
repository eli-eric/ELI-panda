import { PlusButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/Input'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'
import { Fragment, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
const messages = message.common.buttons

interface Props {
  selectedGroup: string | null
}
export const AddSystemTypeButton: FC<Props> = ({ selectedGroup }) => {
  const [open, setOpen] = useState(false)

  const formMethods = useForm()

  const buttons: ModalButtons = {
    goNext: {
      onClick: () => setOpen(false),
      text: messages.save
    },
    goBack: {
      onClick: () => setOpen(false),
      text: messages.cancel
    }
  }
  return (
    <Fragment>
      <PlusButton
        primary
        disabled={!selectedGroup}
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
