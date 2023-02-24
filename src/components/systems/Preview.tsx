import Image from 'next/image'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Preview = ({ image, alt }) => {
  return (
    <Image
      className="lg:max-w-[500px] lg:max-h-[500px]"
      src={image}
      alt={alt}
      width={500}
      height={500}
    />
  )
}

export default Preview
