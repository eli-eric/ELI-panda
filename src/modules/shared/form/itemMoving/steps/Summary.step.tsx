import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { type FC, Fragment } from 'react'
import toast from 'react-hot-toast'
import { FormattedMessage } from 'react-intl'

import { CheckBoxComponent } from '@/components/form/CheckBox'
import Card from '@/components/layout/Card'
import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { message } from '@/i18n/src/messages'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { PATH } from '@/types/constants/paths'
import type { ModalButtons } from '@/types/form'
import { queryMutate } from '@/utils/fetcher'
import { createMessageValues } from '@/utils/formatters'

import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../store/useModalWizardStore'
const propertyMessage =
  message.systemsPage.systemDetail.form.physicalItem.general.properties
const btnMessages = message.common.buttons

export const SummaryStep: FC = () => {
  const { isMovingToNewSystem } = useModalWizardStore()
  const { physicalItem, catalogueItem, systemDetail } = useSystemDetail()
  const { formData } = useWizardStore()

  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationKey: ['moveItem'],
    mutationFn: queryMutate('physicalItemMove', 'post'),
    onError: (e: AxiosError) => {
      toast.error(`Error: ${e.response?.data}`)
    },
    onSuccess: r => {
      console.log('r', r)
      toast.success('Item moved successfully')
      router.push(PATH.SYSTEM + '/' + r.data)
    }
  })

  const buttons: ModalButtons = {
    goNext: {
      text: btnMessages.continue,
      disabled: false,
      loading: isPending,
      onClick: () => {
        mutate({
          condition: formData.conditionStatus,
          deleteSourceSystem: false,
          destinationSystemUid: isMovingToNewSystem
            ? null
            : formData.system.uid,
          sourceSystemUid: systemDetail?.uid,
          parentSystemUid: isMovingToNewSystem ? formData.system.uid : null,
          systemName: formData.name,
          location: formData.location
        })
      }
    },
    goBack: {
      text: btnMessages.back,
      onClick: () => {}
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
            <li>
              <FormattedMessage
                id={propertyMessage.property}
                values={createMessageValues({
                  name: isMovingToNewSystem
                    ? 'Destination System Name'
                    : 'System Name',
                  value: formData?.name,
                  unit: ''
                })}
              />
            </li>
            <li>
              <FormattedMessage
                id={propertyMessage.property}
                values={createMessageValues({
                  name: 'Code',
                  value: formData?.system?.systemCode,
                  unit: ''
                })}
              />
            </li>
            <li>
              <FormattedMessage
                id={propertyMessage.property}
                values={createMessageValues({
                  name: 'Zone',
                  value: formData?.system?.zone?.name,
                  unit: ''
                })}
              />
            </li>
            <li>
              <FormattedMessage
                id={propertyMessage.property}
                values={createMessageValues({
                  name: 'Location',
                  value: formData?.location?.name,
                  unit: ''
                })}
              />
            </li>
          </ul>
          <ul className="grid grid-cols-1">
            <h3 className="font-bold underline text-gray-600 dark:text-gray-200">
              Moving Item:
            </h3>
            <li>
              <FormattedMessage
                id={propertyMessage.property}
                values={createMessageValues({
                  name: 'Usage',
                  value: formData?.itemUsage?.name,
                  unit: ''
                })}
              />
            </li>
            <li>
              <FormattedMessage
                id={propertyMessage.property}
                values={createMessageValues({
                  name: 'Serial Number',
                  value: physicalItem?.serialNumber,
                  unit: ''
                })}
              />
            </li>
            <li>
              <FormattedMessage
                id={propertyMessage.property}
                values={createMessageValues({
                  name: 'Eun',
                  value: physicalItem?.eun,
                  unit: ''
                })}
              />
            </li>
            <li>
              <FormattedMessage
                id={propertyMessage.property}
                values={createMessageValues({
                  name: 'Condition Status',
                  value: formData?.conditionStatus?.name,
                  unit: ''
                })}
              />
            </li>
            <li>
              <FormattedMessage
                id={propertyMessage.property}
                values={createMessageValues({
                  name: 'Part Number',
                  value: catalogueItem?.catalogueNumber,
                  unit: ''
                })}
              />
            </li>
          </ul>
        </div>
      </Card>
      <CheckBoxComponent label="DELETE SOURCE SYSTEM?" />
      <ModalButtonsComponent buttons={buttons} />
    </Fragment>
  )
}
