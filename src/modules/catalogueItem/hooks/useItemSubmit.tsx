import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import type { MutableRefObject } from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { PATH } from '@/types/constants/paths'
import { navigateBack } from '@/utils'
import { queryMutate } from '@/utils/fetcher'

import type { CatalogueItem } from '../types/responses'
import { useCatalogueItem } from './useItem'

export const useItemSubmit = ({
  setvalue,
  imageRef,
  saveAndExit,
  reset
}: {
  setvalue: UseFormSetValue<any>
  imageRef?: MutableRefObject<ImageGalleryRef | undefined>
  saveAndExit?: boolean
  reset?: (data?: any) => void
}) => {
  const { query, replace } = useRouter()
  const uid = query.uid as string | undefined

  const { queryKey } = useCatalogueItem()

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['catalogueItemCreateUpdate', { uid }],
    mutationFn: queryMutate<CatalogueItem, CatalogueItem>(
      'catalogueItem',
      uid ? 'put' : 'post',
      uid
    ),
    onSuccess: catalogueItem => {
      if (uid) {
        queryClient.setQueryData(queryKey, catalogueItem.data)
      }
      queryClient.invalidateQueries({ queryKey: ['catalogueItems'] })

      setvalue('lastUpdateTime', catalogueItem.data?.lastUpdateTime)
      
      // Reset form with new data from API response to prevent reverting to old defaultValues
      if (reset && catalogueItem.data) {
        reset(catalogueItem.data)
      }

      imageRef?.current?.submit(catalogueItem.data?.uid, () => {
        if (saveAndExit) {
          navigateBack()
        } else {
          if (!uid) {
            replace(PATH.CATALOGUE_ITEM + '/' + catalogueItem.data?.uid)
          }
        }
        toast.success('Item saved')
      })
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        toast.error('Item with was edited by another user')
      } else {
        toast.error('Failed to save item: ' + error.message)
      }
    }
  })

  return { submit: mutate, loading: isPending }
}
