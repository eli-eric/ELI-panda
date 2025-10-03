import { type FC, Fragment } from 'react'
import { useIntl } from 'react-intl'

import Card from '@/components/layout/Card'
import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { CheckboxWithLabel } from '@/components/ui/checkbox'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import type { ModalButtons } from '@/types/form'

import { useMoveWizardSubmit } from '../hooks/useMoveWizardSubmit'
import { SummaryListParam } from './components/SymmaryListParam.comp'
const btnMessages = message.common.buttons

export const SummaryStep: FC = () => {
  const { formatMessage: fm } = useIntl()
  const {
    submitWizard,
    isPending,
    goBack,
    formData,
    physicalItem,
    catalogueItem,
    isMovingToNewSystem,
    updateFormData,
    oldItemParentSystem
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
        <div
          className={cn(
            oldItemParentSystem ? 'grid grid-cols-3' : 'grid grid-cols-2'
          )}
        >
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
              {fm({ id: message.common.forms.movingItem })}
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
          {oldItemParentSystem && (
            <ul className="grid grid-cols-1">
              <h3 className="font-bold underline">
                {fm({ id: message.common.forms.oldItemParentSystem })}
              </h3>
              <SummaryListParam
                {...{
                  name: 'System Name',
                  value: oldItemParentSystem?.name
                }}
              />
              <SummaryListParam
                name="Code"
                value={oldItemParentSystem?.systemCode}
              />
              <SummaryListParam
                name="Zone"
                value={oldItemParentSystem?.zone?.name}
              />
              <SummaryListParam
                name="Location"
                value={oldItemParentSystem?.location?.name}
              />
            </ul>
          )}
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
