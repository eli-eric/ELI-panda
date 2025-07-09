import { type FC } from 'react'

import { Disclosure } from '@/components/ui'
import { getColorBySystemLevel } from '@/modules/systemItem/utils'
import { PATH } from '@/types/constants/paths'
import type { SystemLevel } from '@/types/gql/graphql'
import { cx } from '@/utils'

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
      className={`w-full border rounded-md overflow-hidden shadow-md`}
      buttonClassName={cx(
        `hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors text-gray-900 dark:text-gray-100`,
        getColorBySystemLevel(systemDetail.systemLevel as SystemLevel)
      )}
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      <div className="grid grid-cols-1 gap-2 text-sm">
        <SystemDetailParameter
          title="System Code"
          value={systemDetail.systemCode}
          className="font-bold"
        />
        <SystemDetailParameter
          title="System Name"
          value={systemDetail.name}
          href={`${PATH.SYSTEM}/${systemDetail.uid}`}
        />
        <SystemDetailParameter
          title="Location"
          value={systemDetail.location?.name}
        />
        <SystemDetailParameter
          title="System Type"
          value={systemDetail.systemType?.name}
        />
        <SystemDetailParameter title="Zone" value={systemDetail.zone?.name} />
      </div>
    </Disclosure>
  )
}
