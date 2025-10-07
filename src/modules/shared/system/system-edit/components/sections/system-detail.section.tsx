import { useFormContext, useWatch } from 'react-hook-form'

import {
  InlineEditCombobox,
  InlineEditInput,
  InlineEditListbox,
  InlineEditLocation,
  InlineEditSystemType,
  InlineEditTextArea
} from '@/components/form/inline-edit'
import { InlineEditInputWithActions } from '@/components/form/inline-edit/InlineEditInputWithActions'
import { Disclosure } from '@/components/ui'
import { cn } from '@/lib/utils'
import useSystemEditFormFields from '@/modules/systemItem/components/form/SystemForm.fields'
import {
  getBadgeVariantBySystemLevel,
  getFontBySystemLevel
} from '@/modules/systemItem/utils'
import { SystemLevel } from '@/types/gql/graphql'

import { SystemCodeActions } from '../SystemCodeActions'

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
        <InlineEditInputWithActions
          {...fields.systemCode}
          actions={<SystemCodeActions />}
        />
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
