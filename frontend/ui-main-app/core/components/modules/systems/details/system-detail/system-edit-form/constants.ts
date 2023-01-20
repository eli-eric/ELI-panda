import * as yup from 'yup'

export const SystemValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  importanceCode: yup.string(),
  zoneCode: yup.string().required(),
  systemTypeUID: yup.string(),
  systemAlias: yup.string().max(12).required(),
  locationCode: yup.string().required(),
  ownerUID: yup.string().required(),
  eun: yup.string().required(),
  serialNumber: yup.string().required(),
  batchNumber: yup.string().required(),
  itemUsageCategoryCode: yup.string().required(),
  estimatedLifeTime: yup.number().required()
})

export const importances = [
  { code: 'low', value: 'Low' },
  { code: 'standard', value: 'Standard' },
  { code: 'high', value: 'High' },
  { code: 'vhigh', value: 'V.High' }
]
export const locations = [
  { code: 'l1', value: 'L1' },
  { code: 'l2', value: 'L2' },
  { code: 'l3', value: 'L3' }
]

export const zones = [
  { code: 'l1', value: 'L1' },
  { code: 'other', value: 'Other' }
]

export const itemUsageCategories = [
  { code: 'insystem', value: 'In-System' },
  { code: 'sparepart', value: 'Spare Part' },
  { code: 'stockitem', value: 'Stock Item' },
  { code: 'testmeasure', value: 'Test and measurement equipment' },
  { code: 'exploan', value: 'Experimental loan pool part' },
  { code: 'other', value: 'Other' }
]
