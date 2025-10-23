import { useRouter } from 'next/router'
import { type FC, useState } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import CatalogueTableSelect from '@/modules/shared/catalogue/table/CatalogueTableSelect'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import type { CatalogueItem } from '@/types/responses/catalogue'

import { useCreateRelatedItem } from '../../hooks/useCreateRelatedItem'
import { useRelatedItems } from '../../hooks/useRelatedItems'

/**
 * Opens the select related items modal
 */
export function openSelectRelatedItemsModal() {
  if (typeof window === 'undefined') return // Prevent SSR execution

  const { openModal } = useModalGlobalStore.getState()

  openModal('dialog1', {
    component: () => <SelectRelatatedItemsModalContent />,
    props: {
      title: 'Select Related Item',
      size: 'l' as const
    }
  })
}
export const SelectRelatatedItemsModalContent: FC = () => {
  const { formatMessage: fm } = useIntl()
  const [selectedItem, setSelectedItem] = useState<CatalogueItem | undefined>()
  const { createRelatedItem, loading } = useCreateRelatedItem()
  const { refetch } = useRelatedItems()
  const { closeModal } = useModalGlobalStore()
  const router = useRouter()
  const itemUid = router.query.uid as string

  const handleSubmit = () => {
    if (selectedItem) {
      createRelatedItem(
        {
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
        {
          onError: error => {
            toast.error(error.message)
          },
          onSuccess: () => {
            closeModal('dialog1')
            setSelectedItem(undefined)
            refetch()
          }
        }
      )
    }
  }

  return (
    <div className="space-y-4">
      <CatalogueTableSelect
        setItem={setSelectedItem}
        selectedItem={selectedItem}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => closeModal('dialog1')}>
          {fm({ id: message.common.buttons.cancel })}
        </Button>
        <Button onClick={handleSubmit} disabled={!selectedItem || loading}>
          {loading
            ? fm({ id: message.common.ui.adding })
            : fm({ id: message.common.ui.addRelatedItem })}
        </Button>
      </div>
    </div>
  )
}
