import { type FC, Fragment } from 'react'
import { useIntl } from 'react-intl'

import Card from '@/components/layout/Card'
import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { CheckboxWithLabel } from '@/components/ui/checkbox'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import type { ModalButtons } from '@/types/form'

import { useMoveWizardSubmit } from '../../itemMoving/hooks/useMoveWizardSubmit'
import { SummaryListParam } from '../../itemMoving/steps/components/SymmaryListParam.comp'

const btnMessages = message.common.buttons

export const ItemAssignSummaryStep: FC = () => {
  const { formatMessage: fm } = useIntl()
  const {
    submitWizard,
    isPending,
    goBack,
    formData,
    updateFormData,
    selectedSystem
  } = useMoveWizardSubmit()

  const buttons: ModalButtons = {
    goNext: {
      text: btnMessages.continue,
      disabled: false,
      loading: isPending,
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
        <div className={cn('grid grid-cols-2')}>
          <ul className="grid grid-cols-1">
            <h3 className="font-bold underline text-gray-600 dark:text-gray-200">
              {fm({ id: message.common.forms.sourceSystem })}
            </h3>
            <SummaryListParam
              {...{
                name: 'Name',
                value: selectedSystem?.name
              }}
            />
            <SummaryListParam name="Code" value={selectedSystem?.systemCode} />
            <SummaryListParam name="Zone" value={selectedSystem?.zone?.name} />
            <SummaryListParam
              name="Location"
              value={selectedSystem?.location?.name}
            />
          </ul>
          <ul className="grid grid-cols-1">
            <h3 className="font-bold underline text-gray-600 dark:text-gray-200">
              {fm({ id: message.common.forms.assigningItem })}
            </h3>
            <SummaryListParam
              name="Usage"
              value={selectedSystem?.physicalItem?.itemUsage?.name}
            />
            <SummaryListParam
              name="Serial Number"
              value={selectedSystem?.physicalItem?.serialNumber}
            />
            <SummaryListParam
              name="Eun"
              value={selectedSystem?.physicalItem?.eun}
            />
            <SummaryListParam
              name="Condition Status"
              value={selectedSystem?.physicalItem?.conditionStatus?.name}
            />
            <SummaryListParam
              name="Part Number"
              value={
                selectedSystem?.physicalItem?.catalogueItem?.catalogueNumber
              }
            />
          </ul>
        </div>
      </Card>
      <CheckboxWithLabel
        id="delete-source-system"
        label="DELETE SOURCE SYSTEM?"
        defaultChecked={formData.deleteSourceSystem || false}
        onChange={checked => {
          updateFormData({ deleteSourceSystem: checked })
        }}
      />
      <ModalButtonsComponent buttons={buttons} />
    </Fragment>
  )
}
