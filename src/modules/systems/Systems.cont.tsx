import type { FC } from 'react'

import { FilterBadges } from '../shared/form/FilterBadges'
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
    </>
)

export default SystemsContainer
