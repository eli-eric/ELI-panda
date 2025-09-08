import { Plus } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'

import { Button } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { PageLayout } from './components/layout/ServiceLayout'
import { ServiceList } from './components/serviceTypes/ServiceList'
import { useServiceTypeList } from './hooks/useServiceTypeList'

export const ServicesContainer: FC = () => {
  const { data, isLoading } = useServiceTypeList()

  const disabled = !usePermission([ROLE.SERVICE_EDIT])
  const actionButton = (
    <Link href={PATH.SERVICE}>
      <Button>
        <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Add New Service
      </Button>
    </Link>
  )

  return (
    <PageLayout
      title="Manage Services"
      actionButton={disabled ? null : actionButton}
      isPending={isLoading}
    >
      {data && <ServiceList services={data} />}
    </PageLayout>
  )
}
