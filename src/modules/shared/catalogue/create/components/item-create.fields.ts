import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'

// messages
const { form } = message.cataloguePage.itemDetail

export const useItemCreateFormFields = () => {
    const disabled = !usePermission([ROLE.CATALOGUE_EDIT])

    return useMakeFormFields({
        name: {
            name: 'name',
            label: form.name.label,
            placeholder: form.name.placeholder,
            rounded: 'rounded-md',
        },
        catalogueNumber: {
            name: 'catalogueNumber',
            label: form.catalogueNumber.label,
            placeholder: form.catalogueNumber.placeholder,
            rounded: 'rounded-md',
        },
        category: {
            name: 'category',
            disabled,
            rounded: 'rounded-md',
            codebook: CODEBOOK.CATALOGUE_CATEGORY,
        },
    })
}
