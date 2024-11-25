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

    const isSelectedParent = system.parentPath?.some(path =>
      movingSystems.some(moving => moving.uid === path.uid)
    )

    if (isSelectedSameDestination || isSelectedParent) {
      return false
    }
    return true
  }

  const canSelectDestinationSystem = (system: SystemDetail) => {
    const isSelectedSameMoving = movingSystems.some(
      movingSystem => movingSystem.uid === system.uid
    )

    const isSelectedParent = system.parentPath?.some(path =>
      movingSystems.some(moving => moving.uid === path.uid)
    )

    if (
      movingSystems.length === 0 ||
      isSelectedSameMoving ||
      isSelectedParent
    ) {
      return false
    }

    return destinationSystem ? destinationSystem?.uid === system.uid : true
  }

  function SelectAllCheckbox({ row, tableId }) {
    const onChange = e => {}

    return (
      <input
        type="checkbox"
        className={classNames(
          'cursor-pointer',
          'focus:ring-primary-500 h-5 w-5 text-primary-600 dark:text-primary-600 rounded',
          !checked && 'dark:bg-gray-700',
          rest.disabled && 'bg-gray-300 dark:bg-gray-500'
        )}
        onChange={onChange}
        checked={checked}
        {...rest}
      />
    )
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
        tableHeading="Target parent system"
      />
    </div>
  )
}
