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
    isCritical: {
      name: 'isCritical',
      label: form.isCritical.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
    },
    minimalSpareParstCount: {
      name: 'minimalSpareParstCount',
      label: form.minimalSpareParstCount.label,
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
      disabled: disabledEdit
    },
    team: {
      name: 'responsibleTeam',
      label: form.team.label,
      placeholder: form.team.placeholder,
      rounded: 'rounded-md',
      disabled: disabledEdit,
      codebook: CODEBOOK.TEAM
    },
    itemUsage: {
      name: 'physicalItem.itemUsage',
      label: form.physicalItem.itemUsage.label,
      codebook: CODEBOOK.ITEM_USAGE,
      disabled: disabledEdit
    },
    // TODO: add itemConditionStatus
    itemConditionStatus: {
      name: 'physicalItem.conditionStatus',
      label: form.physicalItem.conditionStatus.label,
      codebook: CODEBOOK.ITEM_CONDITION_STATUS,
      disabled: disabledEdit
    },
    procurementStatus: {
      name: 'physicalItem.procurementStatus',
      label: form.physicalItem.procurementStatus.label,
      disabled: true
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
    itemNotes: {
      name: 'physicalItem.notes',
      label: form.physicalItem.notes.label,
      rounded: 'rounded-md',
      disabled: disabledEdit
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
      disabled: true
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

    catalogueSupplier: {
      name: 'physicalItem.catalogueItem.supplier',
      label: catalogueForm.manufacturer.label,
      disabled: true,
      codebook: CODEBOOK.SUPPLIER
    }
  })
}
export default useSystemEditFormFields
