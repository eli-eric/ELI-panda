import { useQueryClient } from '@tanstack/react-query'
import type { FC } from 'react'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Paragraph } from '@/components/visuals/Paragraph'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSystemFieldUpdate } from '../../hooks/mutations/useSystemFieldUpdate'
import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import type { SystemLeaf } from '../../types'
import { LEAVES_QUERY_KEY } from '../../types/constants'

const messages = message.systemsPage.systemDetail

interface SetMinimalSparesModalContentProps {
    systemUid: string
    modalId: string
}

const SetMinimalSparesModalContent: FC<SetMinimalSparesModalContentProps> = ({
    systemUid,
    modalId,
}) => {
    const { closeModal } = useDynamicModalStore()
    const queryClient = useQueryClient()
    const { minimalSpareParstCount } = useSystemDetail(systemUid)
    const { updateField } = useSystemFieldUpdate()
    const [value, setValue] = useState(minimalSpareParstCount ?? 0)

    const handleOk = () => {
        // 0/empty means "no minimum" and is stored as null, matching the legacy
        // system form payload and the gray (no requirement) coverage coloring.
        const promise = updateField(
            systemUid,
            'minimalSpareParstCount',
            value > 0 ? value : null,
            { previousValue: minimalSpareParstCount },
        )
        // sp_coverage is recomputed server-side on read; refresh the tables
        // that color rows by it. Failures are surfaced by the hook's toast.
        void promise
            ?.then(() => {
                queryClient.invalidateQueries({ queryKey: [LEAVES_QUERY_KEY] })
                queryClient.invalidateQueries({ queryKey: ['systems'] })
            })
            .catch(() => {})
        closeModal(modalId)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <label className="font-bold mr-2 text-gray-600 dark:text-gray-200">
                    <FormattedMessage id={messages.form.minimalSpareParstCount.label} />
                </label>
                <Input
                    type="number"
                    min={0}
                    value={value}
                    onChange={e => setValue(Number(e.target.value))}
                    className="w-24"
                    data-testid="set-minimal-spares-input"
                />
            </div>
            <Paragraph message={messages.minimalSparePartsModal.message} />
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => closeModal(modalId)}>
                    <FormattedMessage id={message.common.buttons.cancel} />
                </Button>
                <Button onClick={handleOk} data-testid="set-minimal-spares-ok">
                    <FormattedMessage id={message.common.buttons.ok} />
                </Button>
            </div>
        </div>
    )
}

export const openSetMinimalSparesModal = (system: SystemLeaf) => {
    if (typeof window === 'undefined') return

    const { openModal } = useDynamicModalStore.getState()
    const modalId = `set-minimal-spares-${system.uid}`

    return openModal('dialog', {
        id: modalId,
        component: () => (
            <SetMinimalSparesModalContent systemUid={system.uid} modalId={modalId} />
        ),
        props: {
            size: 'm' as const,
        },
    })
}
