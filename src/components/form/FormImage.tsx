import { TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import type { CSSProperties } from 'react'

import { Button } from '../Buttons'

interface FormImageProps {
  image: string
  imageStyle?: CSSProperties
  onDelete: () => void
}

const FormImage = ({ image, imageStyle, onDelete }: FormImageProps) => (
  <div className="flex flex-col justify-center border-gray-300">
    <Image width={300} height={300} style={imageStyle} alt="" src={image} />
    <Button type="button" onClick={onDelete} className="w-full justify-center" rounded="rounded-b-md">
      <TrashIcon
        className="h-4 w-4

 text-red-700"
        aria-hidden="true"
      />
    </Button>
  </div>
)

export default FormImage
