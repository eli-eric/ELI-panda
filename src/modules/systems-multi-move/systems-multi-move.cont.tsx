import { useCallback } from 'react'

import type { SystemDetail } from '@/types/responses/systems'
import { cx } from '@/utils'

import { MovingSystemsTable } from './components/moving-systems.table'
import { useSystemsMoveStore } from './store/useSystemsMoveStore'

export const SystemsMultiMoveContainer = () => {
  const {
    movingSystems,
    destinationSystem,
    destinationSystemsTableId,
    movingSystemsTableId
  } = useSystemsMoveStore()

  const canSelectMovingSystem = useCallback(
    (system: SystemDetail) => {
      const isSelectedSameDestination = destinationSystem?.uid === system.uid

      const isSelectedParent = system.parentPath?.some(path =>
        movingSystems.some(moving => moving.uid === path.uid)
      )

      if (isSelectedSameDestination || isSelectedParent) {
        return false
      }
      return true
    },
    [movingSystems, destinationSystem]
  )

  const canSelectDestinationSystem = useCallback(
    (system: SystemDetail) => {
      const isSelectedSameMoving = movingSystems.some(
        movingSystem => movingSystem.uid === system.uid
      )

      const isSelectedParent = system.parentPath?.some(path =>
        movingSystems.some(moving => moving.uid === path.uid)
      )

      if (isSelectedSameMoving) return false
      if (isSelectedParent) return false
      if (movingSystems.length === 0) return false

      return destinationSystem ? destinationSystem?.uid === system.uid : true
    },
    [movingSystems, destinationSystem]
  )

  return (
    <div className={cx('grid grid-cols-2')}>
      <MovingSystemsTable
        tableId={movingSystemsTableId}
        canSelectRow={canSelectMovingSystem}
        tableHeading="Systems to Move"
      />
      <MovingSystemsTable
        tableId={destinationSystemsTableId}
        canSelectRow={canSelectDestinationSystem}
        tableHeading="Target parent system"
      />
    </div>
  )
}
