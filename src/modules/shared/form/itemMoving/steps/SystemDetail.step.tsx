import { type FC, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { BreadcrumpContainer, BreadcrumpItem } from '@/components/breadcrumps'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import Card, { FormCard } from '@/components/layout/Card'
import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { message } from '@/i18n/src/messages'
import useSystemEditFormFields from '@/modules/systemItem/components/form/SystemForm.fields'
import { getColorBySystemLevel } from '@/modules/systemItem/utils'
import type { ModalButtons } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'
import type { SystemDetail } from '@/types/responses/systems'
import { classNames } from '@/utils'

import { SelectLocationCombo } from '../../location/SelectLocation.combo'
import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../store/useModalWizardStore'

const messages = message.common.buttons

export const SystemDetailStep: FC = () => {
  const fields = useSystemEditFormFields()
  const { goNext, goBack, formData } = useWizardStore()
  const { isMovingToNewSystem } = useModalWizardStore()

  const system = formData.system as SystemDetail
  const parentPath = useMemo(() => {
    if (isMovingToNewSystem) {
      return [
        ...(system?.parentPath || []),
        { uid: system?.uid, name: system?.name }
      ]
    } else {
      return system?.parentPath || []
    }
  }, [system, isMovingToNewSystem])

  const formMethods = useForm()

  const buttons: ModalButtons = {
    goNext: {
      text: messages.next,
      onClick: () => {
        goNext()
      }
    },
    goBack: {
      text: messages.back,
      onClick: () => {
        goBack()
      }
    }
  }

  return (
    <div>
      <Form formMethods={formMethods}>
        <Card>
          <BreadcrumpContainer>
            <BreadcrumpItem
              noIcon={true}
              name={
                isMovingToNewSystem
                  ? 'Parent system path:'
                  : 'Destination system path:'
              }
            />
            {parentPath?.map((system: CodebookType, i) => (
              <BreadcrumpItem
                noIcon={i === 0}
                key={system?.uid}
                name={system?.name}
                systemLevel={system.systemLevel}
              />
            ))}
          </BreadcrumpContainer>
        </Card>
        <FormCard
          title="System details"
          className={classNames(
            'shadow-md rounded-lg border p-4 mt-2',
            getColorBySystemLevel(system?.systemLevel)
          )}
        >
          <div className="grid grid-cols-2 gap-2">
            <Input {...fields.name} />
            <SelectLocationCombo locationField={{ ...fields.location }} />
          </div>
          <Card className="bg-amber-100 dark:bg-amber-600 mt-4 rounded-md  shadow-md">
            <div className="grid grid-cols-2 gap-2">
              <Listbox {...fields.itemUsage} />
              <Listbox {...fields.itemConditionStatus} />
            </div>
          </Card>
        </FormCard>
      </Form>
      <ModalButtonsComponent buttons={buttons} />
    </div>
  )
}
