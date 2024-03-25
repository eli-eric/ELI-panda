import { useState, type FC } from 'react'

import ModalComponent from '@/components/overlays/modal/modal.comp'
import CatalogueTableSelect from '@/modules/shared/catalogue/table/CatalogueTableSelect'
import type { ModalButtons } from '@/types/form'
import type { CatalogueItem } from '@/types/responses'
import { useCreateRelatedItem } from '../../hooks/useCreateRelatedItem'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useRelatedItems } from '../../hooks/useItem'
import { message } from '@/i18n/src/messages'

const messages = message.common.buttons

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

export const SelectRelatatedItemsModal: FC<Props> = ({ open, setOpen }) => {
  const [selectedItem, setSelectedItem] = useState<CatalogueItem | undefined>()
  const { createRelatedItem, loading } = useCreateRelatedItem({ uid: selectedItem?.uid })
  const { refetch } = useRelatedItems()
  const router = useRouter()
  const itemUid = router.query.uid as string

  const submitModal = () => {
    if (selectedItem) {
      createRelatedItem({
        variables: {
          where: {
            uid: itemUid
          },
          update: {
            relatedCatalogueItems: [
              {
                connect: [
                  {
                    where: {
                      node: {
                        uid: selectedItem.uid
                      }
                    }
                  }
                ]
              }
            ]
          }
        },
        onError: error => {
          toast.error(error.message)
        },
        onCompleted: () => {
          setOpen(false)
          setSelectedItem(undefined)
          refetch()
        }
      })
    }
  }

  const buttons: ModalButtons = {
    goBack: {
      text: messages.close,
      onClick: () => setOpen(false)
    },
    goNext: {
      text: messages.continue,
      onClick: submitModal,
      loading
    }
  }

  return (
    <ModalComponent {...{ open, setOpen, buttons }}>
      <CatalogueTableSelect setItem={setSelectedItem} selectedItem={selectedItem} />
    </ModalComponent>
  )
}
