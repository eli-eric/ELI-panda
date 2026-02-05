import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import type { OrderLineWizardFormType } from '@/modules/orderItem/types/form'
import { FormWizard } from '@/modules/shared/form/wizardV3/FormWizard'
import { WizardStep } from '@/modules/shared/form/wizardV3/WizardStep'
import { ORDER_LINE_DEFAULTS } from '@/types/constants/formDefaults'

import { orderLineWizardSchema } from './schema'
import { OrderLineStep1Catalogue } from './steps/order-line-step1-catalogue'
import { OrderLineStep2Form } from './steps/order-line-step2-form'
import { OrderLineStep3SystemConfig } from './steps/order-line-step3-system-config'

const messages = message.ordersPage.orderLines.wizard

type Props = {
    handleSubmit: (
        data: OrderLineWizardFormType,
        reset: UseFormReset<OrderLineWizardFormType>,
    ) => void
}

export const OrderLineWizard = ({ handleSubmit }: Props) => {
    const { formatMessage: fm } = useIntl()

    // Validate Step 2 - name and catalogueNumber required
    const validateStep2 = useCallback((formData: OrderLineWizardFormType) => {
        return Boolean(formData.name && formData.catalogueNumber)
    }, [])

    // Validate Step 3 - globalParentSystem required and all configs valid
    const validateStep3 = useCallback((formData: OrderLineWizardFormType) => {
        // Check if globalParentSystem is selected
        if (!formData.globalParentSystem) {
            return false
        }

        // Check if systemConfigs exist and are valid
        const configs = formData.systemConfigs || []
        if (configs.length === 0) {
            return false
        }

        // Validate each config
        return configs.every(config => {
            // If systemType is 'existing', selectedSystem must be present
            if (config.systemType === 'existing') {
                return Boolean(config.selectedSystem)
            }
            // For 'new' type, just check systemName is present
            return Boolean(config.systemName)
        })
    }, [])

    // Initial values with defaults from constants
    const initialValues = useMemo(() => ORDER_LINE_DEFAULTS, [])

    return (
        <FormWizard<OrderLineWizardFormType>
            onSubmit={handleSubmit}
            initialValues={initialValues}
            resolver={zodResolver(orderLineWizardSchema) as any}
        >
            <WizardStep
                id="catalogue"
                title={fm({ id: messages.steps.step1.title })}
                hideDefaultNavigation
            >
                {({ handleNext, isProcessing }) => (
                    <OrderLineStep1Catalogue handleNext={handleNext} isProcessing={isProcessing} />
                )}
            </WizardStep>

            <WizardStep
                id="form"
                title={fm({ id: messages.steps.step2.title })}
                validate={validateStep2}
            >
                <OrderLineStep2Form />
            </WizardStep>

            <WizardStep
                id="system-config"
                title={fm({ id: messages.steps.step3.title })}
                validate={validateStep3}
            >
                <OrderLineStep3SystemConfig />
            </WizardStep>
        </FormWizard>
    )
}
