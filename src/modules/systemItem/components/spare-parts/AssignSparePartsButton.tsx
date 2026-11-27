import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { message } from '@/i18n/src/messages'
import { useAssignSparesNavigation } from '@/modules/shared/hooks/useAssignSparesNavigation'

import { useSystemDetail } from '../../hooks/useSystemDetail'

const messages = message.systemsPage.systemDetail.spareParts.buttons

/** @deprecated systemItem is deprecated (see modules/systemItem/DEPRECATED.md) and this has no live consumer — use modules/shared/system/system-detail. */
export const AssignSparePartButton = () => {
    const { systemDetail, catalogueItem } = useSystemDetail()

    const handleAssignSparePart = useAssignSparesNavigation({
        uid: systemDetail?.uid ?? '',
        parentPath:
            systemDetail?.parentPath?.map(p => ({
                uid: p?.uid ?? '',
                name: p?.name ?? '',
                systemLevel: p?.systemLevel ?? null,
            })) ?? null,
        catalogueNumber: catalogueItem?.catalogueNumber ?? null,
    })

    return (
        <Tooltip content="Redirect to assign Spare Part page">
            <div>
                <Button onClick={handleAssignSparePart}>
                    <FormattedMessage id={messages.assign} />
                </Button>
            </div>
        </Tooltip>
    )
}
