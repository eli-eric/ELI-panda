import type { FC } from 'react'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Paragraph } from '@/components/visuals/Paragraph'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useRecalculateSpareParts } from '../../hooks/mutations/useRecalculateSpareParts'
import { useSystemFieldUpdate } from '../../hooks/mutations/useSystemFieldUpdate'
import type { SystemLeaf } from '../../types'

const messages = message.systemsPage.systemDetail

const INPUT_ID = 'set-minimal-spares-input'

interface SetMinimalSparesModalContentProps {
    systemUid: string
    modalId: string
    currentValue: number | null
}

const SetMinimalSparesModalContent: FC<SetMinimalSparesModalContentProps> = ({
    systemUid,
    modalId,
    currentValue,
}) => {
    const { closeModal } = useDynamicModalStore()
    const recalculateSpareParts = useRecalculateSpareParts()
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
        // The requirement is the divisor of sp_coverage, and this save goes to
        // Neo4j through GraphQL, which the API's recalculation never sees — so
        // ask for it explicitly, or coverage stays at whatever it was (null for
        // a system that had no requirement until now). A blocked save resolves
        // undefined — nothing changed, so skip. Failures are surfaced by the
        // update hook's toast.
        void promise
            .then(result => {
                if (!result) return
                return recalculateSpareParts()
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
                    // Coverage can be shared between systems (0.25 = one spare per
                    // four), so fractional minimums must stay valid.
                    step="any"
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

interface OpenSetMinimalSparesModalArgs {
    system: SystemLeaf
    title: string
    // Taken from the already-loaded system detail: opening a second observer of
    // the detail query here would duplicate its error toast.
    currentValue: number | null
}

export const openSetMinimalSparesModal = ({
    system,
    title,
    currentValue,
}: OpenSetMinimalSparesModalArgs) => {
    if (typeof window === 'undefined') return // Prevent SSR execution

    const { openModal } = useDynamicModalStore.getState()
    const modalId = `set-minimal-spares-${system.uid}`

    return openModal('dialog', {
        id: modalId,
        component: () => (
            <SetMinimalSparesModalContent
                systemUid={system.uid}
                modalId={modalId}
                currentValue={currentValue}
            />
        ),
        props: {
            title,
            size: 'm' as const,
        },
    })
}
