import { PlusButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/Input'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
const messages = message.common.buttons

export const AddGroupButton: React.FC = () => {
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
      <PlusButton primary onClick={() => setOpen(!open)} />
      <ModalComponent open={open} setOpen={setOpen} buttons={buttons}>
        <Form formMethods={formMethods}>
          <Input name="name" label="Name" rounded="rounded-md" />
        </Form>
      </ModalComponent>
    </Fragment>
  )
}
