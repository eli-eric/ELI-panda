import { InformationCircleIcon } from '@heroicons/react/24/outline'

import { Tooltip } from '@/components/Tooltip'
import { ENV, PROCESS_ENV } from '@/types/constants/common'

export const EnvInfo = () => {
  const infoText =
    PROCESS_ENV && PROCESS_ENV === ENV.TEST
      ? 'You are in the TEST environment. This version is identical to the production version, but it uses a test database. Data are not persistent because of the override from the production database. (mostly on daily basis)'
      : PROCESS_ENV && PROCESS_ENV === ENV.DEV
        ? 'You are in the DEV environment. This version is based on the dev branch in git. It uses a dev database. Data are not persistent.'
        : undefined
  if (!infoText) return null
  return (
    <div className="flex flex-col justify-center items-center text-lg absolute left-2 top-2 font-mono">
      <span>{PROCESS_ENV?.toUpperCase()}</span>
      <Tooltip content={infoText}>
        <InformationCircleIcon className="h-8 w-8 flex-shrink-0 -mt-2" />
      </Tooltip>
    </div>
  )
}
