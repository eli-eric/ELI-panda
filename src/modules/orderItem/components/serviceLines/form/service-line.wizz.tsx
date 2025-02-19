import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import type { WizardStepConfig } from '@/modules/shared/form/wizardV2/types'
import { FormWizard } from '@/modules/shared/form/wizardV2/wizard-form.cont'

const messages = message.ordersPage.serviceLines.wizard

// Define the specific form data structure for service lines
interface ServiceLineFormData {
  name: string
  description?: string
  serviceType?: string
  item: string
}

export const ServiceLineWizard = () => {
  const { formatMessage: fm } = useIntl()

  const steps: WizardStepConfig<ServiceLineFormData>[] = [
    {
      title: fm({ id: messages.steps.step1.title }),
      fields: [
        {
          componentType: 'input',
          field: {
            name: 'name',
            label: fm({ id: messages.steps.step1.form.name.label }),
            required: true
          }
        },
        {
          componentType: 'textarea',
          field: {
            name: 'description',
            label: fm({ id: messages.steps.step1.form.description.label }),
            required: false
          }
        }
      ],
      validation: data => {
        if (!data.name) return false
        return data.name.length >= 3
      },
      onStepComplete: data => {
        console.log('Step 1 completed with data:', data)
      }
    },
    {
      title: fm({ id: messages.steps.step2.title }),
      fields: [
        {
          componentType: 'combo',
          field: {
            name: 'serviceType',
            label: fm({ id: messages.steps.step2.form.serviceType.label }),
            required: false
          }
        },
        {
          componentType: 'combo-system',
          field: {
            name: 'item',
            label: fm({ id: messages.steps.step2.form.item.label }),
            required: true
          }
        }
      ],
      validation: data => {
        return !!data.item // Ensure item is selected
      }
    }
  ]

  const handleSubmit = (formData: ServiceLineFormData) => {
    console.log('Form submitted with data:', formData)
  }

  return (
    <FormWizard<ServiceLineFormData>
      steps={steps}
      onSubmit={handleSubmit}
      initialData={{
        name: '',
        description: '',
        serviceType: undefined,
        item: ''
      }}
    />
  )
}
