import type { ColumnFiltersState } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { InputAmount, InputCurrency } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { message } from '@/i18n/src/messages'
import type { ServiceLineFormType } from '@/modules/orderItem/types/form'
import { useServiceType } from '@/modules/services/hooks/useServiceType'
import type { WizardStepConfig } from '@/modules/shared/form/wizardV2/types'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import type { CodebookType } from '@/types/responses/codebook'

import { ServiceLineDetails } from '../details/service-line.details'
import { ItemsSelectTable } from '../items/items-select.table'
import { useServiceLineFields } from './useServiceLineFields'

const messages = message.ordersPage.serviceLines.wizard

export const useServiceLineSteps = () => {
  const { formatMessage: fm } = useIntl()
  const fields = useServiceLineFields()
  const tableId = 'items-select-table'

  const [serviceTypeUid, setUid] = useState<string | undefined>()

  const { data } = useServiceType(serviceTypeUid)

  const [, setColumnFilters] = useFilters(tableId, false, false)

  useEffect(() => {
    if (data?.category) {
      const filters: ColumnFiltersState = [
        {
          id: 'category',
          value: data?.category
        },
        {
          id: 'itemUsage',
          value: [
            '25c189d0-0564-43a7-90d9-65b7083bea98',
            'a2aae89a-5cbe-4042-a726-44012b158226',
            '89d68bc5-82cc-45cf-80aa-8edb86bf52f1',
            '5defcd49-5307-4b21-94b1-870b8f61a919',
            '0c7a063d-2bb6-41ef-b808-a137e1deaaa0',
            'a5a2a316-fc23-45fd-b6b2-3dc2af4205ea'
          ],
          name: 'itemUsage'
        }
      ]
      setColumnFilters(filters)
    }
    // eslint-disable-next-line
  }, [data])

  const onChangeService = (v: CodebookType) => {
    setUid(v.uid)
  }

  const shouldShowDetails = () =>
    data ? Boolean(data?.properties?.length) : true

  const steps: WizardStepConfig<ServiceLineFormType>[] = [
    {
      id: 'basicInfo',
      title: fm({ id: messages.steps.step1.title }),
      fields: [
        {
          componentType: 'input',
          field: { ...fields.name }
        },
        {
          componentType: 'component',
          colSpan: 8,
          field: {
            ...fields.serviceType
          },
          component: (
            <Listbox {...fields.serviceType} onChange={onChangeService} />
          )
        },
        {
          componentType: 'component',
          colSpan: 4,
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
      ]
    },
    {
      id: 'serviceLineDetails',
      title: fm({ id: messages.steps.step2.title }),
      component: <ServiceLineDetails />,
      shouldShow: shouldShowDetails
    },
    {
      id: 'items',
      title: fm({ id: messages.steps.step3.title }),
      component: <ItemsSelectTable />
    }
  ]

  return steps
}
