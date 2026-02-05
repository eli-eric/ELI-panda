import { Suspense } from 'react'

import type { SystemDetail } from '@/types/responses/systems'

import { SystemMovingEditForm } from './system-moving-edit.form'

interface SystemsMovingType extends SystemDetail {
    tableId: string
}

interface SystemMovingEditContainerProps {
    childSystem: SystemsMovingType
    parentSystem: SystemsMovingType
    onClose?: () => void
}

export const SystemMovingEditContainer = ({
    childSystem,
    parentSystem,
    onClose,
}: SystemMovingEditContainerProps) => {
    if (!childSystem || !parentSystem) {
        return <div>Missing required data</div>
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SystemMovingEditForm
                childSystem={childSystem}
                parentSystem={parentSystem}
                onClose={onClose}
            />
        </Suspense>
    )
}
