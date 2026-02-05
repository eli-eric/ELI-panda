import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

const { form } = message.admin.users

export const useUserFormFields = () => {
    const disabledEdit = false
    return useMakeFormFields({
        useName: {
            name: 'userName',
            label: form.username.label,
            placeholder: form.username.placeholder,
            rounded: 'rounded-md',
            disabled: disabledEdit,
        },
        firstName: {
            name: 'firstName',
            label: form.firstName.label,
            placeholder: form.firstName.placeholder,
            disabled: disabledEdit,
            rounded: 'rounded-md',
        },
        employee: {
            name: 'employee',
            label: form.employee.label,
            placeholder: form.employee.placeholder,
            disabled: disabledEdit,
            codebook: CODEBOOK.EMPLOYEE,
            rounded: 'rounded-md',
        },
        lastName: {
            name: 'lastName',
            label: form.lastName.label,
            placeholder: form.lastName.placeholder,
            disabled: disabledEdit,
            rounded: 'rounded-md',
        },
        email: {
            name: 'email',
            label: form.email.label,
            placeholder: form.email.placeholder,
            disabled: disabledEdit,
            rounded: 'rounded-md',
        },
        password: {
            name: 'password',
            label: form.password.label,
            placeholder: form.password.placeholder,
            disabled: disabledEdit,
            rounded: 'rounded-md',
        },
        confirmPassword: {
            name: 'confirmPassword',
            label: form.confirmPassword.label,
            placeholder: form.confirmPassword.placeholder,
            disabled: disabledEdit,
            rounded: 'rounded-md',
        },
        isEnabled: {
            name: 'isEnabled',
            label: form.isEnabled.label,
        },
        facility: {
            name: 'facility',
            label: form.facility.label,
            disabled: disabledEdit,
            rounded: 'rounded-md',
        },
    })
}
