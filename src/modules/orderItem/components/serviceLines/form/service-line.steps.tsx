import { useIntl } from 'react-intl'

import { InputAmount, InputCurrency } from '@/components/form/inputs'
import { message } from '@/i18n/src/messages'
import type { ServiceLineFormType } from '@/modules/orderItem/types/form'
import type { WizardStepConfig } from '@/modules/shared/form/wizardV2/types'

import { ServiceLineDetails } from './details/service-line.details'
import { ItemsSelectTable } from './items/items-select.table'
import { useServiceLineFields } from './service-line.fields'

const messages = message.ordersPage.serviceLines.wizard

export const useServiceLineSteps = () => {
  const { formatMessage: fm } = useIntl()
  const fields = useServiceLineFields()

  const steps: WizardStepConfig<ServiceLineFormType>[] = [
    {
      title: fm({ id: messages.steps.step1.title }),
      fields: [
        {
          componentType: 'input',
          field: { ...fields.name }
        },
        {
          componentType: 'select',
          field: {
            ...fields.serviceType
          }
        },
        {
          componentType: 'component',
          field: { ...fields.price },
          component: (
            <InputAmount {...fields.price}>
              <InputCurrency {...fields.currency} />
            </InputAmount>
          )
        },
        {
          componentType: 'textarea',
          field: {
            ...fields.notes
          }
        }
      ],
      onStepComplete: data => {
        console.log('Step 2 completed with data:', data)
      }
    },
    {
      title: fm({ id: messages.steps.step2.title }),
      fields: [
        {
          componentType: 'component',
          field: { ...fields.item },
          component: <ServiceLineDetails />
        }
      ]
    },
    {
      title: fm({ id: messages.steps.step3.title }),
      fields: [
        {
          componentType: 'component',
          field: { ...fields.item },
          component: <ItemsSelectTable />
        }
      ]
    }
  ]

  return steps
}
