import { FormChildrenProps } from 'src/types/form'
import { SystemInfo } from 'src/types/responses'

import DisclosureComponent from '../../disclosure/disclosure.comp'
import SystemFormButtons from './system-form.buttons'
import SystemFormFields from './system-form.fields'
import SystemItemFormFields from './system-item-form.fields'
type Props = FormChildrenProps<SystemInfo>

const SystemFormComponent = ({ register, formState, handleSubmit, onSubmit, onCancel }: Props) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SystemFormButtons onCancel={onCancel} />
      <DisclosureComponent title="System" open={true}>
        <div className="bg-white pt-5">
          <SystemFormFields register={register} formState={formState} />
        </div>
      </DisclosureComponent>
      <DisclosureComponent title="Item" open={true}>
        <div className="bg-white pt-5">
          <SystemItemFormFields register={register} formState={formState} />
        </div>
      </DisclosureComponent>
    </form>
  )
}

export default SystemFormComponent
