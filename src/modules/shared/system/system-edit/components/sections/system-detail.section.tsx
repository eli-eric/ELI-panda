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
import { cn } from '@/lib/utils'
import useSystemEditFormFields from '@/modules/systemItem/components/form/SystemForm.fields'
import {
  getBadgeVariantBySystemLevel,
  getFontBySystemLevel
} from '@/modules/systemItem/utils'
import { SystemLevel } from '@/types/gql/graphql'

export const SystemDetailSection = () => {
  const fields = useSystemEditFormFields()

  const { control } = useFormContext()

  const systemLevel = useWatch({ control, name: 'systemLevel' })
  const systemCode = useWatch({ control, name: 'systemCode' })
  const systemLevels = Object.values(SystemLevel).map(level => level)

  return (
    <Disclosure
      title={`System Details${systemCode ? ` - ${systemCode}` : ''}`}
      className={cn(
        `w-full border-l border-r border-b rounded-md overflow-hidden shadow-md`
      )}
      buttonClassName={cn(
        getFontBySystemLevel(systemLevel as SystemLevel),
        getBadgeVariantBySystemLevel(systemLevel as SystemLevel)
      )}
    >
      <div className="flex flex-col p-2 gap-y-2">
        <InlineEditInput {...fields.name} />
        <InlineEditSystemType {...fields.systemType} />
        {/* FIXME: System Code (inline edit) need ad generate and delete buttons */}
        <InlineEditInput {...fields.systemCode} />
        <InlineEditListbox
          {...fields.systemLevel}
          customOptions={systemLevels}
        />
        <InlineEditLocation {...fields.location} />
        <InlineEditCombobox {...fields.zone} />
        {systemLevel === SystemLevel.KeySystems && (
          <InlineEditListbox {...fields.attribute} />
        )}
        <InlineEditTextArea {...fields.description} />
      </div>
    </Disclosure>
  )
}
