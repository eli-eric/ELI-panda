import type { ColumnFiltersState } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import type { ServiceLineFormType } from '@/modules/orderItem/types/form'
import { useServiceType } from '@/modules/services/hooks/useServiceType'
import { FormWizard } from '@/modules/shared/form/wizardV3/FormWizard'
import { WizardStep } from '@/modules/shared/form/wizardV3/WizardStep'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import useTableStateStore from '@/store/useTableStateStore'
import { ITEM_USAGE_FILTERS } from '@/types/constants/itemUsageFilters'
import { TABLE_IDS } from '@/types/constants/tableIds'

import { ServiceLineStep1BasicInfo } from './steps/service-line-step1-basic-info'
import { ServiceLineStep2Details } from './steps/service-line-step2-details'
import { ServiceLineStep3Items } from './steps/service-line-step3-items'

const messages = message.ordersPage.serviceLines.wizard

type Props = {
  handleSubmit: (
    data: ServiceLineFormType,
    reset: UseFormReset<ServiceLineFormType>
  ) => void
}

export const ServiceLineV3Wizard = ({ handleSubmit }: Props) => {
  const { formatMessage: fm } = useIntl()

  const [serviceTypeUid, setServiceTypeUid] = useState<string | undefined>()
  const [previousServiceType, setPreviousServiceType] = useState<
    string | undefined
  >()

  const { data } = useServiceType(serviceTypeUid)
  const category = data?.category
  const properties = data?.properties
  const serviceName = data?.name
  const serviceUid = data?.uid

  const [, setColumnFilters] = useFilters(
    TABLE_IDS.SERVICE_LINE_ITEMS_SELECT,
    false,
    false
  )

  // Memoized category filters - prevents unnecessary re-renders
  const categoryFilters = useMemo(() => {
    if (!category) return null
    return [
      {
        id: 'category',
        value: category
      },
      {
        id: 'itemUsage',
        value: ITEM_USAGE_FILTERS.SERVICE_LINE_DEFAULT,
        name: 'itemUsage'
      }
    ] as ColumnFiltersState
  }, [category])

  // Memoized service type data - prevents unnecessary re-renders of Step2
  const serviceTypeData = useMemo(() => {
    return serviceName && serviceUid
      ? { name: serviceName, uid: serviceUid }
      : undefined
  }, [serviceName, serviceUid])

  // Callback for service type change
  const onServiceTypeChange = useCallback((serviceType?: any) => {
    setServiceTypeUid(serviceType?.uid)
  }, [])

  // Determine if details step should be shown
  const shouldShowDetails = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_formData: ServiceLineFormType) => {
      // NOTE: We use closure over 'properties' from useServiceType because
      // service type properties are fetched separately and not stored in formData.
      // The formData parameter is kept for WizardStep API consistency.
      return properties ? Boolean(properties.length) : true
    },
    [properties]
  )

  // Step 1 completion handler
  const handleStep1Complete = useCallback(
    async (formData: ServiceLineFormType) => {
      const currentServiceType = formData.serviceType?.uid

      // If service type has changed, we need to clear details
      // In V3, we don't have access to unregister, so we handle this differently
      if (previousServiceType !== currentServiceType) {
        setPreviousServiceType(currentServiceType)
      }

      // Apply category filters for the table
      if (categoryFilters) {
        setColumnFilters(categoryFilters)
      }
    },
    [previousServiceType, categoryFilters, setColumnFilters]
  )

  // Validate Step 1 - all required fields must be filled
  const validateStep1 = useCallback((formData: ServiceLineFormType) => {
    return Boolean(
      formData.name &&
        formData.serviceType &&
        formData.price &&
        formData.currency
    )
  }, [])

  // Validate that at least one system is selected in step 3
  const validateSelectedSystems = useCallback(() => {
    const { instances } = useTableStateStore.getState()
    const rowSelection =
      instances[TABLE_IDS.SERVICE_LINE_ITEMS_SELECT]?.rowSelection || {}
    return Object.keys(rowSelection).length > 0
  }, [])

  return (
    <FormWizard<ServiceLineFormType> onSubmit={handleSubmit}>
      <WizardStep
        id="basicInfo"
        title={fm({ id: messages.steps.step1.title })}
        validate={validateStep1}
        onStepComplete={handleStep1Complete}
      >
        <ServiceLineStep1BasicInfo onServiceTypeChange={onServiceTypeChange} />
      </WizardStep>

      <WizardStep
        id="serviceLineDetails"
        title={fm({ id: messages.steps.step2.title })}
        shouldShow={shouldShowDetails}
      >
        <ServiceLineStep2Details serviceType={serviceTypeData} />
      </WizardStep>

      <WizardStep
        id="items"
        title={fm({ id: messages.steps.step3.title })}
        validate={validateSelectedSystems}
      >
        <ServiceLineStep3Items />
      </WizardStep>
    </FormWizard>
  )
}
