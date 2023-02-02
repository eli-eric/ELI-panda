import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { System } from 'types/system'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().min(5).required(),
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

const useYupValidationResolver = validationSchema =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        })

        return {
          values,
          errors: {}
        }
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message
              }
            }),
            {}
          )
        }
      }
    },
    [validationSchema]
  )

const useEditMode = (onSubmit: any, data: System | undefined, isOpen: boolean = false) => {
  const { register, handleSubmit, reset, formState } = useForm<System>({
    defaultValues: data,
    resolver: useYupValidationResolver(schema)
  })
  const [isEditMode, setIsEditMode] = useState(isOpen)
  const [newImage, setNewImage] = useState('')

  //Keep defaults in sync
  useEffect(() => {
    reset(data)
  }, [data, reset])

  const EditModeContainer = ({ children }) => {
    return isEditMode ? (
      <form
        onSubmit={handleSubmit(data => {
          setIsEditMode(false)
          return newImage ? onSubmit({ ...data, image: newImage }) : onSubmit(data)
        })}
      >
        {children}
      </form>
    ) : (
      children
    )
  }

  const discard = () => {
    setNewImage('')
    reset()
    setIsEditMode(false)
  }

  const { errors } = formState
  const FormErrors = () => (
    <ul className="flex flex-wrap text-red-600">
      {Object.values(errors).map(({ message }, idx) => (
        <li key={idx}>{message}</li>
      ))}
    </ul>
  )

  return {
    FormErrors,
    register,
    isEditMode,
    EditModeContainer,
    setNewImage,
    newImage,
    reset,
    setIsEditMode,
    discard
  }
}

export default useEditMode
