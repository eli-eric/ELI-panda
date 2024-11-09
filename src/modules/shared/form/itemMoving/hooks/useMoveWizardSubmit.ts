import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { PATH } from '@/types/constants/paths'
import { queryMutate } from '@/utils/fetcher'

import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../store/useModalWizardStore'
import type { ItemMovePost, SystemFileCopy } from '../types'
import { MOVE_TYPE } from '../types/constants'

export const useMoveWizardSubmit = () => {
  const {
    isMovingToNewSystem,
    setOpen,
    setSelectedSystem,
    moveType,
    oldItemParentSystem
  } = useModalWizardStore()

  const { physicalItem, catalogueItem, systemDetail } = useSystemDetail()
  const { formData, goBack, resetWizard, updateFormData } = useWizardStore()
  const router = useRouter()
  const { invalidate } = useSystems('destination-systems')

  const onSuccessfulMove = (uid: string) => {
    toast.success('Item moved successfully')
    setOpen(false)
    resetWizard()
    setSelectedSystem(null)
    invalidate()
    router.push(PATH.SYSTEM + '/' + uid)
  }

  const { mutate: mutateFiles, isPending: isPendingFiles } = useMutation({
    mutationKey: ['moveFiles'],
    mutationFn: queryMutate<string, SystemFileCopy>(
      'systemFilesCopy',
      'post',
      undefined,
      true
    ),
    onError: (e: AxiosError) => {
      toast.error(`Error: ${e.response?.data}`)
    },
    onSuccess: (_, data) => {
      onSuccessfulMove(data.destinationUid)
    }
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['moveItem'],
    mutationFn: queryMutate<string, ItemMovePost>('physicalItemMove', 'post'),
    onError: (e: AxiosError) => {
      toast.error(`Error: ${e.response?.data}`)
    },
    onSuccess: r => {
      if (isMovingToNewSystem) {
        mutateFiles({
          sourceUid: systemDetail?.uid || '',
          destinationUid: r.data
        })
      } else {
        onSuccessfulMove(r.data)
      }
    }
  })

  const { mutate: mutateReplace, isPending: isPendingReplace } = useMutation({
    mutationKey: ['moveItem'],
    mutationFn: queryMutate<string, ItemMovePost>(
      'physicalItemReplace',
      'post'
    ),
    onError: (e: AxiosError) => {
      toast.error(`Error: ${e.response?.data}`)
    },
    onSuccess: r => {
      if (isMovingToNewSystem) {
        mutateFiles({
          sourceUid: systemDetail?.uid || '',
          destinationUid: r.data
        })
      } else {
        onSuccessfulMove(r.data)
      }
    }
  })

  const submitWizard = () => {
    if (moveType === MOVE_TYPE.EXCHANGE) {
      return mutateReplace({
        condition: formData.conditionStatus,
        deleteSourceSystem: formData.deleteSourceSystem || false,
        destinationSystemUid: formData.system.uid,
        sourceSystemUid: systemDetail?.uid || '',
        parentSystemUid: oldItemParentSystem?.uid || '',
        systemName: formData.name,
        location: formData.location,
        itemUsage: formData.itemUsage
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
        itemUsage: formData.itemUsage
      })
    }
  }

  return {
    submitWizard,
    isPending: isPending || isPendingFiles || isPendingReplace,
    goBack,
    physicalItem,
    catalogueItem,
    formData,
    updateFormData,
    isMovingToNewSystem,
    oldItemParentSystem
  }
}
