import type { ReactNode } from 'react'

import { Tooltip } from '@/components/Tooltip'
import { formatParentPath } from '@/modules/systemItem/utils'

interface SystemPathTooltipProps {
    parentPath?:
        | Array<
              | { name?: string | null | undefined; uid?: string | null | undefined }
              | null
              | undefined
          >
        | null
        | undefined
    currentName?: string
    children: ReactNode
}

export const SystemPathTooltip = ({
    parentPath,
    currentName,
    children,
}: SystemPathTooltipProps) => {
    const content = formatParentPath(parentPath, currentName)

    return <Tooltip content={content}>{children}</Tooltip>
}
