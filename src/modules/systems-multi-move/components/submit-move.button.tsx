import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { message } from '@/i18n/src/messages'
import { useRowSelection } from '@/modules/shared/table/pandaTable/hooks/useRowSelection'

import { useMoveSubmit } from '../hooks/useMoveSubmit'
import { useSystemsMoveStore } from '../store/useSystemsMoveStore'

export const SubmitMoveButton = () => {
    const { formatMessage: fm } = useIntl()
    const {
        movingSystems,
        destinationSystem,
        reset,
        destinationSystemsTableId,
        movingSystemsTableId,
    } = useSystemsMoveStore()

    const [, setSelectedDestinationRows] = useRowSelection(destinationSystemsTableId)
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
        resetSelection,
    })

    const submit = () => {
        mutate({
            systemsToMoveUids: movingSystems.map(system => system.uid),
            targetParentSystemUid: destinationSystem?.uid as string,
        })
    }
    if (movingSystems.length === 0 || !destinationSystem) {
        return (
            <Tooltip content="Please select the systems you want to move before proceeding.">
                <div>
                    <Button loading={false} disabled>
                        {fm({ id: message.common.systemsMultiMove.moveSystemsHere })}
                    </Button>
                </div>
            </Tooltip>
        )
    }
    return (
        <Button loading={false} onClick={submit}>
            {fm({ id: message.common.systemsMultiMove.moveSystemsHere })}
        </Button>
    )
}
