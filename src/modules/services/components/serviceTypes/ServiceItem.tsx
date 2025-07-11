import Link from 'next/link'

import usePermission from '@/hooks/usePermission'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import type { ServiceTypeResponse } from '../../types/responses'
import { DeleteServiceButton } from './DeleteService.btn'

interface ServiceItemProps {
  service: ServiceTypeResponse
}

export function ServiceItem({ service }: ServiceItemProps) {
  const hasEditRole = usePermission([ROLE.SERVICE_EDIT])
  return (
    <li>
      <Link href={PATH.SERVICE + '/' + service.uid}>
        <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <p className="text-sm font-medium text-primary-600 truncate">
                  {service.name}
                </p>
                <p className="ml-2 shrink-0 font-normal text-sm text-gray-500">
                  in {service.category?.name}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{service.description}</p>
              </div>
            </div>
            {hasEditRole && (
              <div className="flex items-center space-x-2">
                <DeleteServiceButton uid={service.uid} name={service.name} />
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  )
}
