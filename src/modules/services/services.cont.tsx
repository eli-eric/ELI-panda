import { Plus } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { PageLayout } from './components/layout/ServiceLayout'
import { ServiceList } from './components/serviceTypes/ServiceList'
import { useServiceTypeList } from './hooks/useServiceTypeList'

export const ServicesContainer: FC = () => {
  const { formatMessage: fm } = useIntl()
  const { data, isLoading } = useServiceTypeList()

  const disabled = !usePermission([ROLE.SERVICE_EDIT])
  const actionButton = (
    <Link href={PATH.SERVICE}>
      <Button>
        <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        {fm({ id: message.servicesPage.addNewService })}
      </Button>
    </Link>
  )

  return (
    <PageLayout
      title={fm({ id: message.servicesPage.title })}
      actionButton={disabled ? null : actionButton}
      isPending={isLoading}
    >
      {data && <ServiceList services={data} />}
    </PageLayout>
  )
}
