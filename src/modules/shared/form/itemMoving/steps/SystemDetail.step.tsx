import { yupResolver } from '@hookform/resolvers/yup'
import { type FC, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { BreadcrumpContainer, BreadcrumpItem } from '@/components/breadcrumps'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import Card, { FormCard } from '@/components/layout/Card'
import { Heading } from '@/components/layout/Heading'
import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { getColorBySystemLevel } from '@/modules/systemItem/utils'
import type { ModalButtons } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'
import type { SystemDetail } from '@/types/responses/systems'

import { SelectLocationCombo } from '../../location/SelectLocation.combo'
import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useFormFields } from '../hooks/useFormFields'
import { useWizardContextSystem } from '../hooks/useWizardContextSystem'
import { useModalWizardStore } from '../store/useModalWizardStore'
import { SummaryListParam } from './components/SymmaryListParam.comp'

const messages = message.common.buttons

type SystemDetailForm = {
    location?: CodebookType
    name: string
    itemUsage?: CodebookType
    conditionStatus?: CodebookType
}

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
})

export const SystemDetailStep: FC = () => {
    const fields = useFormFields()

    const { goNext, goBack, formData, updateFormData } = useWizardStore()
    const { isMovingToNewSystem } = useModalWizardStore()

    const system = formData.system as SystemDetail
    const parentPath = useMemo(() => {
        return [...(system?.parentPath || []), { uid: system?.uid, name: system?.name }]
    }, [system])

    const { physicalItem, catalogueItem } = useWizardContextSystem()

    const defaultValues = isMovingToNewSystem
        ? {
              name: formData?.name || physicalItem?.name || '',
              location: formData?.location || undefined,
              itemUsage: formData?.itemUsage || physicalItem?.itemUsage || undefined,
              conditionStatus:
                  formData?.conditionStatus || physicalItem?.conditionStatus || undefined,
          }
        : {
              location:
                  formData?.location || formData?.system?.location
                      ? {
                            name: formData?.system?.location?.name,
                            uid: formData.system?.location?.uid,
                        }
                      : undefined,
              name: formData?.name || formData?.system?.name || '',
              itemUsage: formData?.itemUsage || physicalItem?.itemUsage || undefined,
              conditionStatus:
                  formData?.conditionStatus || physicalItem?.conditionStatus || undefined,
          }

    const formMethods = useForm<SystemDetailForm>({
        defaultValues,
        resolver: yupResolver(schema),
    })

    // Re-seed defaults once the moved item's detail arrives — the fetch may
    // still be in flight when this step mounts
    useEffect(() => {
        if (physicalItem && !formMethods.formState.isDirty) {
            formMethods.reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [physicalItem?.uid])

    const submit = (data: SystemDetailForm) => {
        updateFormData({ ...data })
        goNext()
    }
    const { isValid } = formMethods.formState

    const handleNextStep = () => {
        formMethods.handleSubmit(submit)()
    }

    const buttons: ModalButtons = {
        goNext: {
            text: messages.next,
            onClick: handleNextStep,
            disabled: !isValid,
        },
        goBack: {
            text: messages.back,
            onClick: goBack,
        },
    }

    return (
        <div>
            <Form formMethods={formMethods}>
                <Card>
                    <BreadcrumpContainer>
                        <BreadcrumpItem
                            noIcon={true}
                            name={
                                isMovingToNewSystem
                                    ? 'Parent system path:'
                                    : 'Destination system path:'
                            }
                        />
                        {parentPath?.map((system: CodebookType, i) => (
                            <BreadcrumpItem
                                noIcon={i === 0}
                                key={system?.uid}
                                name={system?.name}
                                systemLevel={system.systemLevel}
                            />
                        ))}
                    </BreadcrumpContainer>
                </Card>
                <FormCard
                    title="System details"
                    className={cn(
                        'shadow-md rounded-lg border p-4 mt-2',
                        !isMovingToNewSystem && getColorBySystemLevel(system?.systemLevel),
                    )}
                >
                    <div className="grid grid-cols-2 gap-2">
                        <Input {...fields.name} />
                        <SelectLocationCombo locationField={{ ...fields.location }} />
                    </div>
                    {!isMovingToNewSystem && (
                        <ul className="grid grid-cols-1">
                            <SummaryListParam name="Code" value={formData?.system?.systemCode} />
                            <SummaryListParam name="Zone" value={formData?.system?.zone?.name} />
                        </ul>
                    )}
                    <Card className="bg-amber-100 dark:bg-amber-600 mt-4 rounded-md  shadow-md">
                        <Heading customText={`Item: ${catalogueItem?.name}`} />
                        <div className="grid grid-cols-2 gap-2">
                            <Listbox {...fields.itemUsage} />
                            <Listbox {...fields.itemConditionStatus} />
                        </div>
                        <ul className="grid grid-cols-1">
                            <SummaryListParam
                                name="Serial Number"
                                value={physicalItem?.serialNumber || ''}
                            />
                            <SummaryListParam name="Eun" value={physicalItem?.eun || ''} />
                            <SummaryListParam
                                name="Part Number"
                                value={catalogueItem?.catalogueNumber || ''}
                            />
                        </ul>
                    </Card>
                </FormCard>
            </Form>
            <ModalButtonsComponent buttons={buttons} />
        </div>
    )
}
