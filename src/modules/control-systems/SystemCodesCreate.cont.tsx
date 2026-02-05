import { useCallback, useState } from 'react'

import type { SystemCodesFormValues } from './components/create/SystemCodesForm.schema'
import { useCreateSystemCodes } from './hooks/useCreateSystemCodes'
import type { PreviewParams } from './hooks/useSystemCodesPreview'
import { useSystemCodesPreview } from './hooks/useSystemCodesPreview'
import { SystemCodesCreateComponent } from './SystemCodesCreate.comp'
import type { SystemCodeResult } from './types'
import { BATCH_LIMIT } from './types/constants'

const SystemCodesCreateContainer = () => {
    const [previewParams, setPreviewParams] = useState<PreviewParams | null>(null)
    const [createdData, setCreatedData] = useState<SystemCodeResult[]>([])

    const { data: previewData, isFetching: isPreviewLoading } = useSystemCodesPreview(previewParams)

    const { create, isPending } = useCreateSystemCodes()

    const handlePreview = useCallback((values: SystemCodesFormValues) => {
        if (values.zone && values.systemType) {
            setPreviewParams({
                zoneUid: values.zone.uid,
                systemTypeUid: values.systemType.uid,
                batch: values.batch,
            })
        }
    }, [])

    const handleSubmit = useCallback(
        async (values: SystemCodesFormValues) => {
            if (!values.zone || !values.systemType) return false

            const response = await create({
                zone: values.zone,
                systemType: values.systemType,
                batch: values.batch > BATCH_LIMIT ? BATCH_LIMIT : values.batch,
            })

            if (response?.data) {
                // Add created items to the created data list
                setCreatedData(prev => [...prev, ...response.data])
                // Clear preview params to remove preview rows
                setPreviewParams(null)
                return true
            }
            return false
        },
        [create],
    )

    return (
        <SystemCodesCreateComponent
            previewData={previewData ?? []}
            createdData={createdData}
            isPreviewLoading={isPreviewLoading}
            isPending={isPending}
            onPreview={handlePreview}
            onSubmit={handleSubmit}
        />
    )
}

export default SystemCodesCreateContainer
