import FormContainer from 'core/components/ui/form/Form.comp'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { SystemInfo } from 'core/types/responses'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import * as yup from 'yup'

import FormContext from '../../../../../../store/form.context'
import SystemFormComponent from './system-form.comp'

interface Props {
  systemInfo?: SystemInfo
}

const SystemFormContainer = ({ systemInfo }: Props) => {
  const { uid, isEdit } = useContext(FormContext)
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

  return (
    <FormContainer
      data={systemInfo}
      schema={SystemValidationSchema}
      endpoint={endpoint}
      fetchMethod={fetchMethod}
      afterMutates={[endpoint, ENDPOINTS.systemTree]}
    >
      {props => <SystemFormComponent {...props} />}
    </FormContainer>
  )
}
export default SystemFormContainer
