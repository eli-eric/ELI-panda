import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { SystemEditModeProps } from 'types/system'

import Card from './Card'

const Preview = ({ data, editMode }: SystemEditModeProps) => {
  const { image, name } = data
  const { newImage, isEditMode, setNewImage } = editMode
  const onDrop = useCallback(
    files => {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => setNewImage(reader.result)
    },
    [setNewImage]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ maxFiles: 1, accept: { 'image/*': [] }, onDrop })

  return (
    <>
      <b>Preview</b>
      <Card className="w-[500px] h-[500px]">
        {isEditMode ? (
          <div>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <img width="100%" src={newImage ? newImage : image} alt={name} />
              {isDragActive ? 'Drop new image here' : 'Click here or drag and drop an image'}
            </div>
            <div>{newImage && <button onClick={() => setNewImage('')}>Discard</button>}</div>
          </div>
        ) : (
          <img width="100%" src={image} alt={name} />
        )}
      </Card>
    </>
  )
}

export default Preview
