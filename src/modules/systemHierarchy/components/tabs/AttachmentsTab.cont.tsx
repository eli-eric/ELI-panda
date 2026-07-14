import type { FC } from 'react'

import FileManager from '@/modules/shared/fileManager/FileManager'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { useSystemEditPermission } from '@/modules/shared/system/edit-permission'

import type { SystemLeaf } from '../../types'

interface AttachmentsTabProps {
    system: SystemLeaf
}

export const AttachmentsTabContainer: FC<AttachmentsTabProps> = ({ system }) => {
    const { canEdit } = useSystemEditPermission(system.uid)

    return (
        <div className="p-4" data-testid={`attachments-${system.uid}`}>
            <FileManager itemType={FILE_TYPE.SYSTEM} uid={system.uid} hasEditRole={canEdit} />
        </div>
    )
}
