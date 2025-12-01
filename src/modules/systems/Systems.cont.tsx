import type { FC } from 'react'

import { FilterBadges } from '../shared/form/FilterBadges'
import { DeviceInfoOverlay } from '../shared/system/device-info-overlay/device-info'
import { SystemsComponent } from './Systems.comp'

const SystemsContainer: FC = () => (
  <>
    <SystemsComponent
      enableQueryURL={true}
      enableDragAndDrop={false}
      tableId={'systems'}
      hideButtons={false}
      isGlobalSearch={true}
      RightSearchBarElement={() => <FilterBadges tableId={'systems'} />}
    />
    <DeviceInfoOverlay />
  </>
)

export default SystemsContainer
