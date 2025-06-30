import Link from 'next/link'
import { type FC } from 'react'

import { Button } from '@/components/Buttons'
import { Disclosure } from '@/components/ui'
import { getColorBySystemLevel } from '@/modules/systemItem/utils'
import type { SystemLevel } from '@/types/gql/graphql'

import { SystemDetailParameter } from '../system-detail-parameter.comp'

interface SystemInformationSectionProps {
  systemDetail: any
}

export const SystemInformationSection: FC<SystemInformationSectionProps> = ({
  systemDetail
}) => {
  if (!systemDetail) return null

  return (
    <Disclosure
      title="System Information"
      defaultOpen={true}
      className={`w-full border rounded-md ${getColorBySystemLevel(systemDetail.systemLevel as SystemLevel)}`}
      buttonClassName="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      <div className="grid grid-cols-1 gap-2 text-sm">
        <SystemDetailParameter title="System Name" value={systemDetail.name} />
        <SystemDetailParameter
          title="System Code"
          value={systemDetail.systemCode}
        />
        <SystemDetailParameter
          title="System Level"
          value={systemDetail.systemLevel}
        />
        <SystemDetailParameter
          title="Location"
          value={systemDetail.location?.name}
        />
        <SystemDetailParameter title="Zone" value={systemDetail.zone?.name} />
        <SystemDetailParameter
          title="System Type"
          value={systemDetail.systemType?.name}
        />
        <SystemDetailParameter
          title="Responsible Person"
          value={systemDetail.responsible?.fullName}
        />
        <SystemDetailParameter
          title="Responsible Team"
          value={systemDetail.responsibleTeam?.name}
        />
        {systemDetail.description && (
          <div className="pt-2">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Description:
            </p>
            <p className="text-xs text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded">
              {systemDetail.description}
            </p>
          </div>
        )}
      </div>

      <div className="pt-2">
        <Link href={`/system/${systemDetail.uid}`} target="_blank">
          <Button className="w-full justify-center text-sm py-2" primary>
            Open System Detail
          </Button>
        </Link>
      </div>
    </Disclosure>
  )
}
