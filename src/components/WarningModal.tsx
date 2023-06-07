import Modal from 'src/components/modal/warning/modal-warning.comp'
import useStore from 'src/store/useWarningModalStore'
import { shallow } from 'zustand/shallow'

import { message as intlMessage } from '@/i18n/src/messages'

function WarningModal() {
  const [params, patchParams, resetParams] = useStore(
    state => [state.params, state.patchParams, state.resetParams],
    shallow
  )

  const { isOpen, error, message } = params

  const messages = intlMessage.common
  const buttons = {
    goNext: {
      text: messages.buttons.continue,
      loading: false,
      onClick: () => patchParams({ isConfirmed: true })
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
      testid="~~~waring-modal~~~"
    />
  )
}

export default WarningModal
