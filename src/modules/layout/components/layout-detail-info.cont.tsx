import type { FC } from 'react'

import { LocationInfo } from './location-info.comp'
import { SystemDetailInfo } from './system-detail-info.comp'

type Props = {
  systemCode?: string
  locationCode?: string
}

const LayoutDetailInfoContainer: FC<Props> = ({ systemCode, locationCode }) => {
  if (systemCode) {
    return <SystemDetailInfo alias={systemCode} />
  }
  if (locationCode) {
    return <LocationInfo locationCode={locationCode} />
  }
  return null
}

export default LayoutDetailInfoContainer
