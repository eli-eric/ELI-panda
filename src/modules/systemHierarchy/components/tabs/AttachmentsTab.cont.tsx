import type { FC } from 'react'

import { usePermission } from '@/hooks/usePermission'
import FileManager from '@/modules/shared/fileManager/FileManager'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import type { SystemDetail } from '@/modules/shared/system/system-detail'
import { ROLE } from '@/types/constants/roles'

interface AttachmentsTabProps {
    system: Pick<SystemDetail, 'uid'>
}

export const AttachmentsTabContainer: FC<AttachmentsTabProps> = ({ system }) => {
    // files are role-gated only (responsibility is a soft lock for audited fields)
    const canEdit = !!usePermission([ROLE.SYSTEM_EDIT])

    return (
        <div className="p-4" data-testid={`attachments-${system.uid}`}>
            <FileManager itemType={FILE_TYPE.SYSTEM} uid={system.uid} hasEditRole={canEdit} />
        </div>
    )
}
