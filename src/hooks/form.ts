import { FieldValues, UseFormRegister } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { CODEBOOK } from '@/types/constants/codebook'
import { FieldProps, Option } from '@/types/form'

export const useMakeFormFields = <
  Type extends FieldValues,
  T extends Record<
    string,
    FieldProps & { options?: Option[]; codebook?: CODEBOOK }
  >
>(
  register: UseFormRegister<Type>,
  fields: T
): Record<
  keyof T,
  FieldProps & {
    options?: Option[]
    register: UseFormRegister<Type>
    codebook?: CODEBOOK
  }
> => {
  const intl = useIntl()

  return Object.keys(fields).reduce(
    (prev, cur) => ({
      ...prev,
      [cur]: {
        ...fields[cur],
        'data-testid': fields[cur]['data-testid'] || fields[cur].name,
        placeholder: fields[cur].placeholder
          ? intl.formatMessage({ id: fields[cur].placeholder })
          : undefined,
        label: fields[cur].label
          ? intl.formatMessage({ id: fields[cur].label })
          : undefined,
        register: register,
        codebook: fields[cur].codebook ? fields[cur].codebook : undefined
      }
    }),
    {}
  ) as Record<
    keyof T,
    FieldProps & {
      options?: Option[]
      register: UseFormRegister<Type>
      codebook?: CODEBOOK
    }
  >
}
