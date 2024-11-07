import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { type FC, Fragment } from 'react'
import toast from 'react-hot-toast'

import { CheckBoxComponent } from '@/components/form/CheckBox'
import Card from '@/components/layout/Card'
import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { message } from '@/i18n/src/messages'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { PATH } from '@/types/constants/paths'
import type { ModalButtons } from '@/types/form'
import { queryMutate } from '@/utils/fetcher'

import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../store/useModalWizardStore'
import type { ItemMovePost, SystemFileCopy } from '../types'
import { SummaryListParam } from './components/SymmaryListParam.comp'
const btnMessages = message.common.buttons

export const SummaryStep: FC = () => {
  const { isMovingToNewSystem, setOpen, setSelectedSystem } =
    useModalWizardStore()
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

  const submitWizard = () => {
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

  const buttons: ModalButtons = {
    goNext: {
      text: btnMessages.continue,
      disabled: false,
      loading: isPending || isPendingFiles,
      onClick: submitWizard
    },
    goBack: {
      text: btnMessages.back,
      onClick: goBack
    }
  }

  return (
    <Fragment>
      <Card title="Summary">
        <div className="grid grid-cols-2">
          <ul className="grid grid-cols-1">
            <h3 className="font-bold underline">
              {isMovingToNewSystem ? 'New System:' : 'Destination System:'}
            </h3>
            <SummaryListParam
              {...{
                name: isMovingToNewSystem
                  ? 'Destination System Name'
                  : 'System Name',
                value: formData?.name
              }}
            />
            <SummaryListParam
              name="Code"
              value={isMovingToNewSystem ? '' : formData?.system?.systemCode}
            />

            <SummaryListParam
              name="Zone"
              value={isMovingToNewSystem ? '' : formData?.system?.zone?.name}
            />
            <SummaryListParam
              name="Location"
              value={formData?.location?.name}
            />
          </ul>
          <ul className="grid grid-cols-1">
            <h3 className="font-bold underline text-gray-600 dark:text-gray-200">
              Moving Item:
            </h3>
            <SummaryListParam name="Usage" value={formData?.itemUsage?.name} />
            <SummaryListParam
              name="Serial Number"
              value={physicalItem?.serialNumber || ''}
            />
            <SummaryListParam name="Eun" value={physicalItem?.eun || ''} />
            <SummaryListParam
              name="Condition Status"
              value={formData?.conditionStatus?.name || ''}
            />
            <SummaryListParam
              name="Part Number"
              value={catalogueItem?.catalogueNumber || ''}
            />
          </ul>
        </div>
      </Card>
      <CheckBoxComponent
        label="DELETE SOURCE SYSTEM?"
        defaultChecked={formData.deleteSourceSystem || false}
        onChange={e => {
          updateFormData({ deleteSourceSystem: e.target.checked })
        }}
      />
      <ModalButtonsComponent buttons={buttons} />
    </Fragment>
  )
}
