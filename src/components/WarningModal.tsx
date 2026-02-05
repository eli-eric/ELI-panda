import { useWarningModalStore } from 'src/store/useWarningModalStore'

import Modal from '@/components/overlays/modal/warning/modal-warning.comp'
import { message as intlMessage } from '@/i18n/src/messages'

export const WarningModal = () => {
    const params = useWarningModalStore(state => state.params)
    const confirmModal = useWarningModalStore(state => state.confirmModal)
    const closeModal = useWarningModalStore(state => state.closeModal)

    const { isOpen, error, message } = params

    const messages = intlMessage.common
    const buttons = {
        goNext: {
            text: messages.buttons.continue,
            loading: false,
            onClick: () => {
                confirmModal()
            },
        },
        goBack: {
            text: messages.buttons.cancel,
            onClick: () => {
                closeModal()
            },
        },
    }
    return (
        <Modal
            buttons={buttons}
            open={isOpen}
            setOpen={bool => {
                if (!bool) closeModal()
            }}
            title={messages.warning}
            message={message}
            error={error}
            testid="~~~warning-modal~~~"
        />
    )
}
