import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'

import { SelectLocationCombo } from '../../location/SelectLocation.combo'
import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../store/useModalWizardStore'

const messages = message.common.buttons

export const SystemDetailStep: FC = () => {
  const { goNext, goBack } = useWizardStore()
  const { isMovingToNewSystem } = useModalWizardStore()

  const formMethods = useForm()

  const buttons: ModalButtons = {
    goNext: {
      text: messages.next,
      onClick: () => {
        goNext()
      }
    },
    goBack: {
      text: messages.back,
      onClick: () => {
        goBack()
      }
    }
  }

  return (
    <div>
      <Form formMethods={formMethods}>
        <Input name="systemName" label="System name" />
        <SelectLocationCombo locationField={{ name: 'location' }} />
      </Form>
      <ModalButtonsComponent buttons={buttons} />
    </div>
  )
}
