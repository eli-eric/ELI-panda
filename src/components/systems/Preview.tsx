import Image from 'next/image'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Preview = ({ image, alt, isEditMode, newImage, setNewImage }) => {
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
    <div className={`lg:w-[500px] ${isEditMode || image || 'hidden'}`}>
      {isEditMode ? (
        <>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {image ? (
              <Image
                className="lg:max-w-[500px] lg:max-h-[500px]"
                src={newImage ? newImage : image}
                alt={alt}
                width={500}
                height={500}
              />
            ) : (
              <div className="h-10" />
            )}
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
        <Image
          className="lg:max-w-[500px] lg:max-h-[500px]"
          src={image}
          alt={alt}
          width={500}
          height={500}
        />
      )}
    </div>
  )
}

export default Preview
