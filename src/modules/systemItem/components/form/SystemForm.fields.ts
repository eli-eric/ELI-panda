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
      disabled: disabledEdit
    },
    systemAlias: {
      name: 'systemAlias',
      label: form.systemAlias.label,
      placeholder: form.systemAlias.placeholder,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    itemUsage: {
      name: 'physicalItem.itemUsage',
      label: form.physicalItem.itemUsage.label,
      codebook: CODEBOOK.ITEM_USAGE,
      disabled: disabledEdit
    },
    price: {
      name: 'physicalItem.price',
      label: form.physicalItem.price.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    currency: {
      name: 'physicalItem.currency',
      disabled: disabledEdit
    },
    eun: {
      name: 'physicalItem.eun',
      label: form.physicalItem.eun.label,
      rounded: 'rounded-md',
      disabled: true
    },
    serialNumber: {
      name: 'physicalItem.serialNumber',
      label: form.physicalItem.serialNumber.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    partNumber: {
      name: 'physicalItem.catalogueItem.catalogueNumber',
      label: catalogueForm.catalogueNumber.label,
      rounded: 'rounded-md',
      disabled: catalogueEdit
    },
    catalogueName: {
      name: 'physicalItem.catalogueItem.name',
      label: catalogueForm.name.label,
      rounded: 'rounded-md',
      disabled: catalogueEdit
    },
    catalogueDescription: {
      name: 'physicalItem.catalogueItem.description',
      rounded: 'rounded-md',
      label: catalogueForm.description.label,
      disabled: catalogueEdit
    },
    catalogueCategory: {
      name: 'physicalItem.catalogueItem.category',
      label: catalogueForm.category.label,
      disabled: catalogueEdit,
      codebook: CODEBOOK.CATALOGUE_CATEGORY
    },
    catalogueSupplier: {
      name: 'physicalItem.catalogueItem.supplier',
      label: catalogueForm.manufacturer.label,
      disabled: catalogueEdit,
      codebook: CODEBOOK.SUPPLIER
    }
  })
}
export default useSystemEditFormFields
