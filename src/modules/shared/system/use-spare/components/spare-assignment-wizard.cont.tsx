import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import Listbox from '@/components/form/Listbox'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { message } from '@/i18n/src/messages'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import { FormWizard, WizardStep } from '@/modules/shared/form/wizardV3'
import { useRecalculate } from '@/modules/systemItem/hooks/useRecalculate'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import useTableStateStore from '@/store/useTableStateStore'
import { CODEBOOK } from '@/types/constants/codebook'
import { matchesSpareAffectedQuery } from '@/utils/query/spareInvalidationPredicate'

import { useAssignSpare } from '../hooks/useAssignSpare'
import type { SpareAssignmentFormType, SpareAssignmentPayload } from '../types'
import { SpareParentSystemSelectTable } from './spare-parent-system-select.table'

interface SpareAssignmentWizardProps {
    systemUid: string
    spareItemUid: string
    onSuccess?: () => void
}

const tableId = 'spare-parent-system-select-table'
const messages = message.common.spareAssignment

// Auto-assign checkbox component
const AutoAssignCheckbox = () => {
    const { formatMessage: fm } = useIntl()
    const { setValue, watch } = useFormContext<SpareAssignmentFormType>()
    const autoAssignParent = watch('autoAssignParent')

    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                id="autoAssignParent"
                checked={autoAssignParent}
                onCheckedChange={(checked: boolean) =>
                    setValue('autoAssignParent', checked, { shouldValidate: true })
                }
            />
            <Label
                htmlFor="autoAssignParent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
                {fm({ id: messages.form.autoAssignParent.label })}
            </Label>
        </div>
    )
}

export const SpareAssignmentWizardContainer = ({
    systemUid,
    spareItemUid,
    onSuccess,
}: SpareAssignmentWizardProps) => {
    const { formatMessage: fm } = useIntl()
    const { mutateAsync } = useAssignSpare()
    const { closeModal } = useDynamicModalStore()
    const queryClient = useQueryClient()

    const initialData: Partial<SpareAssignmentFormType> = useMemo(
        () => ({
            autoAssignParent: true,
        }),
        [],
    )

    const [recalculate] = useRecalculate({})

    const handleSubmit = async (data: SpareAssignmentFormType, reset: () => void) => {
        // Validate required fields — early returns keep wizard open
        if (!data.oldItemCondition) {
            toast.error(fm({ id: message.common.spareAssignment.errors.conditionRequired }))
            return
        }
        if (!data.newItemLocation) {
            toast.error(fm({ id: message.common.spareAssignment.errors.locationRequired }))
            return
        }

        let newParentSystemUid: string | undefined
        if (!data.autoAssignParent) {
            const { instances } = useTableStateStore.getState()
            const rowSelection = instances[tableId]?.rowSelection || {}
            const selectedSystemUids = Object.keys(rowSelection).filter(
                key => rowSelection[key],
            )
            if (selectedSystemUids.length === 0) {
                toast.error(fm({ id: message.common.spareAssignment.errors.noSystemSelected }))
                return
            }
            newParentSystemUid = selectedSystemUids[0]
        }

        const payload: SpareAssignmentPayload = {
            systemUid,
            spareItemUid,
            oldItemCondition: data.oldItemCondition,
            newItemLocation: data.newItemLocation,
            ...(newParentSystemUid && { newParentSystemUid }),
        }

        // Close immediately — pipeline feedback lives in the toast
        closeModal('spare-assignment-wizard')
        reset()

        toast.promise(
            (async () => {
                await mutateAsync(payload)
                await queryClient.invalidateQueries({
                    predicate: matchesSpareAffectedQuery([systemUid, spareItemUid]),
                })
                // Tree-structure recalc — intentionally fire-and-forget. Awaiting it would
                // let a recalc failure flip this toast to "Failed to assign" even though the
                // assignment itself succeeded; recalc surfaces its own toast via useRecalculate.
                recalculate(null)
                onSuccess?.()
            })(),
            {
                loading: fm({ id: messages.processing }),
                success: fm({ id: messages.success.assigned }),
                error: fm({ id: messages.errors.assignmentFailed }),
            },
        )
    }

    return (
        <FormWizard<SpareAssignmentFormType> onSubmit={handleSubmit} initialValues={initialData}>
            <WizardStep
                id="itemSettings"
                title={fm({ id: messages.wizard.steps.step1.title })}
                validate={data => Boolean(data.oldItemCondition && data.newItemLocation)}
            >
                <div className="space-y-4">
                    <Listbox
                        name="oldItemCondition"
                        label={fm({ id: messages.form.oldItemCondition.label })}
                        codebook={CODEBOOK.ITEM_CONDITION_STATUS}
                        required
                        rounded="rounded-md"
                    />
                    <SelectLocationCombo
                        locationField={{
                            name: 'newItemLocation',
                            label: fm({ id: messages.form.newItemLocation.label }),
                            codebook: CODEBOOK.LOCATION,
                            required: true,
                            rounded: 'rounded-md',
                        }}
                    />
                    <AutoAssignCheckbox />
                </div>
            </WizardStep>

            <WizardStep
                id="parentSystemSelection"
                title={fm({ id: messages.wizard.steps.step2.title })}
                shouldShow={data => !data.autoAssignParent}
            >
                <SpareParentSystemSelectTable />
            </WizardStep>
        </FormWizard>
    )
}
