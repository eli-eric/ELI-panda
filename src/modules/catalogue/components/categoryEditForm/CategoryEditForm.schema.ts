import * as yup from 'yup'

import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { CategoryFormType } from '@/types/catalogue/categoryFormTypes'

export const categoryValidationschema: yup.ObjectSchema<CategoryFormType> = yup.object().shape({
  name: yup.string().required("Name can't be empty"),
  systemType: yup.mixed<CodebookType>().nullable(),
  groups: yup
    .array()
    .of(
      yup.object().shape({
        uid: yup.string().required("UID can't be empty"),
        name: yup.string().required("Group Name can't be empty"),
        properties: yup
          .array()
          .of(
            yup.object().shape({
              uid: yup.string().required("UID can't be empty"),
              name: yup.string().required("Property Name can't be empty"),
              type: yup.mixed<CodebookType>().nullable(),
              unit: yup.mixed<CodebookType>().nullable(),
              defaultValue: yup.string().required("Default value can't be empty"),
              listOfValues: yup.lazy(values =>
                Array.isArray(values)
                  ? yup.array().of(
                      yup.object().shape({
                        value: yup.string().required("Value can't be empty")
                      })
                    )
                  : yup.array().of(yup.string().required("Value can't be empty"))
              )
            })
          )
          .required("Properties can't be empty")
      })
    )
    .nullable(),
  parentUID: yup.string(),
  uid: yup.string(),
  code: yup.string().required("Code can't be empty"),
  image: yup.string()
})
