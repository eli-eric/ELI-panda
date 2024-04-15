import { Fragment, useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { Button, PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { message } from '@/i18n/src/messages'

import { PandaTable } from '../table/pandaTable/PandaTable'
import { useFileColumns } from './FileTable.columns'
import { useFileRequests } from './hooks/useFileRequests'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import type { ModalButtons } from '@/types/form'
import type { FILE_TYPE } from './types'
import { useLinkCreate, useLinks } from './hooks/useLinks'
import { useFiles } from './hooks/useFiles'

const messages = message.common.files
const buttons = message.common.buttons

type FileManagerProps = {
  itemType: FILE_TYPE
  uid: string
  hasEditRole?: boolean
}

const FileManager = ({ itemType, uid, hasEditRole }: FileManagerProps) => {
  const [open, setOpen] = useState(false)
  const [openLinkModal, setOpenLinkModal] = useState(false)
  const { data: filesData } = useFiles({ itemType, uid })
  const { data: linksData } = useLinks({ uid })

  const { mutate: linkCreate } = useLinkCreate({ parentUid: uid })

  const files = useMemo(() => {
    return [
      ...(filesData?.map(file => ({ ...file, type: 'FILE' })) || []),
      ...(linksData?.map(link => ({
        ...link,
        id: link.uid,
        type: 'LINK',
        size: 0
      })) || [])
    ]
  }, [filesData, linksData])

  const [linkValue, setLinkValue] = useState('')
  const [linkName, setLinkName] = useState('')

  const { onDrop, handlePut, loading } = useFileRequests({
    itemType,
    uid
  })

  // Define columns for useGeneralTable
  const columns = useFileColumns({
    hasEditRole,
    itemType,
    uid,
    handlePut
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })

  const { onClick, ...restRootProps } = getRootProps()

  const onClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    fileInputRef.current?.click() && onClick && onClick(e)
  }

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
    <div>
      <Heading text={messages.title}>
        {hasEditRole && (
          <Fragment>
            <div {...restRootProps}>
              <input
                {...getInputProps()}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <PlusButton
                buttonSize="large"
                primary={!isDragActive}
                type={'button'}
                onClick={() => {
                  setOpen(true)
                }}
              />
            </div>
          </Fragment>
        )}
      </Heading>
      {loading.some(value => value) && <ProgressBarComponent />}
      {files && (
        <PandaTable
          {...{
            tableId: 'filemanager',
            data: files,
            columns,
            settings: {
              enableSorting: true,
              manualSorting: false,
              enableFiltering: true,
              manualFiltering: false
            }
          }}
        />
      )}
      <ModalComponent {...{ open, setOpen, buttons: { noButtons: true } }}>
        <div className="flex flex-col">
          <Button
            className="flex align-middle justify-center text-base"
            onClick={e => {
              onClickHandler(e)
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
          type="string"
          className="form-field rounded-md"
          placeholder="Write link name here"
          value={linkName}
          onChange={e => setLinkName(e.target.value)}
        />
        <input
          type="string"
          className="form-field rounded-md"
          placeholder="Copy or write link here"
          value={linkValue}
          onChange={e => setLinkValue(e.target.value)}
        />
      </ModalComponent>
    </div>
  )
}

export default FileManager
