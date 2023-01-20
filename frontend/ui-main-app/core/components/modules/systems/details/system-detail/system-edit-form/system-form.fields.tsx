import ItemPropertyTitle from 'core/components/modules/shared/item-property/item-property-title.comp'
import { Input } from 'core/components/ui/form/Input'
import { Select } from 'core/components/ui/form/Select'
import { message } from 'core/i18n/src/messages'
import { SystemInfo } from 'core/types/responses'
import { FormState, UseFormRegister } from 'react-hook-form'

import SystemDetailComponent from '../system-detail.comp'
import { importances, itemUsageCategories, locations } from './constants'

const messages = message.systemsPage.systemDetail

interface Props {
  systemInfo?: SystemInfo
  register: UseFormRegister<SystemInfo>
  formState: FormState<SystemInfo>
}

const SystemDetailFormFields = ({ systemInfo, register, formState }: Props) => {
  const classes =
    'block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm'
  const { errors } = formState

  return (
    <SystemDetailComponent>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Name</h1>
      <Input
        type="text"
        name="name"
        register={register}
        className=" w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      <p>{errors.zoneCode?.message}</p>
      <h3 className="text-xl font-bold tracking-tight text-gray-900">Description</h3>
      <textarea
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        rows={3}
        {...register('description')}
      />
      <section aria-labelledby="details-heading" className="mt-12">
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <ItemPropertyTitle title={messages.labels.importanceCode}>
              <Select register={register} name="importanceCode" className={classes} options={importances} />
              <p>{errors.importanceCode?.message}</p>
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.zoneCode}>
              <Input type="text" name="zoneCode" register={register} className={classes} />
              <p>{errors.zoneCode?.message}</p>
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.systemTypeUID}>
              <Input className={classes} type="text" register={register} name="systemTypeUID" />
            </ItemPropertyTitle>

            <ItemPropertyTitle title={messages.labels.systemAlias}>
              <Input className={classes} type="text" register={register} name="systemAlias" />
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.locationCode}>
              <Select register={register} name="locationCode" className={classes} options={locations} />
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.ownerUID}>
              <Input className={classes} type="text" register={register} name="ownerUID" />
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.eun}>
              <Input className={classes} type="text" register={register} name="eun" />
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.serialNumber}>
              <Input className={classes} type="text" register={register} name="serialNumber" />
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.batchNumber}>
              <Input className={classes} type="text" register={register} name="batchNumber" />
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.itemUsageCategoryCode}>
              <Select
                register={register}
                name="itemUsageCategoryCode"
                className={classes}
                options={itemUsageCategories}
              />
            </ItemPropertyTitle>
            <ItemPropertyTitle title={messages.labels.estimatedLifeTime}>
              <Input className={classes} type="text" register={register} name="estimatedLifeTime" />
            </ItemPropertyTitle>
          </dl>
        </div>
      </section>
    </SystemDetailComponent>
  )
}

export default SystemDetailFormFields
