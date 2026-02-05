import { useRouter } from 'next/router'
import { type FC, useState } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import CatalogueTableSelect from '@/modules/shared/catalogue/table/CatalogueTableSelect'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { CatalogueItem } from '@/types/responses/catalogue'

import { useCreateRelatedItem } from '../../hooks/useCreateRelatedItem'
import { useRelatedItems } from '../../hooks/useRelatedItems'

// Store modalId in closure for SelectRelatatedItemsModalContent to access
let currentRelatedItemsModalId: string | undefined

/**
 * Opens the select related items modal
 */
export function openSelectRelatedItemsModal() {
    if (typeof window === 'undefined') return // Prevent SSR execution

    const { openModal } = useDynamicModalStore.getState()

    currentRelatedItemsModalId = openModal('dialog', {
        id: 'related-items',
        component: () => <SelectRelatatedItemsModalContent />,
        props: {
            title: 'Select Related Item',
            size: 'l' as const,
        },
    })

    return currentRelatedItemsModalId
}
export const SelectRelatatedItemsModalContent: FC = () => {
    const { formatMessage: fm } = useIntl()
    const [selectedItem, setSelectedItem] = useState<CatalogueItem | undefined>()
    const { createRelatedItem, loading } = useCreateRelatedItem()
    const { refetch } = useRelatedItems()
    const { closeModal } = useDynamicModalStore()
    const router = useRouter()
    const itemUid = router.query.uid as string

    const handleSubmit = () => {
        if (selectedItem) {
            createRelatedItem(
                {
                    where: {
                        uid: itemUid,
                    },
                    update: {
                        relatedCatalogueItems: [
                            {
                                connect: [
                                    {
                                        where: {
                                            node: {
                                                uid: selectedItem.uid,
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    onError: error => {
                        toast.error(error.message)
                    },
                    onSuccess: () => {
                        if (currentRelatedItemsModalId) {
                            closeModal(currentRelatedItemsModalId)
                        }
                        setSelectedItem(undefined)
                        refetch()
                    },
                },
            )
        }
    }

    return (
        <div className="space-y-4">
            <CatalogueTableSelect setItem={setSelectedItem} selectedItem={selectedItem} />
            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    onClick={() => {
                        if (currentRelatedItemsModalId) {
                            closeModal(currentRelatedItemsModalId)
                        }
                    }}
                >
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
