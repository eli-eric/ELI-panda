import type { FC } from 'react'

import { SystemFiltersBadges } from './components/filters/SystemFilterBadges'
import { SystemsComponent } from './Systems.comp'

export const SystemsContainer: FC = () => (
  <SystemsComponent
    enableQueryURL={true}
    enableDragAndDrop={false}
    tableId={'systems'}
    hideButtons={false}
    RightSearchBarElement={SystemFiltersBadges}
  />
)
