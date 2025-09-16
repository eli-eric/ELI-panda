import { useWarningModalStore } from 'src/store/useWarningModalStore'
import { shallow } from 'zustand/shallow'

import Modal from '@/components/overlays/modal/warning/modal-warning.comp'
import { message as intlMessage } from '@/i18n/src/messages'

export const WarningModal = () => {
  const [params, patchParams, resetParams] = useWarningModalStore(
    state => [state.params, state.patchParams, state.resetParams],
    shallow
  )

  const { isOpen, error, message } = params

  const messages = intlMessage.common
  const buttons = {
    goNext: {
      text: messages.buttons.continue,
      loading: false,
      onClick: () => {
        console.log('WarningModal: continue clicked')
        patchParams({ isConfirmed: true })
      }
    },
    goBack: {
      text: messages.buttons.cancel,
      onClick: () => {
        resetParams()
      }
    }
  }
  return (
    <Modal
      buttons={buttons}
      open={isOpen}
      setOpen={bool => patchParams({ isOpen: bool })}
      title={messages.warning}
      message={message}
      error={error}
      testid="~~~warning-modal~~~"
    />
  )
}
