import type { SystemDetail } from '@/types/responses/systems'
import { classNames } from '@/utils'

import { MovingSystemsTable } from './components/moving-systems.table'
import { useSystemsMoveStore } from './store/useSystemsMoveStore'

export const SystemsMultiMoveContainer = () => {
  const {
    movingSystems,
    destinationSystem,
    destinationSystemsTableId,
    movingSystemsTableId
  } = useSystemsMoveStore()

  const canSelectMovingSystem = (system: SystemDetail) => {
    const isSelectedSameDestination = destinationSystem?.uid === system.uid

    const isSelectedParent = system.parentPath?.some(
      path => destinationSystem?.uid === path.uid
    )

    if (isSelectedSameDestination) {
      return false
    }
    if (isSelectedParent) {
      return false
    }
    return true
  }

  const canSelectDestinationSystem = (system: SystemDetail) => {
    const isSelectedSameMoving = movingSystems.some(
      movingSystem => movingSystem.uid === system.uid
    )
    if (movingSystems.length === 0) {
      return false
    }
    if (isSelectedSameMoving) {
      return false
    }

    return destinationSystem ? destinationSystem?.uid === system.uid : true
  }

  return (
    <div className={classNames('grid grid-cols-2')}>
      <MovingSystemsTable
        tableId={movingSystemsTableId}
        canSelectRow={canSelectMovingSystem}
        tableHeading="Systems to Move"
      />
      <MovingSystemsTable
        tableId={destinationSystemsTableId}
        canSelectRow={canSelectDestinationSystem}
        tableHeading="Destination System"
      />
    </div>
  )
}
