import { object, string } from 'yup'

/*
Type 'OptionalObjectSchema<{ name: RequiredStringSchema<string | undefined, AnyObject>; catalogueNumber: RequiredStringSchema<string | undefined, AnyObject>; ... 7 more ...; details: OptionalObjectSchema<...>; }, AnyObject, TypeOfShape<...>>' is not assignable to type 'ObjectSchema<{ uid: BaseSchema<Maybe<string | undefined>, AnyObject, string | undefined>; catalogueNumber: BaseSchema<Maybe<string | undefined>, AnyObject, string | undefined>; ... 7 more ...; details: BaseSchema<...>; }, AnyObject, TypeOfShape<...>, AssertsShape<...>>'.
  The types of 'fields.details.__inputType' are incompatible between these types.
    Type 'TypeOfShape<ObjectShape>' is missing the following properties from type '({ propertyGroup?: string | undefined; value?: string | undefined; property?: { uid?: string | undefined; name?: string | undefined; listOfValues?: (string | undefined)[] | undefined; defaultValue?: string | undefined; type?: { ...; } | undefined; unit?: { ...; } | undefined; } | undefined; } | undefined)[]': length, pop, push, concat, and 29 more.
*/
export const schema = object({
  name: string().required('Name is required'),
  catalogueNumber: string().required('Catalogue Number is required'),
  uid: string(),
  description: string(),
  categoryPath: string(),
  categoryName: object(),
  manufacturer: object(),
  manufacturerUrl: string(),
  manufacturerNumber: string(),
  details: object({
    propertyGroup: string(),
    value: string(),
    property: object({
      uid: string(),
      name: string(),
      listOfValues: string(),
      defaultValue: string(),
      type: object({
        uid: string(),
        name: string(),
        description: string(),
        unit: object({
          uid: string(),
          name: string()
        })
      })
    })
  })
})
