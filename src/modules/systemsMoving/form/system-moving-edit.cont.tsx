import { Suspense } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
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
    const { formatMessage: fm } = useIntl()

    if (!childSystem || !parentSystem) {
        return <div>{fm({ id: message.common.ui.missingRequiredData })}</div>
    }

    return (
        <Suspense fallback={<div>{fm({ id: message.common.ui.loading })}</div>}>
            <SystemMovingEditForm
                childSystem={childSystem}
                parentSystem={parentSystem}
                onClose={onClose}
            />
        </Suspense>
    )
}
