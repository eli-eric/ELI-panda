import type { FC } from 'react'

import FileManager from '@/modules/shared/fileManager/FileManager'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'

interface Props {
    itemUid: string
    canEdit: boolean
}

export const CatalogueItemAttachmentsTab: FC<Props> = ({ itemUid, canEdit }) => (
    <div className="p-4">
        <FileManager
            itemType={FILE_TYPE.CATALOGUE}
            uid={itemUid}
            hasEditRole={canEdit}
            allowMultiple
        />
    </div>
)
