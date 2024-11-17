import { Button } from '@/components/Buttons'
import { useRowSelection } from '@/modules/shared/table/pandaTable/hooks/useRowSelection'

import { useMoveSubmit } from '../hooks/useMoveSubmit'
import { useSystemsMoveStore } from '../store/useSystemsMoveStore'

export const SubmitMoveButton = () => {
  const {
    movingSystems,
    destinationSystem,
    reset,
    destinationSystemsTableId,
    movingSystemsTableId
  } = useSystemsMoveStore()

  const [, setSelectedDestinationRows] = useRowSelection(
    destinationSystemsTableId
  )
  const [, setMovingSystemsRows] = useRowSelection(movingSystemsTableId)

  const resetSelection = () => {
    // reset selected rows
    setSelectedDestinationRows({})
    setMovingSystemsRows({})
    reset()
  }

  const { mutate } = useMoveSubmit({
    destinationSystemUid: destinationSystem?.uid as string,
    movingSystems: movingSystems,
    resetSelection
  })

  const submit = () => {
    mutate({
      systemsToMoveUids: movingSystems.map(system => system.uid),
      targetParentSystemUid: destinationSystem?.uid as string
    })
  }
  return (
    <Button primary loading={false} onClick={submit}>
      Move Systems here
    </Button>
  )
}
