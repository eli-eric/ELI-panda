import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'

const { form } = message.systemsPage.systemDetail
const { form: catalogueForm } = message.cataloguePage.itemDetail

const useSystemEditFormFields = () => {
  const disabledEdit = !usePermission([ROLE.SYSTEM_EDIT])
  const catalogueEdit = !usePermission([ROLE.CATALOGUE_EDIT])
  return useMakeFormFields({
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    owner: {
      name: 'owner',
      label: form.owner.label,
      codebook: CODEBOOK.EMPLOYEE,
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
      disabled: true
    },
    systemAlias: {
      name: 'systemAlias',
      label: form.systemAlias.label,
      placeholder: form.systemAlias.placeholder,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    systemLevel: {
      name: 'systemLevel',
      label: form.systemLevel.label,
      rounded: 'rounded-md',
      disabled: false
    },
    parentSystem: {
      name: 'parentSystem',
      label: form.parentSystem.label,
      rounded: 'rounded-md',
      disabled: true
    },
    itemUsage: {
      name: 'item.itemUsage',
      label: form.physicalItem.itemUsage.label,
      codebook: CODEBOOK.ITEM_USAGE,
      disabled: disabledEdit
    },
    // TODO: add itemConditionStatus
    itemConditionStatus: {
      name: 'item.conditionStatus',
      label: form.physicalItem.conditionStatus.label,
      codebook: CODEBOOK.ITEM_CONDITION_STATUS,
      disabled: disabledEdit
    },
    procurementStatus: {
      name: 'item.procurementStatus',
      label: form.physicalItem.procurementStatus.label,
      disabled: true
    },
    price: {
      name: 'item.price',
      label: form.physicalItem.price.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    currency: {
      name: 'item.currency',
      disabled: disabledEdit
    },
    eun: {
      name: 'item.eun',
      label: form.physicalItem.eun.label,
      rounded: 'rounded-md',
      disabled: true
    },
    itemNotes: {
      name: 'item.notes',
      label: form.physicalItem.notes.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    serialNumber: {
      name: 'item.serialNumber',
      label: form.physicalItem.serialNumber.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    partNumber: {
      name: 'item.catalogueItem.catalogueNumber',
      label: catalogueForm.catalogueNumber.label,
      rounded: 'rounded-md',
      disabled: true
    },
    catalogueName: {
      name: 'item.catalogueItem.name',
      label: catalogueForm.name.label,
      rounded: 'rounded-md',
      disabled: catalogueEdit
    },
    catalogueDescription: {
      name: 'item.catalogueItem.description',
      rounded: 'rounded-md',
      label: catalogueForm.description.label,
      disabled: catalogueEdit
    },

    catalogueSupplier: {
      name: 'item.catalogueItem.supplier',
      label: catalogueForm.manufacturer.label,
      disabled: true,
      codebook: CODEBOOK.SUPPLIER
    }
  })
}
export default useSystemEditFormFields
