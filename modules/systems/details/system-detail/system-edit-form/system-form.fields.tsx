import ItemPropertyTitle from 'components/item-property/item-property-title.comp'
import { Input } from 'components/ui/form/Input'
import { Select } from 'components/ui/form/Select'
import { message } from 'i18n/src/messages'
import { SystemInfo } from 'types/responses'
import { FormState, UseFormRegister } from 'react-hook-form'

import SystemDetailComponent from '../system-detail.comp'
import { importances, locations } from './constants'

const messages = message.systemsPage.systemDetail

interface Props {
  systemInfo?: SystemInfo
  register: UseFormRegister<SystemInfo>
  formState: FormState<SystemInfo>
}

const SystemFormFields = ({ register, formState }: Props) => {
  const classes =
    'block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:max-w-xs sm:text-sm'
  const { errors } = formState

  return (
    <SystemDetailComponent>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Name</h1>
      <Input
        type="text"
        name="name"
        register={register}
        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500`}
      />
      <p className="text-xs text-red-500">{errors.name?.message}</p>
      <h3 className="text-xl font-bold tracking-tight text-gray-900">Description</h3>
      <textarea
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        rows={3}
        {...register('description')}
      />
      <p className="text-xs text-red-500">{errors.description?.message}</p>

      <section aria-labelledby="details-heading" className="mt-12">
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <ItemPropertyTitle title={messages.labels.importanceCode}>
              <Select register={register} name="importanceCode" className={classes} options={importances} />
              <p className="text-xs text-red-500">{errors.importanceCode?.message}</p>
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.zoneCode}>
              <Input type="text" name="zoneCode" register={register} className={classes} />
              <p className="text-xs text-red-500">{errors.zoneCode?.message}</p>
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.systemTypeUID}>
              <Input className={classes} type="text" register={register} name="systemTypeUID" />
              <p className="text-xs text-red-500">{errors.systemTypeUID?.message}</p>
            </ItemPropertyTitle>

            <ItemPropertyTitle title={messages.labels.systemAlias}>
              <Input className={classes} type="text" register={register} name="systemAlias" />
              <p className="text-xs text-red-500">{errors.systemAlias?.message}</p>
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.locationCode}>
              <Select register={register} name="locationCode" className={classes} options={locations} />
              <p className="text-xs text-red-500">{errors.locationCode?.message}</p>
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.ownerUID}>
              <Input className={classes} type="text" register={register} name="ownerUID" />
              <p className="text-xs text-red-500">{errors.ownerUID?.message}</p>
            </ItemPropertyTitle>
          </dl>
        </div>
      </section>
    </SystemDetailComponent>
  )
}

export default SystemFormFields
