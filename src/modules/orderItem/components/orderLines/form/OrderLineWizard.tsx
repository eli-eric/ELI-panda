import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useMemo } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { FormWizard } from '@/modules/shared/form/wizardV3/FormWizard'
import { WizardStep } from '@/modules/shared/form/wizardV3/WizardStep'
import { ORDER_LINE_DEFAULTS } from '@/types/constants/formDefaults'

import { orderLineSchema } from './schema'
import { OrderLineStep1Catalogue } from './steps/order-line-step1-catalogue'
import { OrderLineStep2Form } from './steps/order-line-step2-form'

const messages = message.ordersPage.orderLines.wizard

type Props = {
  handleSubmit: (
    data: OrderLineFormType,
    reset: UseFormReset<OrderLineFormType>
  ) => void
}

export const OrderLineWizard = ({ handleSubmit }: Props) => {
  const { formatMessage: fm } = useIntl()

  // Validate Step 2 - name and catalogueNumber required
  const validateStep2 = useCallback((formData: OrderLineFormType) => {
    return Boolean(formData.name && formData.catalogueNumber)
  }, [])

  // Initial values with defaults from constants
  const initialValues = useMemo(() => ORDER_LINE_DEFAULTS, [])

  return (
    <FormWizard<OrderLineFormType>
      onSubmit={handleSubmit}
      initialValues={initialValues}
      resolver={zodResolver(orderLineSchema) as any}
    >
      <WizardStep
        id="catalogue"
        title={fm({ id: messages.steps.step1.title })}
        hideDefaultNavigation
      >
        {({ handleNext, isProcessing }) => (
          <OrderLineStep1Catalogue
            handleNext={handleNext}
            isProcessing={isProcessing}
          />
        )}
      </WizardStep>

      <WizardStep
        id="form"
        title={fm({ id: messages.steps.step2.title })}
        validate={validateStep2}
      >
        <OrderLineStep2Form />
      </WizardStep>
    </FormWizard>
  )
}
