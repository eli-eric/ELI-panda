import { PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { Button } from '@/components/Buttons'
import { PATH } from '@/types/constants/paths'

import type { ServiceTypeResponse } from '../../types/responses'
import { DeleteServiceButton } from './DeleteService.btn'

interface ServiceItemProps {
  service: ServiceTypeResponse
}

export function ServiceItem({ service }: ServiceItemProps) {
  return (
    <li>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <p className="text-sm font-medium text-primary-600 truncate">
                {service.name}
              </p>
              <p className="ml-2 flex-shrink-0 font-normal text-sm text-gray-500">
                in {service.category.name}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href={PATH.SERVICE + '/' + service.uid}>
              <Button primary className="rounded-full">
                <PencilIcon className="h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>
            <DeleteServiceButton uid={service.uid} name={service.name} />
          </div>
        </div>
      </div>
    </li>
  )
}
