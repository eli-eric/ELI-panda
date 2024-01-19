import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'

const { form } = message.systemsPage.systemDetail

export const useSystemMovingFormFields = () => {
  const disabledEdit = !usePermission([ROLE.SYSTEM_EDIT])
  return useMakeFormFields({
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    responsible: {
      name: 'responsible',
      label: form.responsiblePerson.label,
      codebook: CODEBOOK.EMPLOYEE,
      disabled: disabledEdit
    },
    importance: {
      name: 'importance',
      label: form.importance.label,
      codebook: CODEBOOK.SYSTEM_IMPORTANCE,
      disabled: disabledEdit
    },
    location: {
      name: 'location',
      label: form.location.label,
      codebook: CODEBOOK.LOCATION,
      disabled: disabledEdit
    },
    zone: {
      name: 'zone',
      label: form.zone.label,
      codebook: CODEBOOK.ZONE,
      disabled: disabledEdit
    },
    systemType: {
      name: 'systemType',
      label: form.systemType.label,
      codebook: CODEBOOK.SYSTEM_TYPE,
      disabled: disabledEdit
    },
    description: {
      name: 'description',
      label: form.description.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    systemCode: {
      name: 'systemCode',
      label: form.systemCode.label,
      placeholder: form.systemCode.placeholder,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    systemAlias: {
      name: 'systemAlias',
      label: form.systemAlias.label,
      placeholder: form.systemAlias.placeholder,
      rounded: 'rounded-md',
      disabled: disabledEdit
    }
  })
}
