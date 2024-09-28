import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

const { form } = message.systemsPage.systemDetail
const { form: catalogueForm } = message.cataloguePage.itemDetail

export const useSystemsFilterFields = () => {
  const disabledEdit = false
  return useMakeFormFields({
    parentSystem: {
      name: 'parentSystem',
      label: form.parentSystemFilter.label,
      disabled: disabledEdit
    },
    sparePartsCoverage: {
      name: 'sparePartsCoverage',
      label: form.sparePartsCoverage.label,
      disabled: disabledEdit
    },
    criticalSpCoverage: {
      name: 'criticalSpCoverage',
      label: form.criticalSpCoverage.label,
      disabled: disabledEdit
    },
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
    systemLevel: {
      name: 'systemLevel',
      label: form.systemLevel.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    itemUsage: {
      name: 'itemUsage',
      label: form.physicalItem.itemUsage.label,
      codebook: CODEBOOK.ITEM_USAGE,
      disabled: disabledEdit
    },
    itemConditionStatus: {
      name: 'conditionStatus',
      label: form.physicalItem.conditionStatus.label,
      codebook: CODEBOOK.ITEM_CONDITION_STATUS,
      disabled: disabledEdit
    },

    price: {
      name: 'price',
      label: form.physicalItem.price.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    order: {
      name: 'order',
      label: form.physicalItem.order.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    eun: {
      name: 'eun',
      label: form.physicalItem.eun.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    itemNotes: {
      name: 'notes',
      label: form.physicalItem.notes.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    serialNumber: {
      name: 'serialNumber',
      label: form.physicalItem.serialNumber.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    partNumber: {
      name: 'catalogueNumber',
      label: catalogueForm.catalogueNumber.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    catalogueName: {
      name: 'catalogueName',
      label: catalogueForm.name.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    catalogueDescription: {
      name: 'catalogueDescription',
      rounded: 'rounded-md',
      label: catalogueForm.description.label,
      disabled: disabledEdit
    },
    category: {
      name: 'category',
      rounded: 'rounded-md',
      disabled: disabledEdit,
      label: catalogueForm.catalogueCategory.label,

      codebook: CODEBOOK.CATALOGUE_CATEGORY
    },
    catalogueSupplier: {
      name: 'supplier',
      label: catalogueForm.manufacturer.label,
      disabled: disabledEdit,
      codebook: CODEBOOK.SUPPLIER
    }
  })
}
