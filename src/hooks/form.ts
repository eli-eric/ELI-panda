import { useIntl } from 'react-intl'

import { FieldProps, Option } from '@/types/form'

export const useMakeFormFields = <
  Type extends object,
  T extends Record<string, FieldProps<T> & { options?: Option[] }>
>(
  fields: Type
): Record<keyof Type, FieldProps<T>> => {
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
      },
    }),
    {}
  ) as Record<keyof Type, FieldProps<T> & { options?: Option[] }>
}
