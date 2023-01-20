import FormContainer from 'core/components/ui/form/Form.comp'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { SystemInfo } from 'core/types/responses'
import { useContext } from 'react'

import FormContext from '../../../../../../store/form.context'
import { SystemValidationSchema } from './constants'
import SystemFormComponent from './system-form.comp'

interface Props {
  systemInfo?: SystemInfo
}

const SystemFormContainer = ({ systemInfo }: Props) => {
  const { uid, add, edit } = useContext(FormContext)

  return (
    <FormContainer
      data={systemInfo}
      schema={SystemValidationSchema}
      endpoint={ENDPOINTS.systemDetail + (uid ? '/' + uid : '')}
      fetchMethod={!uid ? 'post' : add ? 'post' : edit ? 'put' : 'get'}
    >
      {props => <SystemFormComponent systemInfo={systemInfo} {...props} />}
    </FormContainer>
  )
}
export default SystemFormContainer
