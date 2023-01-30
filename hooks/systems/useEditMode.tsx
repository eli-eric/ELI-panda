import { System } from 'pages/tree/[slug]'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const useEditMode = (onSubmit: any, data: System | undefined) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues: data })
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

  return { register, isEditMode, EditModeContainer, setNewImage, newImage, EditModeControls, reset, setIsEditMode }
}

export default useEditMode
