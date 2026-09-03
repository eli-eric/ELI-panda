import { useCallback, useState } from 'react'

import type { SystemCodesFormValues } from './components/create/SystemCodesForm.schema'
import { useCreateSystemCodes } from './hooks/useCreateSystemCodes'
import { useSystemCodesErrorMessage } from './hooks/useSystemCodesErrorMessage'
import type { PreviewParams } from './hooks/useSystemCodesPreview'
import { useSystemCodesPreview } from './hooks/useSystemCodesPreview'
import { SystemCodesCreateComponent } from './SystemCodesCreate.comp'
import type { SystemCodeResult } from './types'
import { BATCH_LIMIT } from './types/constants'
import { getSystemCodesErrorKind } from './utils/systemCodesErrors'

const SystemCodesCreateContainer = () => {
    const [previewParams, setPreviewParams] = useState<PreviewParams | null>(null)
    const [createdData, setCreatedData] = useState<SystemCodeResult[]>([])

    const {
        data: previewData,
        isFetching: isPreviewLoading,
        error: previewError,
    } = useSystemCodesPreview(previewParams)

    const { create, isPending } = useCreateSystemCodes()
    const getErrorMessage = useSystemCodesErrorMessage()

    // The kind travels alongside the message so the view can offer a fix for the one
    // error the user can actually resolve, without hardcoding string matching in the UI.
    const previewErrorMessage = previewError ? getErrorMessage(previewError) : undefined
    const previewErrorKind = previewError ? getSystemCodesErrorKind(previewError) : null

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

            try {
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
            } catch {
                // useCreateSystemCodes already surfaced the reason via toast; swallowing
                // here keeps the rejection from escaping react-hook-form unhandled.
                return false
            }
        },
        [create],
    )

    return (
        <SystemCodesCreateComponent
            previewData={previewData ?? []}
            createdData={createdData}
            isPreviewLoading={isPreviewLoading}
            isPending={isPending}
            previewErrorMessage={previewErrorMessage}
            previewErrorKind={previewErrorKind}
            onPreview={handlePreview}
            onSubmit={handleSubmit}
        />
    )
}

export default SystemCodesCreateContainer
