import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'sonner'

import { getSystemHierarchyDetailPath } from '@/modules/systemHierarchy/utils/hierarchyLinks'
import { useSystemsReload } from '@/modules/systemItem/hooks/useSystemsReload'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { AxiosError } from '@/types/http'
import type { CodebookType } from '@/types/responses/codebook'
import { queryMutate } from '@/utils/fetcher'

import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../store/useModalWizardStore'
import type { ItemMovePost } from '../types'
import { MOVE_TYPE } from '../types/constants'
import { useWizardContextSystem } from './useWizardContextSystem'

export const useMoveWizardSubmit = () => {
    const {
        isMovingToNewSystem,
        setSelectedSystem,
        moveType,
        oldItemParentSystem,
        selectedSystem,
    } = useModalWizardStore()

    const { closeModal } = useDynamicModalStore()
    const { physicalItem, catalogueItem, systemDetail } = useWizardContextSystem()
    const { formData, goBack, resetWizard, updateFormData } = useWizardStore()
    const router = useRouter()

    const [redirectUid, setRedirectUid] = useState<string | null>(null)

    const onSuccessRedirect = () => {
        toast.success('Item moved successfully')
        // Ids must match the openModal configs in item-move.modal.tsx / item-assign.modal.tsx
        closeModal(moveType === MOVE_TYPE.ASSIGN ? 'item-assign' : 'item-move')
        resetWizard()
        setSelectedSystem(null)
        if (moveType === MOVE_TYPE.ASSIGN) {
            router.reload()
        } else if (redirectUid) {
            router.push(getSystemHierarchyDetailPath(redirectUid))
        }
    }

    const [systemsReload, isLoadingSystems] = useSystemsReload({
        tableId: 'systems',
        enableQueryURL: false,
        onSuccess: () => {
            onSuccessRedirect()
        },
    })
    const [destinationSystemsReload, isLoadingDestination] = useSystemsReload({
        tableId: 'destination-systems',
        enableQueryURL: false,
        onSuccess: () => {
            systemsReload()
        },
    })
    const [assignSystemsReload, isLoadingAssign] = useSystemsReload({
        tableId: 'assign-item-systems',
        enableQueryURL: false,
        onSuccess: () => {
            destinationSystemsReload()
        },
    })

    const onSuccessfulMove = (uid: string) => {
        setRedirectUid(uid)
        assignSystemsReload()
    }

    // const { mutate: mutateFiles, isPending: isPendingFiles } = useMutation({
    //   mutationKey: ['moveFiles'],
    //   mutationFn: queryMutate<string, SystemFileCopy>(
    //     'systemFilesCopy',
    //     'post',
    //     undefined,
    //     true
    //   ),
    //   onError: (e: AxiosError) => {
    //     toast.error(`Error: ${e.response?.data}`)
    //   },
    //   onSuccess: (_, data) => {
    //     onSuccessfulMove(data.destinationUid)
    //   }
    // })

    const { mutate, isPending } = useMutation({
        mutationKey: ['moveItem'],
        mutationFn: queryMutate<string, ItemMovePost>('physicalItemMove', 'post', {
            responseType: 'text',
        }),
        onError: (e: AxiosError) => {
            toast.error(`Error: ${e.response?.data}`)
        },
        onSuccess: r => {
            // if (isMovingToNewSystem) {
            //   mutateFiles({
            //     sourceUid: systemDetail?.uid || '',
            //     destinationUid: r.data
            //   })
            // } else {
            onSuccessfulMove(r.data)
            // }
        },
    })

    const { mutate: mutateReplace, isPending: isPendingReplace } = useMutation({
        mutationKey: ['moveItem'],
        mutationFn: queryMutate<string, ItemMovePost>('physicalItemReplace', 'post', {
            responseType: 'text',
        }),
        onError: (e: AxiosError) => {
            toast.error(`Error: ${e.response?.data}`)
        },
        onSuccess: r => {
            // if (isMovingToNewSystem) {
            //   mutateFiles({
            //     sourceUid: systemDetail?.uid || '',
            //     destinationUid: r.data
            //   })
            // } else {
            onSuccessfulMove(r.data)
            // }
        },
    })

    const submitWizard = () => {
        if (!systemDetail?.uid) {
            toast.error('System detail is not loaded yet, please try again')
            return
        }
        if (moveType === MOVE_TYPE.EXCHANGE) {
            return mutateReplace({
                condition: formData.conditionStatus,
                deleteSourceSystem: formData.deleteSourceSystem || false,
                destinationSystemUid: formData.system.uid,
                sourceSystemUid: systemDetail?.uid || '',
                parentSystemUid: oldItemParentSystem?.uid || '',
                systemName: formData.name,
                location: formData.location,
                itemUsage: formData.itemUsage,
            })
        } else if (moveType === MOVE_TYPE.ASSIGN) {
            return mutate({
                condition: selectedSystem?.physicalItem?.conditionStatus || null,
                deleteSourceSystem: formData.deleteSourceSystem || false,
                destinationSystemUid: systemDetail?.uid || '',
                sourceSystemUid: selectedSystem?.uid || '',
                parentSystemUid: null,
                systemName: systemDetail?.name || '',
                location: (systemDetail?.location as CodebookType) || null,
                itemUsage: selectedSystem?.physicalItem?.itemUsage || null,
            })
        } else {
            mutate({
                condition: formData.conditionStatus,
                deleteSourceSystem: formData.deleteSourceSystem || false,
                destinationSystemUid: isMovingToNewSystem ? null : formData.system.uid,
                sourceSystemUid: systemDetail?.uid || '',
                parentSystemUid: isMovingToNewSystem ? formData.system.uid : null,
                systemName: formData.name,
                location: formData.location,
                itemUsage: formData.itemUsage,
            })
        }
    }

    return {
        submitWizard,
        isPending:
            isPending ||
            // isPendingFiles ||
            isPendingReplace ||
            isLoadingSystems ||
            isLoadingDestination ||
            isLoadingAssign,
        goBack,
        physicalItem,
        catalogueItem,
        formData,
        updateFormData,
        isMovingToNewSystem,
        oldItemParentSystem,
        selectedSystem,
    }
}
