import { useQueryClient } from '@tanstack/react-query'
import type { FC } from 'react'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Paragraph } from '@/components/visuals/Paragraph'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSystemFieldUpdate } from '../../hooks/mutations/useSystemFieldUpdate'
import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import type { SystemLeaf } from '../../types'
import { LEAVES_QUERY_KEY } from '../../types/constants'

const messages = message.systemsPage.systemDetail

const INPUT_ID = 'set-minimal-spares-input'

interface SetMinimalSparesFormProps {
    systemUid: string
    modalId: string
    currentValue: number | null
}

const SetMinimalSparesForm: FC<SetMinimalSparesFormProps> = ({
    systemUid,
    modalId,
    currentValue,
}) => {
    const { closeModal } = useDynamicModalStore()
    const queryClient = useQueryClient()
    const { updateField } = useSystemFieldUpdate()
    const [value, setValue] = useState(currentValue ?? 0)

    const handleOk = () => {
        // 0/empty means "no minimum" and is stored as null, matching the legacy
        // system form payload and the gray (no requirement) coverage coloring.
        const promise = updateField(
            systemUid,
            'minimalSpareParstCount',
            value > 0 ? value : null,
            { previousValue: currentValue },
        )
        // sp_coverage is recomputed server-side on read; refresh the tables that
        // color rows by it. A blocked save resolves undefined — nothing changed,
        // so skip. Failures are surfaced by the hook's toast.
        void promise
            .then(result => {
                if (!result) return
                queryClient.invalidateQueries({ queryKey: [LEAVES_QUERY_KEY] })
                queryClient.invalidateQueries({ queryKey: ['systems'] })
            })
            .catch(() => {})
        closeModal(modalId)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center">
                <label
                    htmlFor={INPUT_ID}
                    className="font-bold mr-2 text-gray-600 dark:text-gray-200"
                >
                    <FormattedMessage id={messages.form.minimalSpareParstCount.label} />
                </label>
                <Input
                    id={INPUT_ID}
                    type="number"
                    min={0}
                    value={value}
                    // valueAsNumber is NaN for intermediate states ("", "-"); fall
                    // back to 0 so the controlled input never goes uncontrolled.
                    onChange={e =>
                        setValue(
                            Number.isFinite(e.target.valueAsNumber)
                                ? e.target.valueAsNumber
                                : 0,
                        )
                    }
                    className="w-24"
                    data-testid={INPUT_ID}
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

interface SetMinimalSparesModalContentProps {
    systemUid: string
    modalId: string
}

const SetMinimalSparesModalContent: FC<SetMinimalSparesModalContentProps> = ({
    systemUid,
    modalId,
}) => {
    const { minimalSpareParstCount, isLoading } = useSystemDetail(systemUid)

    // The form seeds its input from the loaded value once; rendering it before
    // the detail resolves would show 0 and let OK wipe an existing minimum.
    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-16 w-full" />
            </div>
        )
    }

    return (
        <SetMinimalSparesForm
            systemUid={systemUid}
            modalId={modalId}
            currentValue={minimalSpareParstCount}
        />
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
