import { useQueryClient } from '@tanstack/react-query'
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
    const queryClient = useQueryClient()
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

    // `null` means the form no longer has a complete selection. Dropping the params then
    // is what disables the query, so a cleared field cannot leave its error on screen.
    const handlePreview = useCallback((values: SystemCodesFormValues | null) => {
        if (!values?.zone || !values.systemType) {
            setPreviewParams(null)
            return
        }

        setPreviewParams({
            zoneUid: values.zone.uid,
            systemTypeUid: values.systemType.uid,
            batch: values.batch,
        })
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
                    // The codes just created are taken now, so the preview that produced
                    // them describes nothing. Refetching replaces it with the next batch;
                    // clearing the params instead would leave Create enabled against
                    // codes that no longer exist, with an empty preview pane.
                    void queryClient.invalidateQueries({ queryKey: ['systemCodesPreview'] })
                    return true
                }
                return false
            } catch {
                // useCreateSystemCodes already surfaced the reason via toast; swallowing
                // here keeps the rejection from escaping react-hook-form unhandled.
                return false
            }
        },
        [create, queryClient],
    )

    return (
        <SystemCodesCreateComponent
            previewedParams={previewParams}
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
