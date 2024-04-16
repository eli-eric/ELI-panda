import { Button, PlusButton } from '@/components/Buttons'
import { message } from '@/i18n/src/messages'
import type { ModalButtons } from '@/types/form'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import type { FC } from 'react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useLinkCreate } from './hooks/useLinks'

const buttons = message.common.buttons

interface NewFileButtonProps {
  isDragActive?: boolean
  uid: string
  handleNewFile: (e: any) => void
}

export const NewFileButton: FC<NewFileButtonProps> = ({
  handleNewFile,
  uid,
  isDragActive
}) => {
  const [open, setOpen] = useState(false)
  const [openLinkModal, setOpenLinkModal] = useState(false)

  const [linkValue, setLinkValue] = useState('')
  const [linkName, setLinkName] = useState('')

  const { mutate: linkCreate } = useLinkCreate({ parentUid: uid })

  const inputValueRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (openLinkModal) {
      const timer = setTimeout(() => {
        inputValueRef.current?.focus()
      }, 440) // 100ms delay which you may need to adjust

      return () => clearTimeout(timer) // cleanup to prevent memory leak
    }
  }, [openLinkModal])

  const modalLinkButtons: ModalButtons = {
    goNext: {
      text: buttons.continue,
      onClick: () => {
        linkCreate({ name: linkName, url: linkValue })
        setOpenLinkModal(false)
      }
    },
    goBack: {
      text: buttons.cancel,
      onClick: () => {
        setOpenLinkModal(false)
      }
    }
  }

  return (
    <Fragment>
      <PlusButton
        buttonSize="large"
        primary={!isDragActive}
        type={'button'}
        onClick={() => {
          setOpen(true)
        }}
      />
      <ModalComponent {...{ open, setOpen, buttons: { noButtons: true } }}>
        <div className="flex flex-col">
          <Button
            className="flex align-middle justify-center text-base"
            onClick={e => {
              handleNewFile(e)
              setOpen(false)
            }}
          >
            {'Upload Files'}
          </Button>
          <Button
            className="flex align-middle justify-center text-base"
            onClick={() => {
              setOpen(false)
              setOpenLinkModal(true)
            }}
          >
            {'Create Link'}
          </Button>
        </div>
      </ModalComponent>
      <ModalComponent
        {...{
          open: openLinkModal,
          setOpen: setOpenLinkModal,
          buttons: modalLinkButtons
        }}
      >
        <input
          ref={inputValueRef}
          type="string"
          className="form-field rounded-md"
          placeholder="Copy or write link here"
          value={linkValue}
          onChange={e => setLinkValue(e.target.value)}
        />
        <input
          type="string"
          className="form-field rounded-md"
          placeholder="Write link name here"
          value={linkName}
          onChange={e => setLinkName(e.target.value)}
        />
      </ModalComponent>
    </Fragment>
  )
}
