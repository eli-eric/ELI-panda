import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { useServiceType } from '@/modules/services/hooks/useServiceType'
import type { CodebookType } from '@/types/responses/codebook'

import { ServiceLineGroups } from './service-line.groups'

interface Props {
  serviceType?: CodebookType
}

export const ServiceLineDetails = ({ serviceType }: Props) => {
  const { watch } = useFormContext()

  const serviceTypeForm = watch('serviceType')

  const { data, error } = useServiceType(
    serviceType ? serviceType.uid : serviceTypeForm?.uid
  )
  const { formatMessage: fm } = useIntl()

  if (error)
    return (
      <div className="text-red-300">
        {fm({ id: 'ordersPage.serviceLines.selectable.error' })}
      </div>
    )

  return (
    <div className="min-h-[320px]">
      <ServiceLineGroups
        category={data?.category}
        allowedDetails={data?.properties}
      />
    </div>
  )
}
