import ModalComponent from 'core/components/ui/modal/modal.comp'
import ModalWarningComponent from 'core/components/ui/modal/warning/modal-warning.comp'
import { usePandaForm } from 'core/helpers/hooks/use-form'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { ModalButtons } from 'core/types/form'
import { SystemInfo } from 'core/types/responses'
import { useRouter } from 'next/router'
import { Fragment, useContext } from 'react'
import * as yup from 'yup'

import FormContext from '../../../../../../store/form.context'
import SystemFormComponent from './system-form.comp'

interface Props {
  systemInfo?: SystemInfo
}

const SystemFormContainer = ({ systemInfo }: Props) => {
  const { uid } = useContext(FormContext)
  const router = useRouter()
  const routerUid = router.query.slug ? router.query.slug[0] : undefined

  const endpoint = ENDPOINTS.systemDetail + (routerUid ? '/' + routerUid : '')

  const fetchMethod = uid ? 'put' : 'post'

  const SystemValidationSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
    importanceCode: yup.string(),
    zoneCode: yup.string().required(),
    systemTypeUID: yup.string(),
    systemAlias: yup.string().max(12).required(),
    locationCode: yup.string().required(),
    ownerUID: yup.string().required(),
    eun: yup.string().required(),
    serialNumber: yup.string().required(),
    batchNumber: yup.string().required(),
    itemUsageCategoryCode: yup.string().required(),
    estimatedLifeTime: yup.number().required()
  })

  const { formState, confirm, handleSubmit, warnModalOpen, onCancel, onSubmit, register, setWarnModalOpen } =
    usePandaForm({
      data: systemInfo,
      endpoint,
      fetchMethod,
      schema: SystemValidationSchema,
      afterMutates: [endpoint, ENDPOINTS.systemTree]
    })

  const modalButtons: ModalButtons = {
    goNext: {
      text: 'continue',
      onClick: () => confirm(true)
    },
    goBack: {
      text: 'cancel',
      onClick: () => confirm(false)
    }
  }
  return (
    <Fragment>
      <SystemFormComponent
        register={register}
        formState={formState}
        handleSubmit={handleSubmit}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
      <ModalComponent
        open={warnModalOpen}
        setOpen={setWarnModalOpen}
        testid="warning-form-modal"
        buttons={modalButtons}
      >
        <ModalWarningComponent
          title="Warning"
          message="You have unstagged changes in your form. Are you sure you want continue?"
        />
      </ModalComponent>
    </Fragment>
  )
}
export default SystemFormContainer
