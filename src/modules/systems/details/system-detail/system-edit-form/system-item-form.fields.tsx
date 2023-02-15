import { FormState, UseFormRegister } from 'react-hook-form'
import ItemPropertyTitle from 'src/components/item-property/item-property-title.comp'
import { Input } from 'src/components/ui/form/Input'
import { message } from 'src/i18n/src/messages'
import { SystemInfo } from '@/types/responses'

import SystemDetailComponent from '../system-detail.comp'

interface Props {
  systemInfo?: SystemInfo
  register: UseFormRegister<SystemInfo>
  formState: FormState<SystemInfo>
}

const messages = message.systemsPage.systemDetail

const SystemItemFormFields = ({ register, formState }: Props) => {
  const classes =
    'block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
  const { errors } = formState
  return (
    <SystemDetailComponent>
      <div className="sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <ItemPropertyTitle title={messages.labels.eun}>
            <Input className={classes} type="text" register={register} name="eun" />
            <p className="text-xs text-red-500">{errors.eun?.message}</p>
          </ItemPropertyTitle>
          <ItemPropertyTitle title={messages.labels.serialNumber}>
            <Input className={classes} type="text" register={register} name="serialNumber" />
            <p className="text-xs text-red-500">{errors.serialNumber?.message}</p>
          </ItemPropertyTitle>
          <ItemPropertyTitle title={messages.labels.batchNumber}>
            <Input className={classes} type="text" register={register} name="batchNumber" />
            <p className="text-xs text-red-500">{errors.batchNumber?.message}</p>
          </ItemPropertyTitle>
          <ItemPropertyTitle title={messages.labels.itemUsageCategoryCode}>
            <p className="text-xs text-red-500">{errors.itemUsageCategoryCode?.message}</p>
          </ItemPropertyTitle>
          <ItemPropertyTitle title={messages.labels.estimatedLifeTime}>
            <Input className={classes} type="text" register={register} name="estimatedLifeTime" />
            <p className="text-xs text-red-500">{errors.estimatedLifeTime?.message}</p>
          </ItemPropertyTitle>
        </dl>
      </div>
    </SystemDetailComponent>
  )
}

export default SystemItemFormFields
