import type { FC } from 'react'

import { ControlSystemsOverviewComponent } from './ControlSystemsOverview.comp'
import { CONTROL_SYSTEMS_TABLE_ID } from './hooks/useSystemCodes'

const ControlSystemsOverviewContainer: FC = () => (
    <ControlSystemsOverviewComponent enableQueryURL={true} tableId={CONTROL_SYSTEMS_TABLE_ID} />
)

export default ControlSystemsOverviewContainer
