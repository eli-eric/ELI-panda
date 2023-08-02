import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

// messages
const { form } = message.cataloguePage.itemDetail

const useCatalogueFormFields = () => {
  const disabled = true
  return useMakeFormFields({
    name: {
      name: 'name',
      label: form.name.label,
      placeholder: form.name.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    catalogueNumber: {
      name: 'catalogueNumber',
      label: form.catalogueNumber.label,
      placeholder: form.catalogueNumber.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    category: {
      name: 'category',
      label: form.category.label,
      disabled: disabled,
      rounded: 'rounded-md',
      codebook: CODEBOOK.CATALOGUE_CATEGORY
    },
    supplier: {
      name: 'supplier',
      label: form.manufacturer.label,
      placeholder: form.manufacturer.placeholder,
      disabled: disabled,
      rounded: 'rounded-md',
      codebook: CODEBOOK.SUPPLIER
    },
    manufacturerUrl: {
      name: 'manufacturerUrl',
      label: form.manuFacturerUrl.label,
      placeholder: form.manuFacturerUrl.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    description: {
      name: 'description',
      label: form.description.label,
      placeholder: form.description.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    }
  })
}
export default useCatalogueFormFields
