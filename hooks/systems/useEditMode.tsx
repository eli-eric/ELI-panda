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
      } catch (errors) {
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

const useEditMode = (onSubmit: any, data: System | undefined) => {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: data,
    resolver: useYupValidationResolver(schema)
  })
  const [isEditMode, setIsEditMode] = useState(false)
  const [newImage, setNewImage] = useState('')
  //For some reason react-hook-form's default values get off sync unless reset like bellow. ???
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

  const EditModeControls = () => {
    const Quit = () => (
      <button
        onClick={() => {
          setNewImage('')
          reset()
          setIsEditMode(false)
        }}
      >
        Discard
      </button>
    )
    const Edit = () => <button onClick={() => setIsEditMode(true)}>Edit</button>
    const Save = () => <input type="submit" value="Save" />

    return isEditMode ? (
      <div className="flex">
        <Save />
        <Quit />
      </div>
    ) : (
      <Edit />
    )
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
    EditModeControls,
    reset,
    setIsEditMode
  }
}

export default useEditMode
