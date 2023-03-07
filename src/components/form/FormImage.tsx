import { TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import { Button } from '../Buttons'

interface FormImageProps {
  image: string
  onDelete: () => void
}

const FormImage = ({ image, onDelete }: FormImageProps) => (
  <div className="mt-1 flex-col justify-center  border-gray-300 ">
    <Image width={300} height={300} alt="" src={image} />
    <Button
      type="button"
      onClick={onDelete}
      className="w-full justify-center"
      rounded="rounded-b-md"
    >
      <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
    </Button>
  </div>
)

export default FormImage
