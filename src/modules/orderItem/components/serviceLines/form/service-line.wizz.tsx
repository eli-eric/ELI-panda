import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import type { WizardStep } from '@/modules/shared/form/wizardV2/types'
import { FormWizard } from '@/modules/shared/form/wizardV2/wizard-form.cont'

const messages = message.ordersPage.serviceLines.wizard

export const ServiceLineWizard = () => {
  const { formatMessage: fm } = useIntl()
  const steps: WizardStep[] = [
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
      ]
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
      ]
    }
  ]

  const handleSubmit = (formData: any) => {
    console.log(formData)
  }

  return <FormWizard steps={steps} onSubmit={handleSubmit} />
}
