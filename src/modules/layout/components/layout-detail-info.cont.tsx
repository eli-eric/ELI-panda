import type { FC } from 'react'

import { LocationInfo } from './location-info.comp'
import { SystemDetailInfo } from './system-detail-info.comp'

type Props = {
  systemCode?: string
  locationCode?: string
  uid?: string
}

const LayoutDetailInfoContainer: FC<Props> = ({
  systemCode,
  locationCode,
  uid
}) => {
  if (systemCode || uid) {
    return <SystemDetailInfo alias={systemCode} uid={uid} />
  }
  if (locationCode) {
    return <LocationInfo locationCode={locationCode} />
  }
  return null
}

export default LayoutDetailInfoContainer
