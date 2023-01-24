import { FormChildrenProps } from 'core/components/ui/form/Form.comp'
import { SystemInfo } from 'core/types/responses'
import { Fragment, useContext } from 'react'

import FormContext from '../../../../../../store/form.context'
import DisclosureComponent from '../../disclosure/disclosure.comp'
import SystemDetailFormFields from './system-form.fields'
type Props = FormChildrenProps<SystemInfo> & {
  systemInfo?: SystemInfo
}

const SystemFormComponent = ({ systemInfo, register, formState, handleSubmit, onSubmit, onCancel }: Props) => {
  const { add } = useContext(FormContext)
  return (
    <Fragment>
      (
      <DisclosureComponent title="System" open={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-5">
            <div className="flex justify-start pb-5">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
          <div className="bg-white pb-10">
            <SystemDetailFormFields
              register={register}
              systemInfo={add ? undefined : systemInfo}
              formState={formState}
            />
          </div>
        </form>
      </DisclosureComponent>
      )
    </Fragment>
  )
}

export default SystemFormComponent
