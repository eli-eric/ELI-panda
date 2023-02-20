import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Preview = ({ data, isEditMode, newImage, setNewImage }) => {
  const { image, name } = data
  const onDrop = useCallback(
    files => {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => setNewImage(reader.result)
    },
    [setNewImage],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: { 'image/*': [] },
    onDrop,
  })

  return (
    <div className="lg:w-[500px]">
      {isEditMode ? (
        <>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <img
              className="lg:max-w-[500px] lg:max-h-[500px]"
              src={newImage ? newImage : image}
              alt={name}
            />
          </div>
          <div>
            {isDragActive
              ? 'Drop new image here'
              : 'Click here or drag and drop an image'}
            {newImage && (
              <button onClick={() => setNewImage('')}>Discard</button>
            )}
          </div>
        </>
      ) : (
        <img
          className="lg:max-w-[500px] lg:max-h-[500px]"
          src={image}
          alt={name}
        />
      )}
    </div>
  )
}

export default Preview
