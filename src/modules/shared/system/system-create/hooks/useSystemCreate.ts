import { type MutableRefObject, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
// deep imports: the system-detail barrel pulls in sections that import back into this module
import { useCreateSystem } from '@/modules/shared/system/system-detail/hooks/mutations/useCreateSystem'
import type { CreateSystemBody, SystemDetail } from '@/modules/shared/system/system-detail/types'
import { isDuplicateSystemCodeConflict } from '@/modules/shared/system/system-detail/utils/systemErrors'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import type { SystemCreateFormData } from '../schema'
import { useSystemCreateParentStore } from '../store/useSystemCreateParentStore'

// NOTE: the sheet is opened with this id in useSystemCreateSheet.ts
const CREATE_SHEET_ID = 'system-create'

const toRef = (value?: { uid: string } | null) => (value?.uid ? { uid: value.uid } : null)

const emptyToNull = (value?: string | null) => (value?.trim() ? value.trim() : null)

/** Maps the create form onto the POST /systems body (PATCH field shapes). */
export const buildCreateSystemBody = (
    form: SystemCreateFormData,
    parentUid?: string | null,
): CreateSystemBody => ({
    ...(parentUid ? { parentUid } : {}),
    name: form.name.trim(),
    systemLevel: form.systemLevel,
    description: emptyToNull(form.description),
    systemCode: emptyToNull(form.systemCode),
    systemType: toRef(form.systemType),
    location: toRef(form.location),
    zone: toRef(form.zone),
    responsible: toRef(form.responsible),
    attribute: toRef(form.attribute),
})

// Uploads the gallery images under the new system uid; resolves false if the upload threw.
const uploadImages = (
    imageRef: MutableRefObject<ImageGalleryRef | undefined> | undefined,
    uid: string,
) =>
    new Promise<boolean>(resolve => {
        if (!imageRef?.current) return resolve(true)
        try {
            imageRef.current.submit(uid, () => resolve(true))
        } catch {
            resolve(false)
        }
    })

export const useSystemCreate = (imageRef?: MutableRefObject<ImageGalleryRef | undefined>) => {
    const { formatMessage: fm } = useIntl()
    const { refetch } = useSystems('systems')
    const { closeModal } = useDynamicModalStore()
    const { parentUid, clear } = useSystemCreateParentStore()
    const { confirmCreate, createSystem: create, isPending } = useCreateSystem()

    const finish = useCallback(
        async (created: SystemDetail) => {
            const imagesUploaded = await uploadImages(imageRef, created.uid)
            if (!imagesUploaded) {
                toast.warning(
                    fm(
                        { id: message.systemsPage.systemDetail.createModal.onSuccessWithImageError },
                        { name: created.name },
                    ),
                )
            }
            void refetch()
            closeModal(CREATE_SHEET_ID)
            clear()
        },
        [imageRef, fm, refetch, closeModal, clear],
    )

    const createSystem = useCallback(
        async (form: SystemCreateFormData) => {
            if (!(await confirmCreate(parentUid))) return
            const promise = create(buildCreateSystemBody(form, parentUid))
            toast.promise(promise, {
                loading: fm({ id: message.systemHierarchy.toast.saving }),
                success: created =>
                    fm(
                        { id: message.systemsPage.systemDetail.createModal.onSuccess },
                        { name: created.name },
                    ),
                error: err => {
                    if (isDuplicateSystemCodeConflict(err)) {
                        return fm(
                            { id: message.systemHierarchy.toast.duplicateCode },
                            { code: form.systemCode ?? '' },
                        )
                    }
                    return fm(
                        { id: message.systemsPage.systemDetail.createModal.onError },
                        { error: err?.message ?? '' },
                    )
                },
            })
            try {
                await finish(await promise)
            } catch {
                // surfaced by the toast above; the sheet stays open for a retry
            }
        },
        [confirmCreate, create, parentUid, fm, finish],
    )

    return { createSystem, loading: isPending }
}
