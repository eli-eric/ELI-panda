import { useFormContext, useWatch } from 'react-hook-form'

import {
  InlineEditCombobox,
  InlineEditInput,
  InlineEditListbox,
  InlineEditLocation,
  InlineEditSystemType,
  InlineEditTextArea
} from '@/components/form/inline-edit'
import { Disclosure } from '@/components/ui'
import useSystemEditFormFields from '@/modules/systemItem/components/form/SystemForm.fields'
import { SystemLevel } from '@/types/gql/graphql'

export const SystemDetailSection = () => {
  const fields = useSystemEditFormFields()

  const { control } = useFormContext()

  const systemLevel = useWatch({ control, name: 'systemLevel' })
  const systemLevels = Object.values(SystemLevel).map(level => level)

  return (
    <Disclosure
      title={'System Detail'}
      className={`w-full border rounded-md overflow-hidden shadow-md`}
    >
      <div className="flex flex-col p-2 gap-y-2">
        <InlineEditInput {...fields.name} />
        <InlineEditSystemType {...fields.systemType} />
        <InlineEditListbox
          {...fields.systemLevel}
          customOptions={systemLevels}
        />
        <InlineEditLocation {...fields.location} />
        <InlineEditCombobox {...fields.zone} />
        <InlineEditInput {...fields.systemCode} />
        {systemLevel === SystemLevel.KeySystems && (
          <InlineEditListbox {...fields.attribute} />
        )}
        <InlineEditTextArea {...fields.description} />
      </div>
    </Disclosure>
  )
}
