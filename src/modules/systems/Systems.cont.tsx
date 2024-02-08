import type { FC } from 'react'

import { FilterBadges } from '../shared/form/FilterBadges'
import { SystemsComponent } from './Systems.comp'

export const SystemsContainer: FC = () => (
  <SystemsComponent
    enableQueryURL={true}
    enableDragAndDrop={false}
    tableId={'systems'}
    hideButtons={false}
    RightSearchBarElement={() => <FilterBadges tableId={'systems'} />}
  />
)
