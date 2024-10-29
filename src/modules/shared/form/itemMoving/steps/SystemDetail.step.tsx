import { yupResolver } from '@hookform/resolvers/yup'
import { type FC, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { BreadcrumpContainer, BreadcrumpItem } from '@/components/breadcrumps'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import Card, { FormCard } from '@/components/layout/Card'
import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { message } from '@/i18n/src/messages'
import { SystemDetailParameter } from '@/modules/layout/components/system-detail-parameter.comp'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { getColorBySystemLevel } from '@/modules/systemItem/utils'
import type { ModalButtons } from '@/types/form'
import type { CodebookType } from '@/types/responses/codebook'
import type { SystemDetail } from '@/types/responses/systems'
import { classNames } from '@/utils'

import { SelectLocationCombo } from '../../location/SelectLocation.combo'
import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useFormFields } from '../hooks/useFormFields'
import { useModalWizardStore } from '../store/useModalWizardStore'

const messages = message.common.buttons

type SystemDetailForm = {
  location?: CodebookType
  name: string
  itemUsage?: CodebookType
  conditionStatus?: CodebookType
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required')
})

export const SystemDetailStep: FC = () => {
  const fields = useFormFields()

  const { goNext, goBack, formData, updateFormData } = useWizardStore()
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

  const { physicalItem, systemDetail, catalogueItem } = useSystemDetail()

  const defaultValues = isMovingToNewSystem
    ? {
        itemUsage: systemDetail?.physicalItem?.itemUsage || {},
        conditionStatus: systemDetail?.physicalItem?.conditionStatus || {}
      }
    : {
        location: systemDetail?.location
          ? {
              name: systemDetail?.location?.name,
              uid: systemDetail?.location?.uid
            }
          : undefined,
        name: systemDetail?.name || '',
        itemUsage: systemDetail?.physicalItem?.itemUsage || {},
        conditionStatus: systemDetail?.physicalItem?.conditionStatus || {}
      }

  const formMethods = useForm<SystemDetailForm>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const submit = (data: SystemDetailForm) => {
    console.log(data)
    //updateFormData({ system: { ...system, ...data } })
    //goNext()
  }
  const { isValid } = formMethods.formState

  const handleNextStep = () => {
    formMethods.handleSubmit(submit)()
  }

  const buttons: ModalButtons = {
    goNext: {
      text: messages.next,
      onClick: handleNextStep,
      disabled: !isValid
    },
    goBack: {
      text: messages.back,
      onClick: goBack
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
            !isMovingToNewSystem && getColorBySystemLevel(system?.systemLevel)
          )}
        >
          <div className="grid grid-cols-2 gap-2">
            <Input {...fields.name} />
            <SelectLocationCombo locationField={{ ...fields.location }} />
          </div>
          {!isMovingToNewSystem && (
            <div>
              <SystemDetailParameter
                title="Code"
                value={systemDetail?.systemCode}
              />
              <SystemDetailParameter
                title="Zone"
                value={systemDetail?.zone?.name}
              />
            </div>
          )}
          <Card className="bg-amber-100 dark:bg-amber-600 mt-4 rounded-md  shadow-md">
            <div>
              <SystemDetailParameter title="Name" value={physicalItem?.name} />
              <SystemDetailParameter title="Eun" value={physicalItem?.eun} />
              <SystemDetailParameter
                title="Serial number"
                value={physicalItem?.serialNumber}
              />
              <SystemDetailParameter
                title="Part number"
                value={catalogueItem?.catalogueNumber}
              />
            </div>
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
