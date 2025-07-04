import type { FC } from 'react'

import ProgressBarComponent from '@/components/progress-bar.comp'
import { useSystemList } from '@/hooks/graphql/useSystemList'
import { useEmployeeList } from '@/hooks/useEmployeeList'

import { SystemLink } from './SystemLink.comp'

type LocationInfoProps = {
  locationCode?: string
}
export const LocationInfo: FC<LocationInfoProps> = ({ locationCode }) => {
  const employeeQuery = useEmployeeList(locationCode)
  const systems = useSystemList(locationCode)

  if (employeeQuery.isLoading || systems.isLoading) {
    return <ProgressBarComponent />
  }

  return (
    <div>
      {employeeQuery.data?.employees.map(employee => (
        <div key={employee.fullName}>
          <div className="flex justify-between">
            <h3 className="font-bold">
              {employee.fullName + ` (${employee.jobPosition})`}
            </h3>
          </div>
          <div className="flex justify-between">
            <p>{employee.email}</p>
            <p>{employee.phone1}</p>
          </div>
        </div>
      ))}

      {systems.data?.systems && systems.data?.systems?.length > 0 && (
        <div>
          <h1 className="mt-4 mb-4 border-b text-base font-semibold leading-6 text-gray-900 dark:text-gray-200">
            Related Systems:
          </h1>
          {systems.data?.systems.map(system => (
            <SystemLink
              href={`/system/${system.uid}`}
              key={system.uid}
              variant="button"
              className="flex justify-between w-full px-3 py-2"
            >
              <span>{system.name}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {system.systemCode}
              </span>
            </SystemLink>
          ))}
        </div>
      )}
    </div>
  )
}
