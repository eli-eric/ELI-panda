import type { FC } from 'react'

import { FilterBadges } from '../shared/form/FilterBadges'
import { DeviceInfoOverlay } from '../shared/system/device-info-overlay/device-info'
import { SystemsComponent } from './Systems.comp'
import { SYSTEMS_TABLE_ID } from './types/constants'

const SystemsContainer: FC = () => (
    <>
        <SystemsComponent
            enableQueryURL={true}
            enableDragAndDrop={false}
            tableId={SYSTEMS_TABLE_ID}
            hideButtons={false}
            isGlobalSearch={true}
            SecondRowElement={() => <FilterBadges tableId={SYSTEMS_TABLE_ID} />}
        />
        <DeviceInfoOverlay />
    </>
)

export default SystemsContainer
