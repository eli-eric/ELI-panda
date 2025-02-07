import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import type { FC } from 'react'

import { Button } from '@/components/Buttons'

import { PageLayout } from './components/layout/ServiceLayout'
import { ServiceList } from './components/serviceTypes/ServiceList'
import { useServiceTypeList } from './hooks/useServiceTypeList'
import type { ServiceTypeResponse } from './types/responses'

export const ServicesContainer: FC = () => {
  const { data, isLoading } = useServiceTypeList()

  const mockData: ServiceTypeResponse[] = [
    {
      uid: '1',
      name: 'Coating',
      description: 'Coating service for Mirrors',
      category: {
        uid: '1',
        name: 'Mirror'
      }
    },
    {
      uid: '2',
      name: 'Repair',
      description: 'Repairing service for all types of items',
      category: {
        uid: '2',
        name: 'general'
      }
    },
    {
      uid: '3',
      name: 'Maintenance',
      description: 'Maintenance service for all types of items',
      category: {
        uid: '3',
        name: 'General'
      }
    }
  ]

  const actionButton = (
    <Link href="/service">
      <Button buttonSize="large" primary>
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Add New Service
      </Button>
    </Link>
  )

  return (
    <PageLayout title="Manage Services" actionButton={actionButton}>
      <ServiceList services={mockData} />
    </PageLayout>
  )
}
