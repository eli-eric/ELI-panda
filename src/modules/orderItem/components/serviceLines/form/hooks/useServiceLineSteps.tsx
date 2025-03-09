import type { ColumnFiltersState } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
  const [previousServiceType, setPreviousServiceType] = useState<
    string | undefined
  >()

  const { data } = useServiceType(serviceTypeUid)

  const [, setColumnFilters] = useFilters(tableId, false, false)

  // Memoizujeme filtr pro kategorii, aby nedocházelo k zbytečným re-renderům
  const categoryFilters = useMemo(() => {
    if (!data?.category) return null

    return [
      {
        id: 'category',
        value: data.category
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
    ] as ColumnFiltersState
  }, [data?.category])

  // Aplikujeme filtry jen když se změní categoryFilters
  useEffect(() => {
    if (categoryFilters) {
      setColumnFilters(categoryFilters)
    }
  }, [categoryFilters, setColumnFilters])

  // Použijeme useCallback pro onChangeService
  const onChangeService = useCallback((v?: CodebookType) => {
    setUid(v?.uid)
  }, [])

  // Použijeme useMemo pro shouldShowDetails
  const shouldShowDetails = useCallback(
    () => (data ? Boolean(data?.properties?.length) : true),
    [data]
  )

  // Memoizujeme onStepComplete callback
  const handleStepComplete = useCallback(
    async (data: Partial<ServiceLineFormType>, unregister: any) => {
      const currentServiceType = data.serviceType?.uid
      // If service type has changed, clear details
      if (previousServiceType !== currentServiceType) {
        unregister('details')
        setPreviousServiceType(currentServiceType)
      }
    },
    [previousServiceType]
  )

  // Memoizujeme jednotlivé komponenty kroků
  const serviceTypeComponent = useMemo(
    () => <Listbox {...fields.serviceType} onChange={onChangeService} />,
    [fields.serviceType, onChangeService]
  )

  const priceComponent = useMemo(
    () => (
      <InputAmount {...fields.price}>
        <InputCurrency {...fields.currency} />
      </InputAmount>
    ),
    [fields.price, fields.currency]
  )

  const serviceLineDetailsComponent = useMemo(
    () => (
      <ServiceLineDetails
        serviceType={data ? { name: data?.name, uid: data?.uid } : undefined}
      />
    ),
    [data]
  )

  const itemsSelectComponent = useMemo(() => <ItemsSelectTable />, [])

  // Memoizujeme celou strukturu kroků
  const steps = useMemo<WizardStepConfig<ServiceLineFormType>[]>(
    () => [
      {
        id: 'basicInfo',
        title: fm({ id: messages.steps.step1.title }),
        onStepComplete: handleStepComplete,
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
            component: serviceTypeComponent
          },
          {
            componentType: 'component',
            colSpan: 4,
            field: { ...fields.price },
            component: priceComponent
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
        component: serviceLineDetailsComponent,
        shouldShow: shouldShowDetails
      },
      {
        id: 'items',
        title: fm({ id: messages.steps.step3.title }),
        component: itemsSelectComponent
      }
    ],
    [
      fm,
      handleStepComplete,
      fields.name,
      fields.serviceType,
      fields.price,
      fields.notes,
      serviceTypeComponent,
      priceComponent,
      serviceLineDetailsComponent,
      shouldShowDetails,
      itemsSelectComponent
    ]
  )

  return steps
}
