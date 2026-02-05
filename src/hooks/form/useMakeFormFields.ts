import { useIntl } from 'react-intl'

import type { CODEBOOK } from '@/types/constants/codebook'
import type { FieldProps, Option } from '@/types/form'

export const useMakeFormFields = <
    T extends Record<string, FieldProps & { options?: Option[]; codebook?: CODEBOOK }>,
>(
    fields: T,
): Record<
    keyof T,
    FieldProps & {
        options?: Option[]
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
                label: fields[cur].customLabel
                    ? fields[cur].customLabel
                    : fields[cur].label
                      ? intl.formatMessage({ id: fields[cur].label })
                      : undefined,
                customLabel: fields[cur].label
                    ? intl.formatMessage({ id: fields[cur].label })
                    : undefined,
                codebook: fields[cur].codebook ? fields[cur].codebook : undefined,
                placeholder: fields[cur].placeholder
                    ? intl.formatMessage({ id: fields[cur].placeholder })
                    : undefined,
            },
        }),
        {},
    ) as Record<
        keyof T,
        FieldProps & {
            options?: Option[]
            codebook?: CODEBOOK
        }
    >
}
